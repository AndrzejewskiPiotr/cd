import React from 'react';
import { Formik, FormikProps, FormikValues } from 'formik';
import * as yup from 'yup';

import CommonField from './common/Field/field';
import { usePromise } from '../hook';
import fetchDescription from '../api/description';
import { Wrapper, Submit } from './descriptionForm-styled';

export interface FormValues {
  classification: object;
}

const initialValues: FormValues = {
  classification: {
    code: ''
  }
};

const FormSchema = yup.object().shape({
  classification: yup.object().shape({
    code: yup.string().required('Pole jest wymagane !')
  })
});

function DescriptionForm() {
  const [description, isError, isPending] = usePromise(fetchDescription(), []);
  let value: FormValues;
  if (description.length !== 0) {
    const [id, standard, code] = description;
    value = {
      classification: {
        code: code
      }
    };
  } else {
    value = initialValues;
  }

  return (
    <Wrapper>
      <Formik
        initialValues={value}
        enableReinitialize={true}
        onSubmit={(values: FormikValues, actions: FormikValues) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
        validationSchema={FormSchema}
        render={(props: FormikProps<FormikValues>) => (
          <form onSubmit={props.handleSubmit}>
            <CommonField
              inputName="classification.code"
              type="text"
              placeholder="Uzupełnij numer choroby"
              htmlFor="code"
              label="Numer choroby"
              {...props}
            />
            <Submit type="submit">Submit</Submit>
          </form>
        )}
      />
    </Wrapper>
  );
}

export default DescriptionForm;
