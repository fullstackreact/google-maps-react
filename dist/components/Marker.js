(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/redbox-react/lib/index.js', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-catch-errors/lib/index.js', 'react', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-hmr/lib/index.js', '../lib/String'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/redbox-react/lib/index.js'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-catch-errors/lib/index.js'), require('react'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-hmr/lib/index.js'), require('../lib/String'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.index, global.index, global.react, global.index, global.String);
    global.Marker = mod.exports;
  }
})(this, function (module, exports, _index, _index3, _react2, _index5, _String) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Marker = undefined;

  var _index2 = _interopRequireDefault(_index);

  var _index4 = _interopRequireDefault(_index3);

  var _react3 = _interopRequireDefault(_react2);

  var _index6 = _interopRequireDefault(_index5);

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

  var _components = {
    Marker: {
      displayName: 'Marker'
    }
  };

  var _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
    filename: 'src/components/Marker.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
  });

  var _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
    filename: 'src/components/Marker.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _index2.default]
  });

  function _wrapComponent(id) {
    return function (Component) {
      return _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformHmrLibIndexJs2(_UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
  }

  var evtNames = ['click', 'mouseover'];

  var Marker = exports.Marker = _wrapComponent('Marker')(function (_React$Component) {
    _inherits(Marker, _React$Component);

    function Marker() {
      _classCallCheck(this, Marker);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Marker).apply(this, arguments));
    }

    _createClass(Marker, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;

console.log('yay from here ->', this.props.position !== prevProps.position, this.props.map !== prevProps.map);

        // if (this.props.map !== prevProps.map || this.props.position !== prevProps.position) {
          var _props = this.props;
          var map = _props.map;
          var google = _props.google;
          var position = _props.position;
          var mapCenter = _props.mapCenter;

          var pos = position || mapCenter;

          if (!position.instanceof(google.maps.LatLng))
            position = new google.maps.LatLng(pos.lat, pos.lng);

          console.log('yay from here ->', position);

          var pref = {
            map: map,
            position: position
          };
          this.marker = new google.maps.Marker(pref);

          evtNames.forEach(function (e) {
            _this2.marker.addListener(e, _this2.handleEvent(e));
          });
        // }
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(evt) {
        var _this3 = this;

        return function (e) {
          var evtName = 'on' + (0, _String.camelize)(evt);
          if (_this3.props[evtName]) {
            _this3.props[evtName](_this3.props, _this3.marker, e);
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Marker;
  }(_react3.default.Component));

  Marker.propTypes = {
    position: _react2.PropTypes.object,
    map: _react3.default.PropTypes.object
  };

  evtNames.forEach(function (e) {
    return Marker.propTypes[e] = _react2.PropTypes.func;
  });

  Marker.defaultProps = {
    name: 'Marker'
  };

  exports.default = Marker;
});
