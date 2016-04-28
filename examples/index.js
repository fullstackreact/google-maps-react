import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory, Redirect, Route, Link} from 'react-router'

import Container from './Container'
import Basic from './basic'
import WithMarkers from './withMarkers'

const routeMap = {
  'basic': Basic,
  'markers': WithMarkers,
}

const createElement = (Component, props) => {
  const newProps = {
    routeMap: routeMap
  }
  return <Component {...newProps} {...props} />
}

const routes = (
  <Router createElement={createElement}
          history={browserHistory}>
    <Route component={Container}
           path=''>

      {Object.keys(routeMap).map(key => {
        return (<Route
                key={key}
                path={key}
                component={routeMap[key]} />)
      })}
      <Redirect from='*' to='/basic' />
    </Route>
  </Router>
)

const mountNode = document.querySelector('#root')
ReactDOM.render(routes, mountNode);
