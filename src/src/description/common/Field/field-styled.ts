import styled from 'styled-components';

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
  font-family: Nunito;
  box-sizing: border-box;
  font-size: 14px;
  letter-spacing: 0.17px;
  color: #1f2d3d;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #1f2d3d;
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
    color: #ff4949;
  }
`;

export { Input, Wrapper, Label };
