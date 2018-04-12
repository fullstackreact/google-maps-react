import React, { Component } from 'react';
import PropTypes from 'prop-types';

function stylesFeatures() {
  return {
    strokeWeight: 0.5,
    strokeColor: '#f1f1f1',
    zIndex: 1,
    fillColor: '#5d5d5d',
    fillOpacity: 0.75,
    visible: true
  };
}

export class ChoroplethMap extends Component {
  componentDidMount() {
    if (this.props.geoJsonData) {
      this.renderFeatures();
    }
  }

  componentDidUpdate(prevProps) {
    const { geoJsonData } = this.props;
    if (geoJsonData && geoJsonData !== prevProps.geoJsonData) {
       this.renderFeatures();
    }
    this.updateStyles();
  }

  componentWillUnmount() {
    const { map } = this.props;
    if (map) {
      this.features.forEach(el => map.data.remove(el));
    }
    this.features = null;
  }

  updateStyles() {
    const { map, stylesFeature } = this.props;
    if (!map) {
      return null;
    }
    map.data.setStyle(stylesFeature);
  }

  renderFeatures() {
    const { map } = this.props;
    if (!map) {
      return null;
    }
    this.features = map.data.addGeoJson(this.props.geoJsonData);
  }

  render() {
    return null;
  }
}

ChoroplethMap.propTypes = {
  map: PropTypes.object,
  geoJsonData: PropTypes.object,
  stylesFeature: PropTypes.func
};

ChoroplethMap.defaultProps = {
  stylesFeature: stylesFeatures
};

export default ChoroplethMap;