import React from 'react';

import Map from '../../src/index';

import Polyline from '../../src/components/Polyline';

const WithPolylines = props => {
  if (!props.loaded) return <div>Loading...</div>;

  const polyline = [
    { lat: 37.789411, lng: -122.422116 },
    { lat: 37.785757, lng: -122.421333 },
    { lat: 37.789352, lng: -122.415346 }
  ];

  return (
    <Map
      className="map"
      google={props.google}
      style={{ height: '100%', position: 'relative', width: '100%' }}
      zoom={14}>
      <Polyline
        fillColor="#0000FF"
        fillOpacity={0.35}
        path={polyline}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    </Map>
  );
};

export default WithPolylines;
