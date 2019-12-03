import React from 'react';
import { Field, getIn } from 'formik';

import { Input, Wrapper, Label } from './field-styled';
import ErrorMessage from '../ErrorMessage/errorMessage';

function CommonField(props: any) {
  const {
    setFieldTouched,
    setFieldValue,
    touched,
    erors,
    inputname,
    type,
    htmlFor,
    label,
    placeholder,
    ...rest
  } = props;

  const handleChange = ({ target: { value } }: any) => {
    setFieldValue(inputname, value);
  };

  const handleBlur = () => {
    setFieldTouched(inputname, true);
  };

  return (
    <div>
      <Field name={inputname}>
        {({ field, form: { errors, touched } }: any) => (
          <Wrapper>
            <Label htmlFor={htmlFor}>{label}</Label>
            <Input
              type={type}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              {...field}
            />
            <ErrorMessage
              touched={getIn(touched, inputname)}
              message={getIn(errors, inputname)}
            />
          </Wrapper>
        )}
      </Field>
    </div>
  );
}

export default CommonField;
