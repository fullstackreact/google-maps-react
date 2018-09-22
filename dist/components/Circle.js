(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '../lib/arePathsEqual', '../lib/String'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('../lib/arePathsEqual'), require('../lib/String'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.arePathsEqual, global.String);
    global.Circle = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _arePathsEqual, _String) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Circle = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
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

  var evtNames = ['click', 'mouseout', 'mouseover'];

  var wrappedPromise = function wrappedPromise() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
  };

  var Circle = exports.Circle = function (_React$Component) {
    _inherits(Circle, _React$Component);

    function Circle() {
      _classCallCheck(this, Circle);

      return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
    }

    _createClass(Circle, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.circlePromise = wrappedPromise();
        this.renderCircle();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.map !== prevProps.map || !(0, _arePathsEqual.arePathsEqual)(this.props.path, prevProps.path)) {
          if (this.circle) {
            this.circle.setMap(null);
          }
          this.renderCircle();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.circle) {
          this.circle.setMap(null);
        }
      }
    }, {
      key: 'renderCircle',
      value: function renderCircle() {
        var _this2 = this;

        var _props = this.props,
            map = _props.map,
            google = _props.google,
            center = _props.center,
            radius = _props.radius,
            strokeColor = _props.strokeColor,
            strokeOpacity = _props.strokeOpacity,
            strokeWeight = _props.strokeWeight,
            fillColor = _props.fillColor,
            fillOpacity = _props.fillOpacity,
            draggable = _props.draggable,
            visible = _props.visible,
            props = _objectWithoutProperties(_props, ['map', 'google', 'center', 'radius', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'fillColor', 'fillOpacity', 'draggable', 'visible']);

        if (!google) {
          return null;
        }

        var params = _extends({
          map: map,
          center: center,
          radius: radius,
          strokeColor: strokeColor,
          strokeOpacity: strokeOpacity,
          strokeWeight: strokeWeight,
          fillColor: fillColor,
          fillOpacity: fillOpacity,
          draggable: draggable,
          visible: visible
        }, props);

        this.circle = new google.maps.Circle(params);

        evtNames.forEach(function (e) {
          _this2.circle.addListener(e, _this2.handleEvent(e));
        });

        this.circlePromise.resolve(this.circle);
      }
    }, {
      key: 'getCircle',
      value: function getCircle() {
        return this.circlePromise;
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(evt) {
        var _this3 = this;

        return function (e) {
          var evtName = 'on' + (0, _String.camelize)(evt);
          if (_this3.props[evtName]) {
            _this3.props[evtName](_this3.props, _this3.circle, e);
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Circle;
  }(_react2.default.Component);

  Circle.propTypes = {
    center: _propTypes2.default.object,
    radius: _propTypes2.default.number,
    strokeColor: _propTypes2.default.string,
    strokeOpacity: _propTypes2.default.number,
    strokeWeight: _propTypes2.default.number,
    fillColor: _propTypes2.default.string,
    fillOpacity: _propTypes2.default.number
  };

  evtNames.forEach(function (e) {
    return Circle.propTypes[e] = _propTypes2.default.func;
  });

  Circle.defaultProps = {
    name: 'Circle'
  };

  exports.default = Circle;
});