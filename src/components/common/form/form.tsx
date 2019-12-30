import React, { ReactElement } from 'react';
import { Formik } from 'formik';

import { Container } from './form-styled';

export function CommonForm({
  children,
  initialValues,
  handleSubmit,
  formSchema,
  enableReinitialize = true,
  initialValue,
  ...props
}: any): ReactElement {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={enableReinitialize}
      validationSchema={formSchema}
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
