import * as React from 'react';
import CommonField from '../common/Field/field';
import RadioButton from '../common/RadioButton/radioButton';
import { Submit } from './form-styled';

const data = [
  {
    htmlFor: 'classification.standard',
    label: 'Standard choroby',
    category: 'select',
    key: 'classification.standard',
    inputname: 'classification.standard'
  },
  {
    inputname: 'classification.code',
    type: 'text',
    placeholder: 'Uzupełnij numer choroby',
    htmlFor: 'code',
    label: 'Numer choroby',
    category: 'field',
    key: 'classification.code'
  },
  {
    category: 'button',
    key: 'btn.submit'
  }
];

function createElement(category: string, data: any, formikProps: any): any {
  switch (category) {
    case 'button':
      return (
        <Submit key={data.key} type="submit">
          Zapisz
        </Submit>
      );
    case 'field':
      return (
        <CommonField
          key={data.key}
          inputname={data.inputname}
          type={data.type}
          placeholder={data.placeholder}
          htmlFor={data.htmlFor}
          label={data.label}
          {...formikProps}
        />
      );
    case 'select':
      return <RadioButton key={data.key} {...data} {...formikProps} />;
  }
}

export { data, createElement };
