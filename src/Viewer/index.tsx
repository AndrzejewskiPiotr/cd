import React, { useRef } from 'react';

import { Container, Wrapper } from './viewer-styled';
import ImageViewer from './viewer';
import { usePromise } from '../hook';
import fetchImageData from '../api/map';
import AnimatedForm from '../description/form';

function SlideWorkBench({ id, className }: { id: string; className?: string }) {
  const url = `/image/iiif/${id}`;
  const containerRef = useRef<HTMLInputElement>(null);
  const [data, isError] = usePromise(fetchImageData(`${url}/info.json`), []);
  const isDataReceived = data.length > 0;
  const { current: isContainerMounted } = containerRef;

  if (isDataReceived && isContainerMounted) {
    ImageViewer(data, url);
  }

  return (
    <Container>
      {isError && !isDataReceived ? null : (
        <Wrapper className={className} ref={containerRef}>
          <AnimatedForm heading={id} />
        </Wrapper>
      )}
    </Container>
  );
}

export default SlideWorkBench;
