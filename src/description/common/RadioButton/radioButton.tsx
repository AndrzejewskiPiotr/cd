import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Label, Wrapper } from '../Select/select-styled';
import ErrorMessage from '../ErrorMessage/errorMessage';
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

export default function RadioButton(props: any) {
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
