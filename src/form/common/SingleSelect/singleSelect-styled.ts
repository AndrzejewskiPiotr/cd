import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
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
  color: #79818b;
  &:after {
  content: '*';
  color: #ff4949;
  }
`;


export {
    Wrapper,
    Label,
}


