import * as React from 'react';
import { Formik } from 'formik';
import { Container } from './form-styled';
import * as yup from 'yup';

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
function DescriptionForm({
  children,
  description,
  enableReinitialize = true,
  initialValue,
  ...props
}: any) {
  const handleSubmit = async (values: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(JSON.stringify(values, null, 2));
  };

  const handleInitialValues = () => {
    if (description.length !== 0) {
      const [id, standard, code] = description;
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
