import React from 'react';
import Wrapper from './descriptionForm-styled';
import { usePromise } from '../hook';
import fetchDescription from '../api/description';

function DescriptionForm() {
  const [description] = usePromise(fetchDescription(), []);
  return <Wrapper>{`${description[0]}`}</Wrapper>;
}

export default DescriptionForm;
