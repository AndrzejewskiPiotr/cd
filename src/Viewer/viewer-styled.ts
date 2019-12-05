import styled from 'styled-components';
import AnimatedForm from '../description/form';

const Description = styled(AnimatedForm)`
  background-color: aqua !important;
 && {
    @media (max-width: 426px) {
      display: none !important;
    }
 }
`

const Container = styled.div`
  #map-container {
    background-color: rgb(241, 243, 244);
  }
`;

const Wrapper = styled.div.attrs({
  id: 'map-container'
})``;

export { Container, Wrapper,Description };
