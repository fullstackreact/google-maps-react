import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory, Redirect, Route, IndexRoute, Link} from 'react-router'

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
ReactDOM.render(routes, mountNode);
