import styled from 'styled-components';

const Container = styled.div`
  #map-container {
    background-color: rgb(241, 243, 244);
  }
`;

const Wrapper = styled.div.attrs({
  id: 'map-container'
})``;

export { Container, Wrapper };
