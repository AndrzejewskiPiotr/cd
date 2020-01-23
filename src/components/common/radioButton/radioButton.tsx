import React, { ReactElement, ChangeEvent } from 'react';
import { useField } from 'formik';

import {
    Label,
    Wrapper,
    useStyles,
    MaterialRadio,
    MaterialFormControlLabel,
    MaterialRadioGroup  } from './radioButton-styled';
import { ErrorMessage } from '../errorMessage';


export function CommonRadioButtonGroup(props: any): ReactElement {
  const classes = useStyles();
  const [{value}, {error, touched}, {setValue}] = useField(props);
  const { name, label, options } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValue(value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <MaterialRadioGroup
        classes={classes}
        aria-label={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
          {
              options.map( ({value,label,...rest}:{value:string,label:string, color:'primary'
                      | 'secondary'
                      | 'default'}) =>
              <MaterialFormControlLabel
                  value={value}
                  control={
                      <MaterialRadio
                          classes={classes}
                          {...rest}
                      />
                  }
                  label={label}
              />)
          }
      </MaterialRadioGroup>
      <ErrorMessage
        touched={touched}
        error={error}
      />
    </Wrapper>
  );
}
