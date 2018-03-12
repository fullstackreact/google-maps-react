(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-dom', 'react-dom/server'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-dom'), require('react-dom/server'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactDom, global.server);
    global.InfoWindow = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactDom, _server) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InfoWindow = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _server2 = _interopRequireDefault(_server);

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

  var InfoWindow = exports.InfoWindow = function (_React$Component) {
    _inherits(InfoWindow, _React$Component);

    function InfoWindow() {
      _classCallCheck(this, InfoWindow);

      return _possibleConstructorReturn(this, (InfoWindow.__proto__ || Object.getPrototypeOf(InfoWindow)).apply(this, arguments));
    }

    _createClass(InfoWindow, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.renderInfoWindow();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _props = this.props,
            google = _props.google,
            map = _props.map;


        if (!google || !map) {
          return;
        }

        if (map !== prevProps.map) {
          this.renderInfoWindow();
        }

        if (this.props.position !== prevProps.position) {
          this.updatePosition();
        }

        if (this.props.children !== prevProps.children) {
          this.updateContent();
        }

        if (this.props.visible !== prevProps.visible || this.props.marker !== prevProps.marker || this.props.position !== prevProps.position) {
          this.props.visible ? this.openWindow() : this.closeWindow();
        }
      }
    }, {
      key: 'renderInfoWindow',
      value: function renderInfoWindow() {
        var _props2 = this.props,
            map = _props2.map,
            google = _props2.google,
            mapCenter = _props2.mapCenter;


        if (!google || !google.maps) {
          return;
        }

        var iw = this.infowindow = new google.maps.InfoWindow({
          content: ''
        });

        google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this));
        google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this));
      }
    }, {
      key: 'onOpen',
      value: function onOpen() {
        if (this.props.onOpen) {
          this.props.onOpen();
        }
      }
    }, {
      key: 'onClose',
      value: function onClose() {
        if (this.props.onClose) {
          this.props.onClose();
        }
      }
    }, {
      key: 'openWindow',
      value: function openWindow() {
        this.infowindow.open(this.props.map, this.props.marker);
      }
    }, {
      key: 'updatePosition',
      value: function updatePosition() {
        var pos = this.props.position;
        if (!(pos instanceof google.maps.LatLng)) {
          pos = pos && new google.maps.LatLng(pos.lat, pos.lng);
        }
        this.infowindow.setPosition(pos);
      }
    }, {
      key: 'updateContent',
      value: function updateContent() {
        var content = this.renderChildren();
        this.infowindow.setContent(content);
      }
    }, {
      key: 'closeWindow',
      value: function closeWindow() {
        this.infowindow.close();
      }
    }, {
      key: 'renderChildren',
      value: function renderChildren() {
        var children = this.props.children;

        return _server2.default.renderToString(children);
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return InfoWindow;
  }(_react2.default.Component);

  InfoWindow.propTypes = {
    children: _propTypes2.default.element.isRequired,
    map: _propTypes2.default.object,
    marker: _propTypes2.default.object,
    position: _propTypes2.default.object,
    visible: _propTypes2.default.bool,

    // callbacks
    onClose: _propTypes2.default.func,
    onOpen: _propTypes2.default.func
  };

  InfoWindow.defaultProps = {
    visible: false
  };

  exports.default = InfoWindow;
});