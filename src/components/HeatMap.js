import React, { PropTypes as T } from 'react'

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
    let {
      map, google, positions, mapCenter, icon, gradient, radius, opacity
    } = this.props;

    if (!google) {
        return null;
    }

    positions = positions.map((pos) => {
        return new google.maps.LatLng(pos.lat, pos.lng);
    });

    const pref = {
      map: map,
      data: positions,
    };

    this.heatMap = new google.maps.visualization.HeatmapLayer(pref);

    this.heatMap.set('gradient', gradient);

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
  position: T.object,
  map: T.object,
  icon: T.string
}

evtNames.forEach(e => HeatMap.propTypes[e] = T.func)

HeatMap.defaultProps = {
  name: 'HeatMap'
}

export default HeatMap
