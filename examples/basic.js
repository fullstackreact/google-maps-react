import React from 'react'
import ReactDOM from 'react-dom'

import GoogleApiComponent from '../src/GoogleApiComponent'
import Map from '../src/index'
import Marker from '../src/components/Marker'
import InfoWindow from '../src/components/InfoWindow'

const Container = React.createClass({
  getInitialState: function() {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  },

  onMapMoved: function(props, map) {
    const center = map.center;
    console.log('center ->', props);
  },

  onMarkerClick: function(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  },

  onInfoWindowClose: function() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  },

  onMapClicked: function(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
      });
    }
  },

  render: function() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div ref='map' style={{width: '100vw', height: '100vh'}}>
        <Map google={this.props.google}
            zoom={14}
            onClick={this.onMapClicked}
            onDragend={this.onMapMoved}>
          <Marker
            onClick={this.onMarkerClick}
            name={'SOMA'}
            position={{lat: 37.778519, lng: -122.405640}} />
          <Marker
            onClick={this.onMarkerClick}
            name={'Dolores park'}
            position={{lat: 37.759703, lng: -122.428093}} />
          <Marker />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}>
              <h1>{this.state.selectedPlace.name}</h1>
          </InfoWindow>
        </Map>
      </div>
    )
  }
});

const Wrapped = GoogleApiComponent({
  apiKey: __GAPI_KEY__
})(Container)

const mountNode = document.querySelector('#root')
ReactDOM.render(<Wrapped />, mountNode)
