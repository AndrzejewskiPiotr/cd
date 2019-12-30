import React, { ReactElement, ReactNode } from 'react';
import { Element } from './header-styled';

type PCommonHeader = {
  children: ReactNode | ReactNode[];
  className?: string;
};

const CommonHeader = ({ children, ...rest }: PCommonHeader): ReactElement => (
  <Element {...rest}>{children}</Element>
);

export { CommonHeader };
