import React, {PropTypes as T} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

import {GoogleApiWrapper} from '../src/index'
import styles from './styles.module.css'

export const Container = React.createClass({

  propTypes: {
    children: T.element.isRequired
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
    const {routeMap} = this.props;
    const c = this.renderChildren();
    return (
      <div className={styles.container}>
        <h1>Examples</h1>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            <ul>
              {Object.keys(routeMap).map(key => {
                return (<li key={key}>
                  <Link to={key}>
                    {key}
                  </Link>
                </li>)
              })}
            </ul>
          </div>
          <div className={styles.content}>
            {c}
          </div>
        </div>
      </div>
    )
  }
})

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)
