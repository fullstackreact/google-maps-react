import React from 'react'
import PropTypes from 'prop-types'

import { camelize } from '../lib/String'
const evtNames = ['click', 'mouseover', 'recenter'];

const wrappedPromise = function() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
}

export class HeatMap extends React.Component {

  componentDidMount() {
    this.heatMapPromise = wrappedPromise();
    this.renderHeatMap();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        if (this.heatMap) {
          this.heatMap.setMap(null);
          this.renderHeatMap();
        }
    }
  }

  componentWillUnmount() {
    if (this.heatMap) {
      this.heatMap.setMap(null);
    }
  }

  renderHeatMap() {
    const {
      map,
      google,
      positions,
      mapCenter,
      icon,
      gradient,
      radius = 20,
      opacity = 0.2,
      ...props
    } = this.props;

    if (!google) {
        return null;
    }

    const data = positions.map((pos) => {
        return {location: new google.maps.LatLng(pos.lat, pos.lng), weight:pos.weight}
    });

    const pref = {
      map,
      gradient,
      radius,
      opacity,
      data,
      ...props
    };

    this.heatMap = new google.maps.visualization.HeatmapLayer(pref);

    this.heatMap.set('radius', radius === undefined ? 20 : radius);

    this.heatMap.set('opacity', opacity === undefined ? 0.2 : opacity);

    evtNames.forEach(e => {
      this.heatMap.addListener(e, this.handleEvent(e));
    });

    this.heatMapPromise.resolve(this.heatMap);
  }

  getHeatMap() {
    return this.heatMapPromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.heatMap, e);
      }
    }
  }

  render() {
    return null;
  }
}

HeatMap.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object,
  icon: PropTypes.string
}

evtNames.forEach(e => HeatMap.propTypes[e] = PropTypes.func)

HeatMap.defaultProps = {
  name: 'HeatMap'
}

export default HeatMap
