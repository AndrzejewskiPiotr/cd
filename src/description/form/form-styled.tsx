import { animated } from 'react-spring'
import styled from 'styled-components'

const OpenBtn = styled(animated.button)`
  position: relative;
  cursor: pointer;
  z-index: 99999999;
  display:block;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: black;
  margin: 10px;
  line-height: 30px;
`

const Container = styled(animated.form)`
  position: absolute;
  top: 10px;
  left: 10px;
  max-width: 600px;
  max-height: 90%;
  flex-flow: column;
  padding: 25px;
  display: none;
  background: transparent;
  box-shadow: none;
  border-radius: 5px;
  will-change: width, height;
  z-index: 401;
`

const Item = styled(animated.div)`
  position:relative;
  z-index: 2;
  width: 100%;
  will-change: transform, opacity;
`

const ExitBtn = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 404;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: 0;
  cursor: pointer;
`
const Submit = styled.button`
  width: 96px;
  height: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(19, 206, 102, 0.3);
  background-color: #13ce66;
  color: white;
  border: 0;
  cursor:pointer;
  &:focus {
    outline: none;
  }

`

const Wrapper = styled.div``

export { Container, Item, OpenBtn, ExitBtn, Wrapper, Submit }
