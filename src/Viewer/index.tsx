import React, { useRef } from 'react';

import ImageViewer from './viewer';
import { usePromise } from "../hook";
import fetchImageData from "../api/api";
import './styles.css'

function SlideWorkBench({ id }: { id:string }) {
  const url = `https://stg.medrepo.apl.task.gda.pl/iiif/${id}`;
  const container = useRef<HTMLInputElement>(null);
  const [data, isError] = usePromise(fetchImageData(`${url}/info.json`), []);

  const isDataReceived = data.length > 0;
  const { current: isContainerMounted } = container;

  if( isDataReceived && isContainerMounted ) {
    console.log("ig",data,url);
    ImageViewer(data,url)
  }

  return (
    <React.Fragment>
      { isError && !isDataReceived ?
        null :
        <div id='map-container' ref={container}/>
      }
    </React.Fragment>
  )
};

export default SlideWorkBench
