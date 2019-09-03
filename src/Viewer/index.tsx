import React, { useRef } from 'react';

import ImageViewer from './viewer';
import { usePromise } from '../hook';
import fetchImageData from '../api/api';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import './styles.css';

function SlideWorkBench({ id, className }: { id: string; className?: string }) {
  const url = `/iiif/${id}`;
  const container = useRef<HTMLInputElement>(null);
  const [data, isError] = usePromise(fetchImageData(`${url}/info.json`), []);
  const isDataReceived = data.length > 0;
  const { current: isContainerMounted } = container;

  if (isDataReceived && isContainerMounted) {
    ImageViewer(data, url);
  }

  return (
    <React.Fragment>
      {isError && !isDataReceived ? null : (
        <div className={className} id="map-container" ref={container} />
      )}
    </React.Fragment>
  );
}

export default SlideWorkBench;
