import React from 'react';
import { Wrapper, Label, StyledSelect } from './select-styled';
import { FormikProps, FormikValues, getIn } from 'formik';
import ErrorMessage from '../ErrorMessage/errorMessage';

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#f5f8fa;',
    border: 'solid 1.5px #c0ccda',
    boxShadow: 'none',
    borderColor: '#c0ccda',
    ':hover': {
      borderColor: '#c0ccda'
    }
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: '#1f2d3d'
  })
};

const options = [
  { value: 'ICD-O', label: 'ICD-O' },
  { value: 'ICD-10', label: 'ICD-10' }
];

function CommonSelect({
  setFieldValue,
  name,
  setFieldTouched,
  values,
  inputname,
  label,
  htmlFor,
  placeholder,
  errors,
  touched,
  ...props
}: FormikProps<FormikValues> & {
  name: string;
  inputname: string;
  label: string;
  htmlFor: string;
  placeholder: string;
}) {
  const [parent, child] = inputname.split('.');
  const value = values[parent][child];

  const defaultValue = () => {
    const selectValueIndex = options.findIndex(
      option => option.value === value
    );
    return selectValueIndex !== -1 ? options[selectValueIndex] : [];
  };
  const handleChange = (value: any) => {
    setFieldValue(inputname, value.value);
  };

  const handleBlur = () => {
    setFieldTouched(inputname, true);
  };
  return (
    <Wrapper>
      <Label htmlFor={htmlFor}>{label}</Label>
      <StyledSelect
        onClick={(e: any) => console.log(e)}
        id={htmlFor}
        styles={colourStyles}
        onChange={handleChange}
        onBlur={setTimeout(handleBlur, 0)}
        label={label}
        options={options}
        value={defaultValue()}
        placeholder={placeholder}
        name={name}
        menuPosition="absolute"
        {...props}
      />
      <ErrorMessage
        touched={getIn(touched, inputname)}
        message={getIn(errors, inputname)}
      />
    </Wrapper>
  );
}

export default CommonSelect;
