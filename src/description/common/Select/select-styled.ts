import styled from 'styled-components'
import Select from 'react-select'

const Wrapper = styled.div`
  display: grid;
  :after {
  width: 4px;
  height: 8px;
  border: solid 0.5px #1f2d3d;
  background-color: #1f2d3d;
}
`;

const StyledSelect = styled(Select)`
`;

const Label = styled.label`
  margin: 5px;
  font-size: 13px;
  letter-spacing: 0.24px;
  text-align: left;
  color: #79818b;
  &:after {
  content: '*';
  color: #ff4949;
  }
`;


export {
    Wrapper,
    Label,
    StyledSelect
}

