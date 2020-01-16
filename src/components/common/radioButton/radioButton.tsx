import React, { ReactElement, ChangeEvent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getIn } from 'formik';

import { Label, Wrapper, useStyles } from './radioButton-styled';
import { ErrorMessage } from '../errorMessage';
import { RADIO_BTN_COLOR } from '../../../style';


export function CommonRadioButtonGroup(props: any): ReactElement {
  const classes = useStyles();
  const {
    inputname,
    htmlFor,
    label,
    values,
    errors,
    touched,
    setFieldValue
  } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(inputname, event.target.value);
  };

  return (
    <Wrapper>
      <Label htmlFor={htmlFor}>{label}</Label>
      <RadioGroup
        classes={classes}
        aria-label="classification.standard"
        name="classification.standard"
        value={values.classification.standard}
        onChange={handleChange}
      >
        <FormControlLabel
          value="ICD-O"
          control={
            <Radio
              style={{ color: `${RADIO_BTN_COLOR}` }}
              classes={classes}
              color="primary"
            />
          }
          label="ICD-O"
        />
        <FormControlLabel
          value="ICD-10"
          control={
            <Radio
              style={{ color: `${RADIO_BTN_COLOR}` }}
              classes={classes}
              color="primary"
            />
          }
          label="ICD-10"
        />
      </RadioGroup>
      <ErrorMessage
        touched={getIn(touched, inputname)}
        message={getIn(errors, inputname)}
      />
    </Wrapper>
  );
}
