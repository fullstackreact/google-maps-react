import React from 'react'
import ReactDOM from 'react-dom'

import Map, {GoogleApiWrapper} from '../../src/index'

const Listing = ({places}) => {
  return (
    <ul>
      {places && places.map(p => {
        return (
          <li key={p.id}>
            {p.name}
          </li>
        )
      })}
    </ul>
  )
}

const Container = React.createClass({
  getInitialState: function() {
    return {
      places: []
    }
  },

  onMapReady: function(mapProps, map) {
    this.searchNearby(map, map.center);
  },

  searchNearby(map, center) {
    const {google} = this.props;
    const service = new google.maps.places.PlacesService(map);
    // Specify location, radius and place types for your Places API search.
    const request = {
       location: center,
       radius: '500',
       type: ['food']
     };

    service.nearbySearch(request, (results, status, pagination) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {

        this.pagination = pagination;
        this.setState({
          places: results,
          hasNextPage: pagination.hasNextPage,
          center: center,
        })
      }
    })
  },

  render: function() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <Map google={this.props.google}
          className={'map'}
          onReady={this.onMapReady}
          visible={false}>

        <Listing places={this.state.places} />
      </Map>
    )
  }
});

export default Container
