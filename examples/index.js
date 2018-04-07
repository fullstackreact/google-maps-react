import React from 'react';
import ReactDOM from 'react-dom';

import {
  hashHistory,
  IndexRoute,
  Link,
  Redirect,
  Route,
  Router
} from 'react-router';

import Container from './Container';

import Simple from './components/basic';
import Marker from './components/withMarkers';
import ClickableMarkers from './components/clickableMarkers';
import GooglePlaces from './components/places';
import Autocomplete from './components/autocomplete';
import HeatMap from './components/withHeatMap';
import Polygon from './components/withPolygons';
import Polyline from './components/withPolylines';
import CustomEvents from './components/resizeEvent';

const routeMap = {
  basic: {
    name: 'Simple',
    component: Simple
  },
  markers: {
    name: 'Marker',
    component: Marker
  },
  clickable_markers: {
    name: 'Clickable markers',
    component: ClickableMarkers
  },
  places: {
    name: 'Google places',
    component: GooglePlaces
  },
  autocomplete: {
    name: 'Autocomplete',
    component: Autocomplete
  },
  heatMap: {
    name: 'Heat Map',
    component: HeatMap
  },
  polygons: {
    name: 'Polygon',
    component: Polygon
  },
  polyline: {
    name: 'Polyline',
    component: Polyline
  },
  onResizeEvent: {
    name: 'Custom events',
    component: CustomEvents
  }
};

const createElement = (Component, props) => {
  const pathname = props.location.pathname.replace('/', '');
  const routeDef = routeMap[pathname];

  const newProps = {
    routeMap,
    pathname,
    routeDef
  };

  return <Component {...newProps} {...props} />;
};

const routes = (
  <Router createElement={createElement} history={hashHistory}>
    <Route component={Container} path="/">
      {Object.keys(routeMap).map(key => {
        const r = routeMap[key];

        return (
          <Route key={key} path={key} name={r.name} component={r.component} />
        );
      })}

      <IndexRoute component={routeMap.basic.component} />
    </Route>
  </Router>
);

const mountNode = document.querySelector('#root');

if (mountNode) ReactDOM.render(routes, mountNode);
else {
  const hljs = require('highlight.js');

  const codes = document.querySelectorAll('pre code');

  for (let i = 0; i < codes.length; i += 1) {
    const block = codes[i];
    hljs.highlightBlock(block);
  }
}
