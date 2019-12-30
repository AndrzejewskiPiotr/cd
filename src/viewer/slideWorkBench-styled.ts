import styled from 'styled-components';
import { MAP_CONTAINER_BACKGROUND } from '../style/index';

const Container = styled.div`
  #map-container {
    background-color: ${MAP_CONTAINER_BACKGROUND};
    width: 800px;
    height: 800px;
  }
`;

const Wrapper = styled.div.attrs({
  id: 'map-container'
})``;

export { Container, Wrapper };
