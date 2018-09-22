import React from 'react';
import PropTypes from 'prop-types';

import { arePathsEqual } from '../lib/arePathsEqual';
import { camelize } from '../lib/String';
const evtNames = ['click', 'mouseout', 'mouseover'];

const wrappedPromise = function() {
    var wrappedPromise = {},
        promise = new Promise(function
           (resolve, reject) {
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
    if (
      this.props.map !== prevProps.map ||
      !arePathsEqual(this.props.path, prevProps.path)
    ) {
      if (this.circle) {
        this.circle.setMap(null);
      }
      this.renderCircle();
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
      center,
      radius,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      draggable,
      visible,
      ...props
    } = this.props;

    if (!google) {
        return null;
    }

    const params = {
      map,
      center,
      radius,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      draggable,
      visible,
      ...props
    };

    this.circle = new google.maps.Circle(params);

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
  center: PropTypes.object,
  radius: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
}

evtNames.forEach(e => Circle.propTypes[e] = PropTypes.func)

Circle.defaultProps = {
  name: 'Circle'
}

export default Circle
