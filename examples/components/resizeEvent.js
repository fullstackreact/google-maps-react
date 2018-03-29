import React from 'react';
import ReactDOM from 'react-dom';

import Map, {GoogleApiWrapper} from '../../src/index';

const Container = React.createClass({
  getInitialState: function() {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  },

  onMapReady: function(mapProps, map) {
    this.map = map;

    window.onresize = function() {
      var currCenter = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(currCenter);
    };
  },

  onMapMoved: function(props, map) {
    const center = map.center;
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
    });
  },

  onMapClicked: function(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  },

  render: function() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <Map
        google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        onReady={this.onMapReady}
        zoom={14}
        containerStyle={{}}
        centerAroundCurrentLocation={true}
        onClick={this.onMapClicked}
        onDragend={this.onMapMoved}
      />
    );
  }
});

export default Container;
