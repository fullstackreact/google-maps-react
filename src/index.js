import React, {PropTypes as T} from 'react';
import ReactDOM from 'react-dom'

const mapStyles = {
    map: {
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        display: 'flex'
    }
}

const camelize = function(str) {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

const evtNames = ['click', 'dragend'];

class Map extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLocation: {
                lat: this.props.initialCenter.lat,
                lng: this.props.initialCenter.lng
            }
        }
    }

    componentDidMount() {
      if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                  const coords = pos.coords;
                  this.setState({
                      currentLocation: {
                          lat: coords.latitude,
                          lng: coords.longitude
                      }
                  })
              })
          }
      }
      this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            const curr = this.state.currentLocation;
            let center = new maps.LatLng(curr.lat, curr.lng)

            let mapConfig = Object.assign({}, {center, zoom: this.props.zoom})

            this.map = new maps.Map(node, mapConfig);

            evtNames.forEach(e => {
              this.map.addListener(e, this.handleEvent(e));
            });
        }
    }

    handleEvent(evtName) {
      let timeout;
      const handlerName = `on${camelize(evtName)}`

      return (e) => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        timeout = setTimeout(() => {
          if (this.props[handlerName]) {
            this.props[handlerName](this.props, this.map, e);
          }
        }, 0);
      }
    }

    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center)
        }
    }

    renderChildren() {
      const {children} = this.props;

      if (!children) return;

      return React.Children.map(children, c => {
        return React.cloneElement(c, {
          map: this.map,
          google: this.props.google,
          mapCenter: this.state.currentLocation
        });
      })
    }

    render() {
        return (
            <div style={mapStyles.map} className={this.props.className} ref='map'>
                Loading map...
                {this.renderChildren()}
            </div>
        )
    }
};

Map.propTypes = {
    google: T.object,
    zoom: T.number,
    centerAroundCurrentLocation: T.bool,
    initialCenter: T.object,
    className: T.string,
}

evtNames.forEach(e => Map.propTypes[camelize(e)] = T.func)

Map.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  centerAroundCurrentLocation: true,
}

export default Map;
