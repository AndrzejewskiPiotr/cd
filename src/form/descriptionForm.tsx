import React from 'react'
import {
    Formik,
    FormikProps,
    FormikValues,
    FormikActions } from 'formik';
import * as yup from 'yup'


import CommonField from './common/Field/field'
import { usePromise } from "../slide/hook";
import fetchDescription from "../slide/api/description";
import  {Wrapper, Submit}  from './descriptionForm-styled';
import CommonSelect from "./common/Select/select";

export interface FormValues {
    classification: object
}

const initialValues: FormValues = {
    classification: {
        code: '',
        standard: '',
    }
};


const FormSchema = yup.object().shape({
    classification: yup.object().shape({
        code: yup.string().required('Pole jest wymagane !'),
        standard: yup.string().required('Pole jest wymagane !'),
    })
});


function DescriptionForm() {
    const [description, isError,isPending] = usePromise(fetchDescription(),[]);
    let value: FormValues;
    if (description.length !== 0) {
        let [id,standard,code] = description;
        value = {
            classification: {
                code: code,
                standard:standard
            }
        }
    }
    else {
        value = initialValues
    }

    return (
        <Wrapper>
            <Formik
                initialValues={value}
                enableReinitialize={true}
                onSubmit={(
                    values: FormikValues,
                    actions: FormikActions<FormikValues>) => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                }}
                validationSchema={FormSchema}
                render={(props: FormikProps<FormikValues>) => (
                    <form onSubmit={props.handleSubmit}>
                        <CommonField
                            inputName="classification.code"
                            type="text"
                            placeholder="Uzupełnij numer choroby"
                            htmlFor="code"
                            label="Numer choroby"
                            {...props}
                        />
                        <CommonSelect
                            fieldName="classification.standard"
                            name="standard"
                            label="Standard klasyfikacji chorób"
                            htmlFor='standard'
                            placeholder="Wybierz standard"
                            {...props}
                        />
                        <Submit type="submit">Submit</Submit>
                    </form>
                )}
            />
        </Wrapper>
    )
}

export default DescriptionForm
