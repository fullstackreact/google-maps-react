import React from 'react'
import ReactDOM from 'react-dom'

let gmr = require('google-maps-react');
let Map = gmr.Map;
let InfoWindow = gmr.InfoWindow;
let Marker = gmr.Marker;
let GoogleApiWrapper = gmr.GoogleApiWrapper;

export const Container = React.createClass({

  render: function() {
    return (
      <div>
      <Map google={this.props.google}
          style={{width: '90%', height: '90%'}}
          className={'map'}
          zoom={14}
          containerStyle={{}}
          centerAroundCurrentLocation={true}
          />
      </div>
    )
  }
})

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__,
  libraries: ['places','visualization']
})(Container)
