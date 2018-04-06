import React from 'react';

import Map from '../../src/index';

import Polygon from '../../src/components/Polygon';

const WithPolygons = props => {
  if (!props.loaded) return <div>Loading...</div>;

  const polygon = [
    { lat: 37.789411, lng: -122.422116 },
    { lat: 37.785757, lng: -122.421333 },
    { lat: 37.789352, lng: -122.415346 }
  ];

  return (
    <Map
      google={props.google}
      className="map"
      style={{ height: '100%', position: 'relative', width: '100%' }}
      zoom={14}>
      <Polygon
        fillColor="#0000FF"
        fillOpacity={0.35}
        paths={[polygon]}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    </Map>
  );
};

export default WithPolygons;
