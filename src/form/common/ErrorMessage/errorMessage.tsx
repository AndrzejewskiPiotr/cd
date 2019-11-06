import React from 'react'

import { Wrapper, Text } from './errorMessage-styled'

type ErrorMessage = {
    message: string | any,
    touched: boolean | any,
}

const ErrorMessage = ({message,touched}:ErrorMessage) =>
    <Wrapper>
        <Text>{touched && message}</Text>
    </Wrapper>;

export default ErrorMessage

