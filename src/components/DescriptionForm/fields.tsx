import React from 'react';

import { CommonRadioButtonGroup } from '../common/radioButton';
import { CommonField } from '../common/field';
import { SubmitBtn } from './descriptionForm-styled';

const formFields = [
  {
    category: 'select',
    key: 'classification.standard',
    htmlFor: 'classification.standard',
    label: 'Standard choroby',
    inputname: 'classification.standard'
  },
  {
    category: 'field',
    key: 'classification.code',
    inputname: 'classification.code',
    type: 'text',
    placeholder: 'Uzupełnij numer choroby',
    htmlFor: 'code',
    label: 'Numer choroby'
  },
  {
    category: 'button',
    key: 'btn.submit'
  }
];

function createElement(category: string, data: any, formikProps: any): any {
  switch (category) {
    case 'button':
      return <SubmitBtn key={data.key} type="submit" text="zapisz" />;
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
      return (
        <CommonRadioButtonGroup key={data.key} {...data} {...formikProps} />
      );
  }
}

export { formFields, createElement };
