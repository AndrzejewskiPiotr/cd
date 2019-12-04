import { animated } from 'react-spring';
import styled from 'styled-components';

const OpenBtn = styled(animated.button)`
  position: relative;
  cursor: pointer;
  z-index: 99999999;
  display: block;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: black;
  margin: 10px;
  line-height: 30px;
`;

const Container = styled(animated.form)`
  position: absolute;
  top: 10px;
  left: 10px;
  max-width: 600px;
  width: 100%;
  max-height: 90%;
  flex-flow: column;
  display: none;
  background: transparent;
  box-shadow: none;
  will-change: width, height;
  z-index: 401;
  border-radius: 8px;
  border: solid 1px #979797;
`;

const Item = styled(animated.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  will-change: transform, opacity;
`;

const Header = styled.div`
  padding: 12px;
  margin: 0 0 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #d3dce6;
`;
const Submit = styled.button`
  width: 96px;
  height: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(19, 206, 102, 0.3);
  background-color: #13ce66;
  color: white;
  border: 0;
  cursor: pointer;
  margin: 0 25px;
  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div``;

const Heading = styled.span`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.27px;
  color: #1f2d3d;
`;

export { Container, Item, OpenBtn, Header, Wrapper, Submit, Heading };
