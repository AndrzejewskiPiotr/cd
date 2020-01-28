import React, { ReactElement } from 'react';
import { useField } from 'formik';

import { Input, Wrapper, Label } from './field-styled';
import { ErrorMessage } from '../errorMessage';

export function CommonField({ label, ...props }: any): ReactElement {
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input {...field} {...props} />
      <ErrorMessage error={error} touched={touched} />
    </Wrapper>
  );
}
