import React, { useRef } from 'react';

import DescriptionForm from '../form/descriptionForm';
import ImageViewer from './viewer';
import { usePromise } from '../hook';
import fetchImageData from '../api/map';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import './styles.css';

function SlideWorkBench({ id, className }: { id: string; className?: string }) {
  const url = `/image/iiif/${id}`;
  const container = useRef<HTMLInputElement>(null);
  const [data, isError] = usePromise(fetchImageData(`${url}/info.json`), []);
  const isDataReceived = data.length > 0;
  const { current: isContainerMounted } = container;

  if (isDataReceived && isContainerMounted) {
    ImageViewer(data, url);
  }

  return (
    <div id="wrapper" className={className}>
      <DescriptionForm />
      {isError && !isDataReceived ? null : (
        <div id="map-container" ref={container} />
      )}
    </div>
  );
}

export default SlideWorkBench;
