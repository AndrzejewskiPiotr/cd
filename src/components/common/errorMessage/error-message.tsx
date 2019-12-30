import React, { ReactElement } from 'react';

import { Wrapper, Text } from './error-message-styled';

type ErrorMessage = {
  message: string | any;
  touched: boolean | any;
};

export const ErrorMessage = ({
  message,
  touched
}: ErrorMessage): ReactElement => (
  <Wrapper>
    <Text>{touched && message}</Text>
  </Wrapper>
);
