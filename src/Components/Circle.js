(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', '../lib/String'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('../lib/String'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.String);
        global.Circle = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _String) {
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
                this.CirclePromise = wrappedPromise();
                this.renderCircle();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                if (this.props.map !== prevProps.map || this.props.center !== prevProps.center) {
                    if (this.Circle) {
                        this.Circle.setMap(null);
                    }
                    this.renderCircle();
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.Circle) {
                    this.Circle.setMap(null);
                }
            }
        }, {
            key: 'renderCircle',
            value: function renderCircle() {
                var _this2 = this;

                var _props = this.props,
                    map = _props.map,
                    google = _props.google,
                    strokeColor = _props.strokeColor,
                    strokeOpacity = _props.strokeOpacity,
                    strokeWeight = _props.strokeWeight,
                    fillColor = _props.fillColor,
                    fillOpacity = _props.fillOpacity,
                    radius = _props.radius,
                    center = _props.center,
                    props = _objectWithoutProperties(_props, ['map', 'google', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'fillColor', 'fillOpacity', 'center', 'radius']);

                if (!google) {
                    return null;
                }

                var pos = center;
                if (!(pos instanceof google.maps.LatLng)) {
                    pos = new google.maps.LatLng(pos.lat, pos.lng);
                }

                var params = _extends({
                    map: map,
                    strokeColor: strokeColor,
                    strokeOpacity: strokeOpacity,
                    strokeWeight: strokeWeight,
                    fillColor: fillColor,
                    fillOpacity: fillOpacity,
                    radius: radius,
                    center: pos
                }, props);

                this.Circle = new google.maps.Circle(params);

                evtNames.forEach(function (e) {
                    _this2.Circle.addListener(e, _this2.handleEvent(e));
                });

                this.CirclePromise.resolve(this.Circle);
            }
        }, {
            key: 'getCircle',
            value: function getCircle() {
                return this.CirclePromise;
            }
        }, {
            key: 'handleEvent',
            value: function handleEvent(evt) {
                var _this3 = this;

                return function (e) {
                    var evtName = 'on' + (0, _String.camelize)(evt);
                    if (_this3.props[evtName]) {
                        _this3.props[evtName](_this3.props, _this3.Circle, e);
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
        strokeColor: _propTypes2.default.string,
        strokeOpacity: _propTypes2.default.number,
        strokeWeight: _propTypes2.default.number,
        fillColor: _propTypes2.default.string,
        fillOpacity: _propTypes2.default.number,
        radius: _propTypes2.default.number,
        center: _propTypes2.default.object
    };

    evtNames.forEach(function (e) {
        return Circle.propTypes[e] = _propTypes2.default.func;
    });

    Circle.defaultProps = {
        name: 'Circle'
    };

    exports.default = Circle;
});