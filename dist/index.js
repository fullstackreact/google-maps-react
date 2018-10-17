(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './GoogleApiComponent', './components/Marker', './components/InfoWindow', './components/HeatMap', './components/Polygon', './components/Polyline', './components/Circle', 'react', 'prop-types', 'react-dom', './lib/String', './lib/cancelablePromise'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./GoogleApiComponent'), require('./components/Marker'), require('./components/InfoWindow'), require('./components/HeatMap'), require('./components/Polygon'), require('./components/Polyline'), require('./components/Circle'), require('react'), require('prop-types'), require('react-dom'), require('./lib/String'), require('./lib/cancelablePromise'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.GoogleApiComponent, global.Marker, global.InfoWindow, global.HeatMap, global.Polygon, global.Polyline, global.Circle, global.react, global.propTypes, global.reactDom, global.String, global.cancelablePromise);
    global.index = mod.exports;
  }
})(this, function (exports, _GoogleApiComponent, _Marker, _InfoWindow, _HeatMap, _Polygon, _Polyline, _Circle, _react, _propTypes, _reactDom, _String, _cancelablePromise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Map = exports.Circle = exports.Polyline = exports.Polygon = exports.HeatMap = exports.InfoWindow = exports.Marker = exports.GoogleApiWrapper = undefined;
  Object.defineProperty(exports, 'GoogleApiWrapper', {
    enumerable: true,
    get: function () {
      return _GoogleApiComponent.wrapper;
    }
  });
  Object.defineProperty(exports, 'Marker', {
    enumerable: true,
    get: function () {
      return _Marker.Marker;
    }
  });
  Object.defineProperty(exports, 'InfoWindow', {
    enumerable: true,
    get: function () {
      return _InfoWindow.InfoWindow;
    }
  });
  Object.defineProperty(exports, 'HeatMap', {
    enumerable: true,
    get: function () {
      return _HeatMap.HeatMap;
    }
  });
  Object.defineProperty(exports, 'Polygon', {
    enumerable: true,
    get: function () {
      return _Polygon.Polygon;
    }
  });
  Object.defineProperty(exports, 'Polyline', {
    enumerable: true,
    get: function () {
      return _Polyline.Polyline;
    }
  });
  Object.defineProperty(exports, 'Circle', {
    enumerable: true,
    get: function () {
      return _Circle.Circle;
    }
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var mapStyles = {
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    map: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  };

  var evtNames = ['ready', 'click', 'dragend', 'recenter', 'bounds_changed', 'center_changed', 'dblclick', 'dragstart', 'heading_change', 'idle', 'maptypeid_changed', 'mousemove', 'mouseout', 'mouseover', 'projection_changed', 'resize', 'rightclick', 'tilesloaded', 'tilt_changed', 'zoom_changed'];

  var Map = exports.Map = function (_React$Component) {
    _inherits(Map, _React$Component);

    function Map(props) {
      _classCallCheck(this, Map);

      var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));

      if (!props.hasOwnProperty('google')) {
        throw new Error('You must include a `google` prop');
      }

      _this.listeners = {};
      _this.state = {
        currentLocation: {
          lat: _this.props.initialCenter.lat,
          lng: _this.props.initialCenter.lng
        }
      };
      return _this;
    }

    _createClass(Map, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            this.geoPromise = (0, _cancelablePromise.makeCancelable)(new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }));

            this.geoPromise.promise.then(function (pos) {
              var coords = pos.coords;
              _this2.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
            }).catch(function (e) {
              return e;
            });
          }
        }
        this.loadMap();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
        if (this.props.visible !== prevProps.visible) {
          this.restyleMap();
        }
        if (this.props.zoom !== prevProps.zoom) {
          this.map.setZoom(this.props.zoom);
        }
        if (this.props.center !== prevProps.center) {
          this.setState({
            currentLocation: this.props.center
          });
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap();
        }
        if (this.props.bounds && this.props.bounds !== prevProps.bounds) {
          this.map.fitBounds(this.props.bounds);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this3 = this;

        var google = this.props.google;

        if (this.geoPromise) {
          this.geoPromise.cancel();
        }
        Object.keys(this.listeners).forEach(function (e) {
          google.maps.event.removeListener(_this3.listeners[e]);
        });
      }
    }, {
      key: 'loadMap',
      value: function loadMap() {
        var _this4 = this;

        if (this.props && this.props.google) {
          var google = this.props.google;

          var maps = google.maps;

          var mapRef = this.refs.map;
          var node = _reactDom2.default.findDOMNode(mapRef);
          var curr = this.state.currentLocation;
          var center = new maps.LatLng(curr.lat, curr.lng);

          var mapTypeIds = this.props.google.maps.MapTypeId || {};
          var mapTypeFromProps = String(this.props.mapType).toUpperCase();

          var mapConfig = Object.assign({}, {
            mapTypeId: mapTypeIds[mapTypeFromProps],
            center: center,
            zoom: this.props.zoom,
            maxZoom: this.props.maxZoom,
            minZoom: this.props.minZoom,
            clickableIcons: !!this.props.clickableIcons,
            disableDefaultUI: this.props.disableDefaultUI,
            zoomControl: this.props.zoomControl,
            mapTypeControl: this.props.mapTypeControl,
            scaleControl: this.props.scaleControl,
            streetViewControl: this.props.streetViewControl,
            panControl: this.props.panControl,
            rotateControl: this.props.rotateControl,
            fullscreenControl: this.props.fullscreenControl,
            scrollwheel: this.props.scrollwheel,
            draggable: this.props.draggable,
            draggableCursor: this.props.draggableCursor,
            keyboardShortcuts: this.props.keyboardShortcuts,
            disableDoubleClickZoom: this.props.disableDoubleClickZoom,
            noClear: this.props.noClear,
            styles: this.props.styles,
            gestureHandling: this.props.gestureHandling
          });

          Object.keys(mapConfig).forEach(function (key) {
            // Allow to configure mapConfig with 'false'
            if (mapConfig[key] === null) {
              delete mapConfig[key];
            }
          });

          this.map = new maps.Map(node, mapConfig);

          evtNames.forEach(function (e) {
            _this4.listeners[e] = _this4.map.addListener(e, _this4.handleEvent(e));
          });
          maps.event.trigger(this.map, 'ready');
          this.forceUpdate();
        }
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(evtName) {
        var _this5 = this;

        var timeout = void 0;
        var handlerName = 'on' + (0, _String.camelize)(evtName);

        return function (e) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          timeout = setTimeout(function () {
            if (_this5.props[handlerName]) {
              _this5.props[handlerName](_this5.props, _this5.map, e);
            }
          }, 0);
        };
      }
    }, {
      key: 'recenterMap',
      value: function recenterMap() {
        var map = this.map;

        var google = this.props.google;


        if (!google) return;
        var maps = google.maps;

        if (map) {
          var center = this.state.currentLocation;
          if (!(center instanceof google.maps.LatLng)) {
            center = new google.maps.LatLng(center.lat, center.lng);
          }
          // map.panTo(center)
          map.setCenter(center);
          maps.event.trigger(map, 'recenter');
        }
      }
    }, {
      key: 'restyleMap',
      value: function restyleMap() {
        if (this.map) {
          var google = this.props.google;

          google.maps.event.trigger(this.map, 'resize');
        }
      }
    }, {
      key: 'renderChildren',
      value: function renderChildren() {
        var _this6 = this;

        var children = this.props.children;


        if (!children) return;

        return _react2.default.Children.map(children, function (c) {
          if (!c) return;
          return _react2.default.cloneElement(c, {
            map: _this6.map,
            google: _this6.props.google,
            mapCenter: _this6.state.currentLocation
          });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var style = Object.assign({}, mapStyles.map, this.props.style, {
          display: this.props.visible ? 'inherit' : 'none'
        });

        var containerStyles = Object.assign({}, mapStyles.container, this.props.containerStyle);

        return _react2.default.createElement(
          'div',
          { style: containerStyles, className: this.props.className },
          _react2.default.createElement(
            'div',
            { style: style, ref: 'map' },
            'Loading map...'
          ),
          this.renderChildren()
        );
      }
    }]);

    return Map;
  }(_react2.default.Component);

  Map.propTypes = {
    google: _propTypes2.default.object,
    zoom: _propTypes2.default.number,
    centerAroundCurrentLocation: _propTypes2.default.bool,
    center: _propTypes2.default.object,
    initialCenter: _propTypes2.default.object,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    containerStyle: _propTypes2.default.object,
    visible: _propTypes2.default.bool,
    mapType: _propTypes2.default.string,
    maxZoom: _propTypes2.default.number,
    minZoom: _propTypes2.default.number,
    clickableIcons: _propTypes2.default.bool,
    disableDefaultUI: _propTypes2.default.bool,
    zoomControl: _propTypes2.default.bool,
    mapTypeControl: _propTypes2.default.bool,
    scaleControl: _propTypes2.default.bool,
    streetViewControl: _propTypes2.default.bool,
    panControl: _propTypes2.default.bool,
    rotateControl: _propTypes2.default.bool,
    fullscreenControl: _propTypes2.default.bool,
    scrollwheel: _propTypes2.default.bool,
    draggable: _propTypes2.default.bool,
    draggableCursor: _propTypes2.default.string,
    keyboardShortcuts: _propTypes2.default.bool,
    disableDoubleClickZoom: _propTypes2.default.bool,
    noClear: _propTypes2.default.bool,
    styles: _propTypes2.default.array,
    gestureHandling: _propTypes2.default.string,
    bounds: _propTypes2.default.object
  };

  evtNames.forEach(function (e) {
    return Map.propTypes[(0, _String.camelize)(e)] = _propTypes2.default.func;
  });

  Map.defaultProps = {
    zoom: 14,
    initialCenter: {
      lat: 37.774929,
      lng: -122.419416
    },
    center: {},
    centerAroundCurrentLocation: false,
    style: {},
    containerStyle: {},
    visible: true
  };

  exports.default = Map;
});