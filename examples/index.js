import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory, Redirect, Route, IndexRoute, Link} from 'react-router'

import Container from './Container'

const routeMap = {
  'basic': {
    name: 'Simple',
    filename: 'basic'
  },
  'markers': {
    name: 'Marker',
    filename: 'withMarkers'
  },
  'clickable_markers': {
    name: 'Clickable markers',
    filename: 'clickableMarkers'
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
          history={browserHistory}>
    <Route component={Container}
           path='/'>
      {Object.keys(routeMap).map(key => {
        const C = require('./components/' + routeMap[key].filename).default;
        return (<Route
                key={key}
                path={key}
                name={key}
                component={C} />)
      })}
      <Redirect from='*' to='basic' />
    </Route>
  </Router>
)

const mountNode = document.querySelector('#root')
ReactDOM.render(routes, mountNode);
