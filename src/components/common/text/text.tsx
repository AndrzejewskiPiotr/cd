import React from 'react'

import { Element } from './text-styled';

type PCommonText = {
    text: string,
    className?: string
}

const CommonText = ({ text,...rest }:PCommonText) => <Element {...rest}>{text}</Element>;

export {
    CommonText
}
