(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '../lib/areBoundsEqual', '../lib/String'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('../lib/areBoundsEqual'), require('../lib/String'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.areBoundsEqual, global.String);
    global.Rectangle = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _areBoundsEqual, _String) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Rectangle = undefined;

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

  var Rectangle = exports.Rectangle = function (_React$Component) {
    _inherits(Rectangle, _React$Component);

    function Rectangle() {
      _classCallCheck(this, Rectangle);

      return _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).apply(this, arguments));
    }

    _createClass(Rectangle, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.rectanglePromise = wrappedPromise();
        this.renderRectangle();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.map !== prevProps.map || !(0, _areBoundsEqual.areBoundsEqual)(this.props.bounds, prevProps.bounds)) {
          if (this.rectangle) {
            this.rectangle.setMap(null);
          }
          this.renderRectangle();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.rectangle) {
          this.rectangle.setMap(null);
        }
      }
    }, {
      key: 'renderRectangle',
      value: function renderRectangle() {
        var _this2 = this;

        var _props = this.props,
            map = _props.map,
            google = _props.google,
            bounds = _props.bounds,
            strokeColor = _props.strokeColor,
            strokeOpacity = _props.strokeOpacity,
            strokeWeight = _props.strokeWeight,
            fillColor = _props.fillColor,
            fillOpacity = _props.fillOpacity,
            props = _objectWithoutProperties(_props, ['map', 'google', 'bounds', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'fillColor', 'fillOpacity']);

        if (!google) {
          return null;
        }

        var params = _extends({
          map: map,
          bounds: bounds,
          strokeColor: strokeColor,
          strokeOpacity: strokeOpacity,
          strokeWeight: strokeWeight,
          fillColor: fillColor,
          fillOpacity: fillOpacity
        }, props);

        this.rectangle = new google.maps.Rectangle(params);

        evtNames.forEach(function (e) {
          _this2.rectangle.addListener(e, _this2.handleEvent(e));
        });

        this.rectanglePromise.resolve(this.rectangle);
      }
    }, {
      key: 'getRectangle',
      value: function getRectangle() {
        return this.rectanglePromise;
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(evt) {
        var _this3 = this;

        return function (e) {
          var evtName = 'on' + (0, _String.camelize)(evt);
          if (_this3.props[evtName]) {
            _this3.props[evtName](_this3.props, _this3.rectangle, e);
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        console.log('hii, ', this.props.bounds);
        return null;
      }
    }]);

    return Rectangle;
  }(_react2.default.Component);

  Rectangle.propTypes = {
    bounds: _propTypes2.default.object,
    strokeColor: _propTypes2.default.string,
    strokeOpacity: _propTypes2.default.number,
    strokeWeight: _propTypes2.default.number,
    fillColor: _propTypes2.default.string,
    fillOpacity: _propTypes2.default.number
  };

  evtNames.forEach(function (e) {
    return Rectangle.propTypes[e] = _propTypes2.default.func;
  });

  Rectangle.defaultProps = {
    name: 'Rectangle'
  };

  exports.default = Rectangle;
});