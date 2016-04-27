import React, { PropTypes as T } from 'react'

import { camelize } from '../lib/String'
const evtNames = ['click', 'mouseover'];

export class Marker extends React.Component {

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        let {
          map, google, position, mapCenter
        } = this.props;

        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
          map: map,
          position: position
        };
        this.marker = new google.maps.Marker(pref);

        evtNames.forEach(e => {
          this.marker.addListener(e, this.handleEvent(e));
        })
    }
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    }
  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  position: T.object,
  map: React.PropTypes.object
}

evtNames.forEach(e => Marker.propTypes[e] = T.func)

Marker.defaultProps = {
  name: 'Marker'
}

export default Marker
