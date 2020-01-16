import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { ERROR_COLOR, LABEL_TEXT_COLOR, RADIO_BTN_COLOR } from '../../../style';

const Wrapper = styled.div`
  display: grid;
  margin: 0 25px;
`;

const Label = styled.label`
  margin: 5px;
  font-size: 13px;
  letter-spacing: 0.24px;
  text-align: left;
  color: ${LABEL_TEXT_COLOR};
  &:after {
    content: '*';
    color: ${ERROR_COLOR};
  }
`;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexDirection: 'row',
      colorPrimary: {
        color: `${RADIO_BTN_COLOR}`
      },
      '&$checked': {
        color: `${RADIO_BTN_COLOR}`
      }
    }
  })
);


export { Wrapper, Label, useStyles };
