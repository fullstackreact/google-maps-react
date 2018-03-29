import React from 'react';
import ReactDOM from 'react-dom';

import {ScriptCache} from './lib/ScriptCache';
import GoogleApi from './lib/GoogleApi';

const defaultMapConfig = {};
const defaultCreateCache = options => {
  options = options || {};
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];
  const version = options.version || '3';
  const language = options.language || 'en';
  const url = options.url;

  return ScriptCache({
    google: GoogleApi({
      apiKey: apiKey,
      language: language,
      libraries: libraries,
      version: version,
      url: url
    })
  });
};

const DefaultLoadingContainer = props => <div>Loading...</div>;

export const wrapper = input => WrappedComponent => {
  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);
      const options = typeof input === 'function' ? input(props) : input;
      const createCache = options.createCache || defaultCreateCache;

      this.scriptCache = createCache(options);
      this.scriptCache.google.onLoad(this.onLoad.bind(this));
      this.LoadingContainer =
        options.LoadingContainer || DefaultLoadingContainer;

      this.state = {
        loaded: false,
        map: null,
        google: null
      };
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
          <div ref="map" />
        </div>
      );
    }
  }

  return Wrapper;
};

export default wrapper;
