import React from 'react';

import Map from '../../src/index';

const Container = props => {
  if (!props.loaded) return <div>Loading...</div>;

  return (
    <Map
      centerAroundCurrentLocation
      className="map"
      google={props.google}
      style={{ height: '100%', position: 'relative', width: '100%' }}
      zoom={14}
    />
  );
};

export default Container;
