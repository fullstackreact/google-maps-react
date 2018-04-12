(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.ChoroplethMap = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChoroplethMap = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  function stylesFeatures() {
    return {
      strokeWeight: 0.5,
      strokeColor: '#f1f1f1',
      zIndex: 1,
      fillColor: '#5d5d5d',
      fillOpacity: 0.75,
      visible: true
    };
  }

  var ChoroplethMap = exports.ChoroplethMap = function (_Component) {
    _inherits(ChoroplethMap, _Component);

    function ChoroplethMap() {
      _classCallCheck(this, ChoroplethMap);

      return _possibleConstructorReturn(this, (ChoroplethMap.__proto__ || Object.getPrototypeOf(ChoroplethMap)).apply(this, arguments));
    }

    _createClass(ChoroplethMap, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.geoJsonData) {
          this.renderFeatures();
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var geoJsonData = this.props.geoJsonData;

        if (geoJsonData && geoJsonData !== prevProps.geoJsonData) {
          this.renderFeatures();
        }
        this.updateStyles();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var map = this.props.map;

        if (map) {
          this.features.forEach(function (el) {
            return map.data.remove(el);
          });
        }
        this.features = null;
      }
    }, {
      key: 'updateStyles',
      value: function updateStyles() {
        var _props = this.props,
            map = _props.map,
            stylesFeature = _props.stylesFeature;

        if (!map) {
          return null;
        }
        map.data.setStyle(stylesFeature);
      }
    }, {
      key: 'renderFeatures',
      value: function renderFeatures() {
        var map = this.props.map;

        if (!map) {
          return null;
        }
        this.features = map.data.addGeoJson(this.props.geoJsonData);
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return ChoroplethMap;
  }(_react.Component);

  ChoroplethMap.propTypes = {
    map: _propTypes2.default.object,
    geoJsonData: _propTypes2.default.object,
    stylesFeature: _propTypes2.default.func
  };

  ChoroplethMap.defaultProps = {
    stylesFeature: stylesFeatures
  };

  exports.default = ChoroplethMap;
});