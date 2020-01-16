import styled from 'styled-components';
import { ERROR_COLOR, HEADING_COLOR, LABEL_TEXT_COLOR } from '../../../style';

const Wrapper = styled.div`
  display: grid;
  box-sizing: border-box;
  margin: 0 25px;
`;

const Input = styled.input`
  height: 32px;
  border-radius: 6px;
  border: solid 1.5px #c0ccda;
  background-color: #f5f8fa;
  padding: 0 8px 0;
  box-sizing: border-box;
  font-size: 14px;
  letter-spacing: 0.17px;
  color: ${HEADING_COLOR};

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${HEADING_COLOR};
  }
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

export { Input, Wrapper, Label };
