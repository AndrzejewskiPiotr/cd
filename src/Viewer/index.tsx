import React, { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import 'leaflet-easybutton';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Container, Wrapper, Description } from './viewer-styled';
import ImageViewer from './viewer';
import { usePromise } from '../hook';
import fetchImageData from '../api/map';

function SlideWorkBench({ name,id, className }: { name: string,id: string; className?: string }) {
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
          <Description heading={name} id={id} />
        </Wrapper>
      )}
    </Container>
  );
}

export default SlideWorkBench;
