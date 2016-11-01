import React, {PropTypes as T} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import GitHubForkRibbon from 'react-github-fork-ribbon'

let GoogleApiWrapper;
if (__IS_DEV__) {
  GoogleApiWrapper = require('../src/index').GoogleApiWrapper
} else {
  GoogleApiWrapper = require('../dist').GoogleApiWrapper
}

import styles from './styles.module.css'

export const Container = React.createClass({

  propTypes: {
    children: T.element.isRequired
  },

  contextTypes: {
    router: T.object
  },

  renderChildren: function() {
    const {children} = this.props;
    if (!children) return;

    const sharedProps = {
      google: this.props.google,
      loaded: this.props.loaded
    }
    return React.Children.map(children, c => {
      return React.cloneElement(c, sharedProps, {

      });
    })
  },

  render: function() {
    const {routeMap, routeDef} = this.props;
    const {router} = this.context;

    const c = this.renderChildren();
    return (
      <div className={styles.container}>
        <GitHubForkRibbon href="//github.com/fullstackreact/google-maps-react"
                  target="_blank"
                  position="right">
          Fork me on GitHub
        </GitHubForkRibbon>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            <ul>
              {Object.keys(routeMap).map(key => {
                return (
                  <Link to={key}
                        activeClassName={styles.active}
                        key={key}>
                    <li>{routeMap[key].name}</li>
                  </Link>
                )
              })}
            </ul>
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>{routeDef && routeDef.name} Example</h1>
              <h2><a href="https://github.com/fullstackreact/google-maps-react/blob/master/README.md">Readme</a></h2>
            </div>
            {c}
          </div>
        </div>
      </div>
    )
  }
})

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__,
  libraries: ['places','visualization']
})(Container)
