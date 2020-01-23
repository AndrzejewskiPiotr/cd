import React, { ReactElement } from 'react';

import { Wrapper, Text } from './error-message-styled';

type ErrorMessage = {
  error: string | any;
  touched: boolean | any;
};

export const ErrorMessage = ({
  error,
  touched
}: ErrorMessage): ReactElement => (
  <Wrapper>
    <Text>{touched && error}</Text>
  </Wrapper>
);
