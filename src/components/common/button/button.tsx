import React, {
  CSSProperties,
  useImperativeHandle,
  useRef,
  forwardRef,
  ReactElement
} from 'react';

import { Element } from './button-styled';

type PCommonButton = {
  text: string;
  className?: string;
  type?: 'submit';
  onClick?: () => any;
  style?: CSSProperties;
};

function CommonButton(props: PCommonButton, ref: any): ReactElement {
  const { text, ...rest } = props;
  const btnRef = useRef(null);
  useImperativeHandle(ref, () => (btnRef ? btnRef.current : null));
  return (
    <Element {...rest} ref={btnRef}>
      {text}
    </Element>
  );
}

export default forwardRef(CommonButton);
