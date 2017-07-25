(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './GoogleApiComponent', './components/Marker', './components/InfoWindow', './components/HeatMap', './components/Polygon', 'react', 'react-dom', './lib/String', './lib/cancelablePromise', 'invariant'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./GoogleApiComponent'), require('./components/Marker'), require('./components/InfoWindow'), require('./components/HeatMap'), require('./components/Polygon'), require('react'), require('react-dom'), require('./lib/String'), require('./lib/cancelablePromise'), require('invariant'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.GoogleApiComponent, global.Marker, global.InfoWindow, global.HeatMap, global.Polygon, global.react, global.reactDom, global.String, global.cancelablePromise, global.invariant);
    global.index = mod.exports;
  }
})(this, function (exports, _GoogleApiComponent, _Marker, _InfoWindow, _HeatMap, _Polygon, _react, _reactDom, _String, _cancelablePromise, _invariant) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Map = exports.Polygon = exports.HeatMap = exports.InfoWindow = exports.Marker = exports.GoogleApiWrapper = undefined;
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

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _invariant2 = _interopRequireDefault(_invariant);

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

      (0, _invariant2.default)(props.hasOwnProperty('google'), 'You must include a `google` prop.');

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
          (function () {
            var google = _this4.props.google;

            var maps = google.maps;

            var mapRef = _this4.refs.map;
            var node = _reactDom2.default.findDOMNode(mapRef);
            var curr = _this4.state.currentLocation;
            var center = new maps.LatLng(curr.lat, curr.lng);

            var mapTypeIds = _this4.props.google.maps.MapTypeId || {};
            var mapTypeFromProps = String(_this4.props.mapType).toUpperCase();

            var mapConfig = Object.assign({}, {
              mapTypeId: mapTypeIds[mapTypeFromProps],
              center: center,
              zoom: _this4.props.zoom,
              maxZoom: _this4.props.maxZoom,
              minZoom: _this4.props.maxZoom,
              clickableIcons: _this4.props.clickableIcons,
              disableDefaultUI: _this4.props.disableDefaultUI,
              zoomControl: _this4.props.zoomControl,
              mapTypeControl: _this4.props.mapTypeControl,
              scaleControl: _this4.props.scaleControl,
              streetViewControl: _this4.props.streetViewControl,
              panControl: _this4.props.panControl,
              rotateControl: _this4.props.rotateControl,
              scrollwheel: _this4.props.scrollwheel,
              draggable: _this4.props.draggable,
              keyboardShortcuts: _this4.props.keyboardShortcuts,
              disableDoubleClickZoom: _this4.props.disableDoubleClickZoom,
              noClear: _this4.props.noClear,
              styles: _this4.props.styles,
              gestureHandling: _this4.props.gestureHandling
            });

            Object.keys(mapConfig).forEach(function (key) {
              // Allow to configure mapConfig with 'false'
              if (mapConfig[key] === null) {
                delete mapConfig[key];
              }
            });

            _this4.map = new maps.Map(node, mapConfig);

            evtNames.forEach(function (e) {
              _this4.listeners[e] = _this4.map.addListener(e, _this4.handleEvent(e));
            });
            maps.event.trigger(_this4.map, 'ready');
            _this4.forceUpdate();
          })();
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

        var maps = google.maps;

        if (!google) return;

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

  ;

  Map.propTypes = {
    google: _react.PropTypes.object,
    zoom: _react.PropTypes.number,
    centerAroundCurrentLocation: _react.PropTypes.bool,
    center: _react.PropTypes.object,
    initialCenter: _react.PropTypes.object,
    className: _react.PropTypes.string,
    style: _react.PropTypes.object,
    containerStyle: _react.PropTypes.object,
    visible: _react.PropTypes.bool,
    mapType: _react.PropTypes.string,
    maxZoom: _react.PropTypes.number,
    minZoom: _react.PropTypes.number,
    clickableIcons: _react.PropTypes.bool,
    disableDefaultUI: _react.PropTypes.bool,
    zoomControl: _react.PropTypes.bool,
    mapTypeControl: _react.PropTypes.bool,
    scaleControl: _react.PropTypes.bool,
    streetViewControl: _react.PropTypes.bool,
    panControl: _react.PropTypes.bool,
    rotateControl: _react.PropTypes.bool,
    scrollwheel: _react.PropTypes.bool,
    draggable: _react.PropTypes.bool,
    keyboardShortcuts: _react.PropTypes.bool,
    disableDoubleClickZoom: _react.PropTypes.bool,
    noClear: _react.PropTypes.bool,
    styles: _react.PropTypes.array,
    gestureHandling: _react.PropTypes.string
  };

  evtNames.forEach(function (e) {
    return Map.propTypes[(0, _String.camelize)(e)] = _react.PropTypes.func;
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