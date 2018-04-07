import React from 'react';

import Map from '../../src/index';

import Marker from '../../src/components/Marker';
import InfoWindow from '../../src/components/InfoWindow';

const WithMarkers = props => {
  if (!props.loaded) return <div>Loading...</div>;

  return (
    <Map
      google={props.google}
      className="map"
      style={{ height: '100%', position: 'relative', width: '100%' }}
      zoom={14}>
      <Marker
        name="SOMA"
        position={{ lat: 37.778519, lng: -122.40564 }}
        title="The marker`s title will appear as a tooltip."
      />

      <Marker
        name="Dolores park"
        position={{ lat: 37.759703, lng: -122.428093 }}
      />

      <Marker />
    </Map>
  );
};

export default WithMarkers;
