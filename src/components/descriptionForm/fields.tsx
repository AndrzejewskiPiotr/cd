import React from 'react';

import { CommonRadioButtonGroup } from '../common/radioButton';
import { CommonField } from '../common/field';
import { SubmitBtn } from './description-form-styled';


type ButtonField = { category: 'button'; key: string; type?:string; text:string }
type SelectField = { category: 'select'; key: string, label: string, name: string, options: {value:string,label:string, color?: 'primary'
    | 'secondary'
    | 'default' }[] }
type InputField = { category: 'input'; type:string; key: string, label: string,name: string, placeholder: string }
type FormField = ( ButtonField | InputField | SelectField );


const formFields: FormField[] = [
  {
    category: 'select',
    key: 'classification.standard',
    label: 'Standard choroby',
    name: 'classification.standard',
    options:[
      {
        value: 'ICD-O',
        label: 'ICD-O',
        color: 'default'
      },
      {
        value: 'ICD-10',
        label: 'ICD-10',
        color: 'default'
      }
    ]
  },
  {
    category: 'input',
    key: 'classification.code',
    name: 'classification.code',
    type: 'text',
    placeholder: 'Uzupełnij numer choroby',
    label: 'Numer choroby'
  },
  {
    category: 'button',
    key: 'btn.submit',
    text: 'zapisz'
  }
];

function createElement(category: string, data: any): any {
  switch (category) {
    case 'button':
      return <SubmitBtn key={data.key} {...data} />;
    case 'input':
      return (
        <CommonField
          {...data}
        />
      );
    case 'select':
      return (
        <CommonRadioButtonGroup key={data.key} {...data}/>
      );
  }
}

export { formFields, createElement };
