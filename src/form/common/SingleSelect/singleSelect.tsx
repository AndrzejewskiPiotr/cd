import React from 'react'
import Select from "react-select";
import {
    Wrapper,
    Label } from './singleSelect-styled'
import ErrorMessage from '../ErrorMessage/errorMessage'
import  { Field,  getIn } from "formik";



const colourStyles = (isError: boolean) => ({
    control: ( styles: any ) => ({
        ...styles, backgroundColor: '#f5f8fa;',
        border: isError ? 'solid 1.5px #ff4949' :  'solid 1.5px #c0ccda' ,
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
});

const options = [
    { value: "ICD-0", label: "ICD-0" },
    { value: "ICD-10", label: "ICD-10" },
];


function SingleSelect(props: any) {
    const handleChange = (value: any) => {
        props.setFieldValue(props.inputName, value);
    };

    const handleBlur = () => {
        props.handleBlur(props.inputName, true);
    };
    const isError = !!getIn(props.errors, props.inputName) && !!getIn(props.touched, props.inputName);
    return (
        <Field name={props.inputName}>
            {({ field,form : { errors, touched }}: any) => (
            <Wrapper>
                <Label htmlFor={props.htmlFor}>{props.label}</Label>
                <Select
                    styles={colourStyles(isError)}
                    defaultValue={[]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={props.label}
                    options={options}
                    {...field}
                    value={props.values[props.inputName]}
                    placeholder={props.placeholder}
                    {...props}
                />
                <ErrorMessage
                    touched={getIn(touched,props.inputName)}
                    message={getIn(errors,props.inputName)}
                />
            </Wrapper>
                )}
        </Field>
    );
}

export default SingleSelect
