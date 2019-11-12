import React from 'react'
import Select from "react-select";
import {
    Wrapper,
    Label } from './select-styled'
import {FormikProps, FormikValues, getIn} from "formik";
import ErrorMessage from "../ErrorMessage/errorMessage";


const colourStyles = {
    control: ( styles: any ) => ({
        ...styles, backgroundColor: '#f5f8fa;',
        border: 'solid 1.5px #c0ccda' ,
        boxShadow: 'none',
        borderColor: '#c0ccda',
        ':hover': {
            borderColor: '#c0ccda',
        },
    }),
    placeholder: (styles: any) => ({
        ...styles,
        color: '#1f2d3d'
    })
};

const options = [
    { value: "ICD-0", label: "ICD-0" },
    { value: "ICD-10", label: "ICD-10" },
];

function CommonSelect({setFieldValue,name,setFieldTouched,values,fieldName,label,htmlFor,placeholder,errors,touched,...props}: FormikProps<FormikValues> &
    { name: string, fieldName: string, label: string, htmlFor:string, placeholder: string}) {
  const [parent,child] = fieldName.split('.');
  const value =  values[parent][child];
  const defaultValue = () => {
    const selectValueIndex = options.findIndex((option) => option.value === value)
    return selectValueIndex !== -1 ? options[selectValueIndex] : []
  }
  const handleChange = (value: any) => {
    setFieldValue(fieldName,value.value)
  };

  const handleBlur = () => {
    setFieldTouched(fieldName, true)
  }
  return (
                <Wrapper>
                    <Label htmlFor={htmlFor}>{label}</Label>
                    <Select
                        styles={colourStyles}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={label}
                        options={options}
                        value={defaultValue()}
                        placeholder={placeholder}
                        {...props}
                    />
                    <ErrorMessage
                        touched={getIn(touched,fieldName)}
                        message={getIn(errors,fieldName)}
                    />
                </Wrapper>
    );
}

export default CommonSelect
