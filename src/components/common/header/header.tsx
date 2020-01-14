import React, { ReactElement, ReactNode, CSSProperties } from 'react';
import { Element } from './header-styled';

type PCommonHeader = {
  children: ReactNode | ReactNode[];
  className?: string;
  style?: CSSProperties;
};

const CommonHeader = ({ children, ...rest }: PCommonHeader): ReactElement => (
  <Element {...rest}>{children}</Element>
);

export { CommonHeader };
