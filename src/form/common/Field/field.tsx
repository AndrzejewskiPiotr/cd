import React from 'react'
import { Field, getIn } from 'formik';

import {
    Input,
    Wrapper,
    Label } from './field-styled'
import ErrorMessage from '../ErrorMessage/errorMessage'


function CommonField(props: any) {
    const { inputName, type , htmlFor, label, placeholder } = props;
    const handleChange = ({ target: { value }}: any) => {
        props.setFieldValue(inputName, value);
    };

    const handleBlur = () => {
        props.handleBlur(inputName, true);
    };


    return (
        <Field name={inputName}>
            {({ field,form : { errors, touched }}: any) => (
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
                        touched={getIn(touched, inputName)}
                        message={getIn(errors, inputName)}
                    />
                </Wrapper>
            )
            }
        </Field>
    )
}

export default CommonField
