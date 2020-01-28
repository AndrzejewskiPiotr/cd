import styled from 'styled-components';
import { DescriptionForm } from '../components/descriptionForm';

const Container = styled.div``;

const Wrapper = styled.div.attrs({
  id: 'map-container'
})``;

const MedicalDescription = styled(DescriptionForm)<{ editable: boolean}>`
  display: ${props => (props.editable ? 'flex' : 'none')};
`;

export { Container, Wrapper, MedicalDescription };
