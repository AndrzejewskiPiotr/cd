import styled from 'styled-components'

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 32px;
  border-radius: 8px;
  outline: none;
  border: solid 1px #979797;
  background-color: #ffffff;
`;

const Submit = styled.button`
  width: 96px;
  height: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(19, 206, 102, 0.3);
  background-color: #13ce66;
  color: white;
  border: 0;
    &:focus {
    border: none;
  }
`

export {
  Wrapper,
  Submit
}   ;
