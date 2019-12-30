import styled from 'styled-components';

import { ERROR_COLOR } from '../../../style';

const Wrapper = styled.p`
  margin: 5px 12px 5px 5px;
  height: 1em;
`;

const Text = styled.span`
  display: block;
  text-align: left;
  font-size: 0.75rem;
  color: ${ERROR_COLOR};
`;

export { Wrapper, Text };
