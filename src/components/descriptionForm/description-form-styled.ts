import styled from 'styled-components';
import { animated } from 'react-spring';
import Snackbar from '@material-ui/core/Snackbar';

import { CommonText } from '../common/text';
import { CommonHeading } from '../common/heading';
import { CommonButton } from '../common/button';
import { CommonExitSvg } from '../common/exitSvg';
import { CommonAlert } from '../common/alert';

import {
  SUBMIT_BTN_COLOR,
  SUBMIT_BTN_SHADOW,
  NOTDESKTOP,
  DESCRIPTION_FORM_BORDER,
  FORM_BORDER_COLOR,
  HEADING_COLOR
} from '../../style';

const MAX_WIDTH_FORM_MOBILE = 85; // %

const Wrapper = styled.div``;

const Container = styled(animated.form)`
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  cursor: pointer;
  max-width: 600px;
  display: flex;
  flex-flow: column;
  will-change: width, height;
  z-index: 401;
  border-radius: 8px;
  border: solid 1px ${FORM_BORDER_COLOR};
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.05);

  ${NOTDESKTOP} {
    max-width: ${MAX_WIDTH_FORM_MOBILE}%;
  }
`;

const Header = styled(animated.div)`
  padding: 12px;
  margin: 0 0 12px;
  display: none;
  justify-content: space-between;
  border-bottom: solid 1px ${DESCRIPTION_FORM_BORDER};
`;

const Heading = styled(CommonHeading)`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.27px;
  color: ${HEADING_COLOR};
`;

const Exit = styled(CommonExitSvg)``;

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
`;

const OpenModalBtn = styled(animated.div)`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Text = styled(CommonText)`
  margin: 0;
  padding: 0;
  text-align: center;
  align-self: center;
`;

const MaterialSnackBar = styled(Snackbar)`
  && {
    position: absolute;
  }
`;

const MaterialAlert = styled(CommonAlert)``;

export {
  SubmitBtn,
  Container,
  Wrapper,
  Header,
  Heading,
  Exit,
  Item,
  OpenModalBtn,
  Text,
  MaterialSnackBar,
  MaterialAlert
};
