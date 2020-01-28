import React, { useRef } from 'react';
import { StylesProvider } from '@material-ui/styles';

import { CreateMap } from '../utility/map';
import { Container, Wrapper } from './slideWorkBench-styled';
import { usePromise } from '../hook/usePromise';
import { API } from '../api';
import { DescriptionForm } from '../components/descriptionForm';

type PSlideWorkBench = {
  editable: boolean;
  name: string;
  id: string;
  className?: string;
};
export function SlideWorkBench({name, id, editable, ...rest }: PSlideWorkBench) {
  const url = `/image/iiif/${id}/info.json`;
  const api = new API();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [data, isError] = usePromise(api.get(`${url}`), []);
  const { current: isContainerMounted } = mapContainerRef;

  const shouldRenderDescriptionForm = () => {
    return editable ? <DescriptionForm id={id} heading={name}/> : null
  }

  if (data && isContainerMounted) {
    CreateMap(`${url}`);
  }

  if (isError) {
    return null;
  }

  return (
      <StylesProvider injectFirst>
        <Container>
          <Wrapper {...rest} ref={mapContainerRef}>
            {shouldRenderDescriptionForm()}
          </Wrapper>
        </Container>
      </StylesProvider>
  );
}
