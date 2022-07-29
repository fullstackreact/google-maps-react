import React, { useState, Fragment } from 'react';
import Map from '../../src/index';
import CustomOverlay from '../../src/components/CustomOverlay';
import styles from './withCustomOverlay.module.css';

const WithCustomOverlay = (props) => {
  const [showOverlay, setShowOverlay] = useState(true);
  if (!props.loaded) return <div>Loading...</div>;

  return (
    <Fragment>
      <button
        className={styles.button}
        onClick={() => setShowOverlay(!showOverlay)}
      >
        Toggle Popup
      </button>
      <Map google={props.google} className="map" zoom={14}>
        <CustomOverlay
          position={{ lat: 37.782551, lng: -122.425368 }}
          visible={showOverlay}
          className={styles.overlayContainer}
          passThroughMouseEvents={true}
        >
          <div>Hi there. I'm a custom overlay.</div>
        </CustomOverlay>
      </Map>
    </Fragment>
  );
};

export default WithCustomOverlay;
