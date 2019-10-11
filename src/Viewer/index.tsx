import React, { useRef } from 'react';
import { connect } from "react-redux";
import SpringModal from '../form/description-form'
import ImageViewer from './viewer';
import { usePromise } from '../hook';
import fetchImageData from '../api/api';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import './styles.css';


// @ts-ignore
const mapDispatchToProps = dispatch => ({
  toggleTodo: () => dispatch({type:'increment'})
})

function Slide({ id, className, toggleTodo }: { id: string; className?: string, toggleTodo: any }) {
  const url = `/image/iiif/${id}`;
  const container = useRef<HTMLInputElement>(null);
  const [data, isError] = usePromise(fetchImageData(`${url}/info.json`), []);
  const isDataReceived = data.length > 0;
  const { current: isContainerMounted } = container;
  //@ts-ignore
  const handle = () => {
    toggleTodo()
  }

  if (isDataReceived && isContainerMounted) {
    ImageViewer(data, url,handle);
  }

  return (
    <React.Fragment>
      {isError && !isDataReceived ? null : (
        <div className={className} id="map-container" ref={container}>
          <SpringModal/>
        </div>
      )}
    </React.Fragment>
  );
}

export default connect(null,mapDispatchToProps)(Slide);
