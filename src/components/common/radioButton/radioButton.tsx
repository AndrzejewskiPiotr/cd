import React, { ReactElement } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Label, Wrapper } from './radioButton-styled';
import { ErrorMessage } from '../errorMessage';
import { getIn } from 'formik';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexDirection: 'row',
      colorPrimary: {
        color: '#00406b'
      },
      '&$checked': {
        color: '#00406b'
      }
    }
  })
);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
              style={{ color: '#00406b' }}
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
              style={{ color: '#00406b' }}
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
