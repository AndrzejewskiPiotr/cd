import styled from 'styled-components';

const Container = styled.div`
  #map-container {
    background-color: rgb(241, 243, 244);
  }
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div.attrs({
  id: 'map-container'
})``;

export { Container, Wrapper };
