# Google Map React component

![](http://d.pr/i/C7qr.png)

> A declarative Google Map React component using React, lazy-loading dependencies, and a test-driven approach by the [fullstack react](https://fullstackreact.com) team.

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

## Quickstart

```shell
git clone https://github.com/fullstackreact/google-maps-react.git
cd google-maps-react
npm install
make dev
```

The Google Map React component library uses React and the Google API to give easy access to the Google Maps library. This Google Map React component library was built alongside the blog post [blog.fullstack.io/articles/react-google-map-component/](http://blog.fullstack.io/articles/react-google-map-component/).



[fullstackreact.com](https://fullstackreact.com)
