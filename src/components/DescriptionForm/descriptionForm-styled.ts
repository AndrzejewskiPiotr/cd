import styled from 'styled-components'
import { animated } from 'react-spring';

import { CommonForm } from '../common/form';
import { CommonHeader } from '../common/header';
import { CommonHeading } from '../common/heading';
import { CommonButton } from '../common/button';
import { CommonExitSvg } from '../common/exitSvg/exit-svg';

import {
  SUBMIT_BTN_COLOR,
  SUBMIT_BTN_SHADOW,
  FORM_BORDER_COLOR,
  NOTDESKTOP,
  DESCRIPTION_FORM_BORDER } from '../../style';


const MAX_HEIGHT_FORM = 90 // %
const MAX_WIDTH_FORM_DESKTOP = 600 // PX
const MAX_WIDTH_FORM_MOBILE = 85 // %

const Wrapper = styled.div``;

const Container = styled(animated(CommonForm))`
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  cursor: pointer;
  max-width: 600px;
  display: flex;
  max-height: 800px;
  flex-flow: column;
  will-change: width, height;
  z-index: 401;
  border-radius: 8px;
  border: solid 1px #979797;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.05);

  ${NOTDESKTOP} {
    max-width: ${MAX_WIDTH_FORM_MOBILE}%;
  }
`

const OpenBtn = styled(animated(CommonButton))`
  position: relative;
  cursor: pointer;
  z-index: 99999999;
  display: block;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: black;
  margin: 10px;
  line-height: 30px;
`

const Header = styled(animated(CommonHeader))`
  padding: 12px;
  margin: 0 0 12px;
  display: none;
  justify-content: space-between;
  border-bottom: solid 1px ${DESCRIPTION_FORM_BORDER};
`

const Heading = styled(CommonHeading)`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.27px;
  color: #1f2d3d;
`

const Exit = styled(CommonExitSvg)``

const Item = styled(animated.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  will-change: transform, opacity;
`;

const SubmitBtn = styled(CommonButton)`
  width: 96px;
  height: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 ${SUBMIT_BTN_SHADOW};
  background-color: ${SUBMIT_BTN_COLOR};
  color: white;
  border: 0;
  cursor: pointer;
  margin: 0 25px;
  &:focus {
    outline: none;
  }
`

const OpenModalBtn =  styled(animated.div)`
  justify-content: center;
  height: 100%;
`

const Text = styled.p`
  margin:0;
  padding:0;
  text-align:center;
  align-self:center;
`

export {
  SubmitBtn,
  Container,
  Wrapper,
  OpenBtn,
  Header,
  Heading,
  Exit,
  Item,
  OpenModalBtn,
  Text
}
