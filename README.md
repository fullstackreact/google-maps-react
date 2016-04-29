# Google Map React component

![](http://d.pr/i/C7qr.png)

> A declarative Google Map React component using React, lazy-loading dependencies, current-location finder and a test-driven approach by the [fullstack react](https://fullstackreact.com) team.

See the [demo](https://fullstackreact.github.io/google-maps-react).

## Quickstart

First, install the library:

```shell
npm install --save google-maps-react
```

Usage:

```javascript
<Map google={this.props.google} zoom={14}>

  <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

  <InfoWindow onClose={this.onInfoWindowClose}>
      <div>
        <h1>{this.state.selectedPlace.name}</h1>
      </div>
  </InfoWindow>
</Map>
```

## Map

The `<Map />` component _requires_ a `google` prop be included to work. Without the `google` prop, it will explode.

```javascript
<Map google={window.google} />
```

### Events

The `<Map />` component handles events out of the box. All event handlers are optional.

#### onReady

When the `<Map />` instance has been loaded and is ready on the page, it will call the `onReady` prop, if given. The `onReady` prop is useful for fetching places or using the autocomplete API for places.

```javascript
React.createClass({
  fetchPlaces: function(mapProps, map) {
    const {google} = this.props;
    const service = new google.maps.places.PlacesService(map);
    // ...
  },
  render: function() {
    return (
      <Map google={this.props.google}
        onReady={this.fetchPlaces}
        visible={false}>
          <Listing places={this.state.places} />
      </Map>
    )
  }
});
```

#### onClick

To listen for clicks on the `<Map />` component, pass the `onClick` prop:

```javascript
React.createClass({
  mapClicked: function(mapProps, map, clickEvent) {
    // ...
  },
  render: function() {
    return (
      <Map google={this.props.google}
        onClick={this.mapClicked} />
    )
  }
});
```

#### onDragend

When our user changes the map center by dragging the Map around, we can get a callback after the event is fired with the `onDragend` prop:

```javascript
React.createClass({
  centerMoved: function(mapProps, map) {
    // ...
  },
  render: function() {
    return (
      <Map google={this.props.google}
        onDragend={this.centerMoved} />
    )
  }
});
```

### Visibility

You can control the visibility of the map by using the `visible` prop. This is useful for situations when you want to use the Google Maps API without a map. The `<Map />` component will load like normal. See the [google places demo](https://fullstackreact.github.io/google-maps-react/#/places)

For example:

```javascript
<Map google={this.props.google}
    visible={false}>
  <Listing places={this.state.places} />
</Map>
```

## Subcomponents

The `<Map />` api includes subcomponents intended on being used as children of the `Map` component. Any child can be used within the `Map` component and will receive the three `props` (as children):

* map - the Google instance of the `map`
* google - a reference to the `window.google` object
* mapCenter - the `google.maps.LatLng()` object referring to the center of the map instance

### Marker

To place a marker on the Map, include it as a child of the `<Map />` component.

```javascript
<Map google={this.props.google}
    style={{width: '100%', height: '100%', position: 'relative'}}
    className={'map'}
    zoom={14}>
  <Marker
    name={'SOMA'}
    position={{lat: 37.778519, lng: -122.405640}} />
  <Marker
    name={'Dolores park'}
    position={{lat: 37.759703, lng: -122.428093}} />
  <Marker />
</Map>
```

The `<Marker />` component accepts a `position` prop that defines the location for the `position` on the map. It can be either a raw object or a `google.maps.LatLng()` instance.

If no `position` is passed in the `props`, the marker will default to the current position of the map, i.e. the `mapCenter` prop.

You can also pass any other `props` you want with the `<Marker />`. It will be passed back through marker events.

### Events

The `<Marker />` component listens for events, similar to the `<Map />` component.

#### onClick

You can listen for an `onClick` event with the (appropriately named) `onClick` prop.

```javascript
const WithMarkers = React.createClass({
  onMarkerClick: function(props, marker, e) {
  },
  render: function() [
    return (
      <Map google={this.props.google}>
        <Marker onClick={this.onMarkerClick}
            name={'Current location'} />
      </Map>
    )
  ]
});
```

#### mouseover

You can also pass a callback when the user mouses over a `<Marker />` instance by passing the `onMouseover` callback:

```javascript
const Container = React.createClass({
  onMouseoverMarker: function(props, marker, e) {
  },
  render: function() [
    return (
      <Map google={this.props.google}>
        <Marker onMouseover={this.onMouseoverMarker}
            name={'Current location'} />
      </Map>
    )
  ]
});
```

// TODO: Document InfoWindow component

## Automatically Lazy-loading google api

The library includes a helper to wrap around the google maps API. The `GoogleApiWrapper` Higher-Order component accepts a configuration object which *must* include an `apiKey`. See [lib/GoogleApi.js](https://github.com/fullstackreact/google-maps-react/blob/master/src/lib/GoogleApi.js#L4) for all options it accepts.

```javascript
import {GoogleApiWrapper} from 'GoogleMapsReactComponent'

// ...

export class Container extends React.Component {}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)
```

The `GoogleApiWrapper` automatically passes the `google` instance loaded when the component mounts (and will only load it once).

## Manually loading the google api

If you prefer not to use the automatic loading option, you can also pass the `window.google` instance as a `prop` to your `<Map />` component.

## Contributing

```shell
git clone https://github.com/fullstackreact/google-maps-react.git
cd google-maps-react
npm install
make dev
```



The Google Map React component library uses React and the Google API to give easy access to the Google Maps library. This Google Map React component library was built alongside the blog post [blog.fullstack.io/articles/react-google-map-component/](http://blog.fullstack.io/articles/react-google-map-component/).



[fullstackreact.com](https://fullstackreact.com)
