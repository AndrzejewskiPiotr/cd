import * as React from 'react';
import { Formik } from 'formik';
import { Container } from './form-styled';
import * as yup from 'yup';

import { updateDescription } from '../../api/description';

export interface FormValues {
  classification: {
    code: string;
    standard: string;
  };
}

const initialValues: FormValues = {
  classification: {
    code: '',
    standard: ''
  }
};

const FormSchema = yup.object().shape({
  classification: yup.object().shape({
    code: yup.string().required('Pole jest wymagane !'),
    standard: yup.string().required('Pole jest wymagane !')
  })
});

const createDescription = (description: any,id: string) => ({
  ...description,
    slide_id:id
})

function DescriptionForm({
  children,
  description,
  enableReinitialize = true,
  initialValue,
  ...props
}: any) {
  const [standard, code, id] = description;
  console.log('decrption',description)
  console.log('descript id', id)
  const handleSubmit = async (values: { classification: {
      standard: string;
      code: string;
    }}) => {
    const url = `/repository/slides/${id}/description`
    console.log(url,id)
    const updatedDescription = createDescription(values,id)
    console.log(updatedDescription)
    return await updateDescription(url,updatedDescription)
  };

  const handleInitialValues = () => {
    if (description.length !== 0) {
      return {
        classification: {
          code,
          standard
        }
      };
    } else {
      return initialValues;
    }
  };

  return (
    <Formik
      initialValues={handleInitialValues()}
      enableReinitialize={enableReinitialize}
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, ...formik }: any) => (
        <Container onSubmit={handleSubmit} {...props}>
          {props.render(formik)}
        </Container>
      )}
    </Formik>
  );
}

export default DescriptionForm;
