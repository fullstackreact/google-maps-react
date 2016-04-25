import React from 'react'
import ReactDOM from 'react-dom'

import GoogleApiComponent from '../src/GoogleApiComponent'
import Map from '../src/index'
import Marker from '../src/MarkerComponent'


const Container = React.createClass({
  onMapMoved: function(map) {
    const center = map.center;
  },

  render: function() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div ref='map' style={{width: '100vw', height: '100vh'}}>
        <Map google={this.props.google}
            onMove={this.onMapMoved}>
          <Marker />
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
