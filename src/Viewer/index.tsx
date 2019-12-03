import React, { useRef } from 'react';

import { Container, Wrapper } from './viewer-styled';
import ImageViewer from './viewer';
import { usePromise } from '../hook';
import fetchImageData from '../api/map';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
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
    <Container {...className}>
      {isError && !isDataReceived ? null : (
        <Wrapper {...className} ref={containerRef}>
          <AnimatedForm />
        </Wrapper>
      )}
    </Container>
  );
}

export default SlideWorkBench;
