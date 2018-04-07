import React, { Component } from 'react';

import GitHubForkRibbon from 'react-github-fork-ribbon';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import styles from './styles.module.css';

const GoogleApiWrapper = __IS_DEV__
  ? require('../src/index').GoogleApiWrapper
  : require('../dist').GoogleApiWrapper;

class Container extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  renderChildren = () => {
    const { children } = this.props;

    if (!children) return;

    const sharedProps = {
      google: this.props.google,
      loaded: this.props.loaded
    };

    return React.Children.map(children, child =>
      React.cloneElement(child, sharedProps, {})
    );
  };

  render() {
    const { routeMap, routeDef } = this.props;

    return (
      <div className={styles.container}>
        <GitHubForkRibbon
          href="//github.com/fullstackreact/google-maps-react"
          position="right"
          target="_blank">
          Fork me on GitHub
        </GitHubForkRibbon>

        <div className={styles.wrapper}>
          <div className={styles.list}>
            <ul>
              {Object.keys(routeMap).map(key => (
                <Link activeClassName={styles.active} key={key} to={key}>
                  <li>{routeMap[key].name}</li>
                </Link>
              ))}
            </ul>
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <h1>{routeDef && routeDef.name} Example</h1>

              <h2>
                <a href="https://github.com/fullstackreact/google-maps-react/blob/master/README.md">
                  Readme
                </a>
              </h2>
            </div>

            {this.renderChildren()}
          </div>
        </div>
      </div>
    );
  }
}

const Loading = () => <div>Fancy loading container</div>;

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__,
  libraries: ['places', 'visualization'],
  LoadingContainer: Loading
})(Container);
