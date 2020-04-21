import React from 'react';
import ReactDOM from 'react-dom';

import {ScriptCache} from './lib/ScriptCache';
import GoogleApi from './lib/GoogleApi';

const defaultMapConfig = {};

const serialize = obj => JSON.stringify(obj);
const isSame = (obj1, obj2) => obj1 === obj2 || serialize(obj1) === serialize(obj2);

const defaultCreateCache = options => {
  options = options || {};
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];
  const version = options.version || '3';
  const language = options.language || 'en';
  const url = options.url;
  const client = options.client;
  const region = options.region;

  return ScriptCache({
    google: GoogleApi({
      apiKey: apiKey,
      language: language,
      libraries: libraries,
      version: version,
      url: url,
      client: client,
      region: region
    })
  });
};

const DefaultLoadingContainer = props => <div>Loading...</div>;

export const wrapper = input => WrappedComponent => {
  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);

      // Build options from input
      const options = typeof input === 'function' ? input(props) : input;

      // Initialize required Google scripts and other configured options
      this.initialize(options);

      this.state = {
        loaded: false,
        map: null,
        google: null,
        options: options
      };

      this.mapRef=React.createRef();
    }

    UNSAFE_componentWillReceiveProps(props) {
      // Do not update input if it's not dynamic
      if (typeof input !== 'function') {
        return;
      }

      // Get options to compare
      const prevOptions = this.state.options;
      const options = typeof input === 'function' ? input(props) : input;

      // Ignore when options are not changed
      if (isSame(options, prevOptions)) {
        return;
      }

      // Initialize with new options
      this.initialize(options);

      // Save new options in component state,
      // and remove information about previous API handlers
      this.setState({
        options: options,
        loaded: false,
        google: null
      });
    }
    
    componentWillUnmount() {
      if (this.unregisterLoadHandler) {
        this.unregisterLoadHandler();
      }  
    }

    initialize(options) {
      // Avoid race condition: remove previous 'load' listener
      if (this.unregisterLoadHandler) {
        this.unregisterLoadHandler();
        this.unregisterLoadHandler = null;
      }

      // Load cache factory
      const createCache = options.createCache || defaultCreateCache;

      // Build script
      this.scriptCache = createCache(options);
      this.unregisterLoadHandler =
        this.scriptCache.google.onLoad(this.onLoad.bind(this));

      // Store information about loading container
      this.LoadingContainer =
        options.LoadingContainer || DefaultLoadingContainer;
    }

    onLoad(err, tag) {
      this._gapi = window.google;

      this.setState({loaded: true, google: this._gapi});
    }

    render() {
      const {LoadingContainer} = this;
      if (!this.state.loaded) {
        return <LoadingContainer />;
      }

      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        google: window.google
      });

      return (
        <div>
          <WrappedComponent {...props} />
          <div ref={this.mapRef} />
        </div>
      );
    }
  }

  return Wrapper;
};

export default wrapper;
