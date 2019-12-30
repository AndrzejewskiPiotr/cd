import styled from 'styled-components';

import { ERROR_COLOR } from '../../../style';

const Wrapper = styled.div`
  display: grid;
  margin: 0 25px;
  :after {
    width: 4px;
    height: 8px;
    border: solid 0.5px #1f2d3d;
    background-color: #1f2d3d;
  }
`;

const Label = styled.label`
  margin: 5px;
  font-size: 13px;
  letter-spacing: 0.24px;
  text-align: left;
  color: #79818b;
  &:after {
    content: '*';
    color: ${ERROR_COLOR};
  }
`;

export { Wrapper, Label };
