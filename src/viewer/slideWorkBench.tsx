import React, { useRef } from 'react';

import CreateMap from '../utility/map';
import { Container, Wrapper } from './slideWorkBench-styled';
import { usePromise } from '../hook/usePromise/index';
import { API } from '../api';
import { DescriptionForm } from '../components/DescriptionForm';

type PSlideWorkBench = {
  name: string;
  id: string;
  className?: string;
};

export function SlideWorkBench({ name, id, ...rest }: PSlideWorkBench) {
  const url = `/image/iiif/${id}/info.json`;
  const api = new API();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [data, isError] = usePromise(api.get(`${url}`), []);
  const { current: isContainerMounted } = mapContainerRef;

  if (data && isContainerMounted) {
    CreateMap(`${url}`);
  }

  if (isError && !data) {
    return null;
  }

  return (
    <Container>
      <Wrapper {...rest} ref={mapContainerRef}>
        <DescriptionForm id={id} heading="dsdas" />
      </Wrapper>
    </Container>
  );
}
