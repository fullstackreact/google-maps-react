import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory, Redirect, Route, IndexRoute, Link} from 'react-router'

import styles from './global.styles.css';

import Container from './Container'

const routeMap = {
  'basic': {
    name: 'Simple',
    component: require('./components/basic').default
  },
  'markers': {
    name: 'Marker',
    component: require('./components/withMarkers').default
  },
  'clickable_markers': {
    name: 'Clickable markers',
    component: require('./components/clickableMarkers').default
  },
  'places': {
    name: 'Google places',
    component: require('./components/places').default
  },
  'autocomplete': {
    name: 'Autocomplete',
    component: require('./components/autocomplete').default
  },
  'heatMap': {
    name: 'Heat Map',
    component: require('./components/withHeatMap').default
  }
}

const createElement = (Component, props) => {
  const pathname = props.location.pathname.replace('/', '')
  const routeDef = routeMap[pathname];
  const newProps = {
    routeMap, pathname, routeDef
  }
  return <Component {...newProps} {...props} />
}

const routes = (
  <Router createElement={createElement}
          history={hashHistory}>
    <Route component={Container}
           path='/'>
      {Object.keys(routeMap).map(key => {
        const r = routeMap[key]
        return (<Route
                key={key}
                path={key}
                name={r.name}
                component={r.component} />)
      })}
      <IndexRoute component={routeMap['basic'].component} />
    </Route>
  </Router>
)

const mountNode = document.querySelector('#root')
if (mountNode) {
  ReactDOM.render(routes, mountNode);
} else {
  const hljs = require('highlight.js');

  const codes = document.querySelectorAll('pre code');
  for (var i = 0; i < codes.length; i++) {
    const block = codes[i]
    hljs.highlightBlock(block);
  }
}
