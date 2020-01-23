import React, { ReactElement } from 'react';
import { Element } from './heading-styled';

type PCommonHeading = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const CommonHeading = ({ text, ...rest }: PCommonHeading): ReactElement => (
  <Element {...rest}>{text}</Element>
);

export { CommonHeading };
