import React from 'react'

export class Marker extends React.Component {

  componentDidUpdate(prevProps) {
    console.log('prevProps in Marker', prevProps);

    if ((this.props.mapCenter !== prevProps.mapCenter) ||
      (this.props.map !== prevProps.map)) {
        const {name, map, google, mapCenter} = this.props;

        const pref = Object.assign({}, {
          map: map,
          position: mapCenter,
          name: name
        })
        this.marker = new google.maps.Marker(pref);
    }
  }

  render() {
    return (<div className='marker' />)
  }
}

export default Marker
