import React from 'react';

import Map from '../../src/index';

import Rectangle from '../../src/components/Rectangle';


const WithRectangles = props => {
  if (!props.loaded) return <div>Loading...</div>;

  const bounds = {
    north: 37.789411,
    south: 37.731757,
    east: -122.410333,
    west: -122.489116,
  };

  return (
    <Map
      google={props.google}
      className="map"
      style={{ height: '100%', position: 'relative', width: '100%' }}
      zoom={11}
    >
      <Rectangle
        fillColor="#0000FF"
        fillOpacity={0.35}
        bounds={bounds}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    </Map>
  );
};

export default WithRectangles;
