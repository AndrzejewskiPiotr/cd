import React from 'react';

import { CommonRadioButtonGroup } from '../common/radioButton';
import { CommonField } from '../common/field';
import { SubmitBtn } from './descriptionForm-styled';

type ButtonField = { category: 'button'; key: string; type?:string; text:string }
type SelectField = { category: 'select'; key: string, htmlFor: string, label: string, inputname: string }
type InputField = { category: 'input'; type:string; key: string, htmlFor: string, label: string, inputname: string, placeholder: string }
type FormField = ( ButtonField | InputField | SelectField );


const formFields: FormField[] = [
  {
    category: 'select',
    key: 'classification.standard',
    htmlFor: 'classification.standard',
    label: 'Standard choroby',
    inputname: 'classification.standard'
  },
  {
    category: 'input',
    key: 'classification.code',
    inputname: 'classification.code',
    type: 'text',
    placeholder: 'Uzupełnij numer choroby',
    htmlFor: 'code',
    label: 'Numer choroby'
  },
  {
    category: 'button',
    key: 'btn.submit',
    text: 'zapisz'
  }
];

function createElement(category: string, data: any, formikProps: any): any {
  switch (category) {
    case 'button':
      return <SubmitBtn key={data.key} {...data} />;
    case 'input':
      return (
        <CommonField
          {...data}
          {...formikProps}
        />
      );
    case 'select':
      return (
        <CommonRadioButtonGroup key={data.key} {...data} {...formikProps} />
      );
  }
}

export { formFields, createElement };
