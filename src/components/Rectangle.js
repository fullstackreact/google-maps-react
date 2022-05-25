import React from 'react';
import PropTypes from 'prop-types';

import { areBoundsEqual } from '../lib/areBoundsEqual';
import { camelize } from '../lib/String';
const evtNames = ['click', 'mouseout', 'mouseover'];

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

export class Rectangle extends React.Component {
  componentDidMount() {
    this.rectanglePromise = wrappedPromise();
    this.renderRectangle();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map ||
      !areBoundsEqual(this.props.bounds, prevProps.bounds)
    ) {
      if (this.rectangle) {
        this.rectangle.setMap(null);
      }
      this.renderRectangle();
    }
  }

  componentWillUnmount() {
    if (this.rectangle) {
      this.rectangle.setMap(null);
    }
  }

  renderRectangle() {
    const {
      map,
      google,
      bounds,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      ...props
    } = this.props;

    if (!google) {
        return null;
    }

    const params = {
      map,
      bounds,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      ...props
    };

    this.rectangle = new google.maps.Rectangle(params);

    evtNames.forEach(e => {
      this.rectangle.addListener(e, this.handleEvent(e));
    });

    this.rectanglePromise.resolve(this.rectangle);
  }

  getRectangle() {
    return this.rectanglePromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.rectangle, e);
      }
    }
  }

  render() {
    console.log('hii, ', this.props.bounds);
    return null;
  }
}

Rectangle.propTypes = {
  bounds: PropTypes.object,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number
}

evtNames.forEach(e => Rectangle.propTypes[e] = PropTypes.func)

Rectangle.defaultProps = {
  name: 'Rectangle'
}

export default Rectangle
