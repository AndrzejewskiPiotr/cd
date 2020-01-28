import React, { useRef } from 'react';
import { StylesProvider } from '@material-ui/styles';

import { CreateMap } from '../utility/map';
import {
  Container,
  Wrapper,
  MedicalDescription
} from './slideWorkBench-styled';
import { usePromise } from '../hook';

import { API } from '../api';

type PSlideWorkBench = {
  name: string;
  id: string;
  editable: boolean;
  className?: string;
};

export function SlideWorkBench({
  editable,
  name,
  id,
  ...rest
}: PSlideWorkBench) {
  const url = `/image/iiif/${id}/info.json`;
  const api = new API();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [data, isError] = usePromise(api.get(`${url}`), []);
  const { current: isContainerMounted } = mapContainerRef;

  if (data && isContainerMounted) {
    CreateMap(url);
  }

  if (isError) {
    return null;
  }

  return (
    <StylesProvider injectFirst>
      <Container>
        <Wrapper {...rest} ref={mapContainerRef}>
          <MedicalDescription id={id} heading={name} editable={editable} />
        </Wrapper>
      </Container>
    </StylesProvider>
  );
}
