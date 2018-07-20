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

export class Circle extends React.Component {

  componentDidMount() {
    this.circlePromise = wrappedPromise();
    this.renderCircle();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        if (this.circle) {
          this.circle.setMap(null);
          this.renderCircle();
        }
    }
  }

  componentWillUnmount() {
    if (this.circle) {
      this.circle.setMap(null);
    }
  }

  renderCircle() {
    const {
      map,
      google,
      positions,
      strokeColor   = "#FF0000",
      strokeOpacity = 0.8,
      strokeWeight  = 2,
      fillColor     = "#FF0000",
      fillOpacity   = 0.35,
      radius        = 150,
      ...props
    } = this.props;

    if (!google) {
        return null;
    }

    const data = positions.map((pos) => {
        return new google.maps.LatLng(pos.lat, pos.lng);
    });

    const pref = {
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      map,
      radius,
      ...props
    };

    this.circle = new google.maps.Circle(pref);

    this.circle.set('radius', radius === undefined ? 150 : radius);


    evtNames.forEach(e => {
      this.circle.addListener(e, this.handleEvent(e));
    });

    this.circlePromise.resolve(this.circle);
  }

  getCircle() {
    return this.circlePromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.circle, e);
      }
    }
  }

  render() {
    return null;
  }
}

Circle.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object,
  icon: PropTypes.string
}

evtNames.forEach(e => Circle.propTypes[e] = PropTypes.func)

Circle.defaultProps = {
  name: 'Circle'
}

export default Circle
