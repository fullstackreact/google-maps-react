(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/redbox-react/lib/index.js', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-catch-errors/lib/index.js', 'react', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-hmr/lib/index.js', 'react-dom', './lib/ScriptCache', './lib/GoogleApi'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/redbox-react/lib/index.js'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-catch-errors/lib/index.js'), require('react'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-hmr/lib/index.js'), require('react-dom'), require('./lib/ScriptCache'), require('./lib/GoogleApi'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.index, global.index, global.react, global.index, global.reactDom, global.ScriptCache, global.GoogleApi);
        global.GoogleApiComponent = mod.exports;
    }
})(this, function (module, exports, _index, _index3, _react2, _index5, _reactDom, _ScriptCache, _GoogleApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.wrapper = undefined;

    var _index2 = _interopRequireDefault(_index);

    var _index4 = _interopRequireDefault(_index3);

    var _react3 = _interopRequireDefault(_react2);

    var _index6 = _interopRequireDefault(_index5);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _GoogleApi2 = _interopRequireDefault(_GoogleApi);

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
        Wrapper: {
            displayName: 'Wrapper',
            isInFunction: true
        }
    };

    var _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
        filename: 'src/GoogleApiComponent.js',
        components: _components,
        locals: [module],
        imports: [_react3.default]
    });

    var _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
        filename: 'src/GoogleApiComponent.js',
        components: _components,
        locals: [],
        imports: [_react3.default, _index2.default]
    });

    function _wrapComponent(id) {
        return function (Component) {
            return _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformHmrLibIndexJs2(_UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
        };
    }

    var defaultMapConfig = {};
    var defaultCreateCache = function defaultCreateCache(options) {
        options = options || {};
        var apiKey = options.apiKey;
        var libraries = options.libraries || ['places'];

        return (0, _ScriptCache.ScriptCache)({
            google: (0, _GoogleApi2.default)({ apiKey: apiKey, libraries: libraries })
        });
    };

    var wrapper = exports.wrapper = function wrapper(options) {
        return function (WrappedComponent) {
            var apiKey = options.apiKey;
            var libraries = options.libraries || ['places'];
            var createCache = options.createCache || defaultCreateCache;

            var Wrapper = _wrapComponent('Wrapper')(function (_React$Component) {
                _inherits(Wrapper, _React$Component);

                function Wrapper(props, context) {
                    _classCallCheck(this, Wrapper);

                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Wrapper).call(this, props, context));

                    _this.scriptCache = createCache(options);
                    _this.scriptCache.google.onLoad(_this.onLoad.bind(_this));

                    _this.state = {
                        loaded: false,
                        map: null,
                        google: null
                    };
                    return _this;
                }

                _createClass(Wrapper, [{
                    key: 'onLoad',
                    value: function onLoad(err, tag) {
                        this._gapi = window.google;

                        this.setState({ loaded: true, google: this._gapi });
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        var props = Object.assign({}, this.props, {
                            loaded: this.state.loaded,
                            google: window.google
                        });

                        return _react3.default.createElement(
                            'div',
                            null,
                            _react3.default.createElement(WrappedComponent, props),
                            _react3.default.createElement('div', { ref: 'map' })
                        );
                    }
                }]);

                return Wrapper;
            }(_react3.default.Component));

            return Wrapper;
        };
    };

    exports.default = wrapper;
});