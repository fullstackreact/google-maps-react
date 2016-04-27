(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/redbox-react/lib/index.js', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-catch-errors/lib/index.js', 'react', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-hmr/lib/index.js', 'react-dom', 'react-dom/server'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/redbox-react/lib/index.js'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-catch-errors/lib/index.js'), require('react'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-hmr/lib/index.js'), require('react-dom'), require('react-dom/server'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.index, global.index, global.react, global.index, global.reactDom, global.server);
    global.InfoWindow = mod.exports;
  }
})(this, function (module, exports, _index, _index3, _react2, _index5, _reactDom, _server) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InfoWindow = undefined;

  var _index2 = _interopRequireDefault(_index);

  var _index4 = _interopRequireDefault(_index3);

  var _react3 = _interopRequireDefault(_react2);

  var _index6 = _interopRequireDefault(_index5);

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

  var _components = {
    InfoWindow: {
      displayName: 'InfoWindow'
    }
  };

  var _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
    filename: 'src/components/InfoWindow.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
  });

  var _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
    filename: 'src/components/InfoWindow.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _index2.default]
  });

  function _wrapComponent(id) {
    return function (Component) {
      return _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformHmrLibIndexJs2(_UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
  }

  var InfoWindow = exports.InfoWindow = _wrapComponent('InfoWindow')(function (_React$Component) {
    _inherits(InfoWindow, _React$Component);

    function InfoWindow() {
      _classCallCheck(this, InfoWindow);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(InfoWindow).apply(this, arguments));
    }

    _createClass(InfoWindow, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.map !== prevProps.map) {
          var _props = this.props;
          var map = _props.map;
          var google = _props.google;
          var mapCenter = _props.mapCenter;


          var iw = this.infowindow = new google.maps.InfoWindow({
            content: ''
          });

          google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this));
          google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this));
        }

        if (this.props.children !== prevProps.children) {
          this.updateContent();
        }

        if (this.props.visible !== prevProps.visible || this.props.marker !== prevProps.marker) {
          this.props.visible ? this.openWindow() : this.closeWindow();
        }
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
  }(_react3.default.Component));

  InfoWindow.propTypes = {
    children: _react3.default.PropTypes.element.isRequired,
    map: _react3.default.PropTypes.object,
    marker: _react3.default.PropTypes.object,
    visible: _react3.default.PropTypes.bool,

    // callbacks
    onClose: _react3.default.PropTypes.func,
    onOpen: _react3.default.PropTypes.func
  };

  InfoWindow.defaultProps = {
    visible: false
  };

  exports.default = InfoWindow;
});