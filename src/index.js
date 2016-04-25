import React, {PropTypes as T} from 'react';
import ReactDOM from 'react-dom'

import {Marker} from './MarkerComponent'

const mapStyles = {
    map: {
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        display: 'flex'
    }
}

class Map extends React.Component {
    constructor(props) {
        super(props)

        if (props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    console.log('getCurrentPosition ->', pos)
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

        this.state = {
            map: null,
            currentLocation: {
                lat: this.props.initialCenter.lat,
                lng: this.props.initialCenter.lng
            }
        }
    }

    componentDidMount() {
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
            const google = this.props.google;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            const curr = this.state.currentLocation;
            let center = new maps.LatLng(curr.lat, curr.lng)

            let mapConfig = Object.assign({}, {center, zoom: this.props.zoom})

            this.map = new maps.Map(node, mapConfig);

            this.setState({map: this.map})

            let centerChangedTimeout;
            this.map.addListener('dragend', (evt) => {
                if (centerChangedTimeout) {
                    clearTimeout(centerChangedTimeout);
                    centerChangedTimeout = null;
                }
                centerChangedTimeout = setTimeout(() => {
                    this.props.onMove(this.map);
                }, 0);
            });
        }
    }

    recenterMap() {
        const map = this.state.map;
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

      return React.cloneElement(children, {
        map: this.state.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
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
    onMove: T.func
}

const identityFn = (t) => t;

Map.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 101,
        lng: -10
    },
    centerAroundCurrentLocation: true,
    onMove: identityFn
}

export default Map;
