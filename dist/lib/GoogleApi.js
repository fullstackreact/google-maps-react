(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'invariant'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('invariant'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.invariant);
        global.GoogleApi = mod.exports;
    }
})(this, function (exports, _invariant) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GoogleApi = undefined;

    var _invariant2 = _interopRequireDefault(_invariant);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var GoogleApi = exports.GoogleApi = function GoogleApi(opts) {
        opts = opts || {};

        (0, _invariant2.default)(opts.hasOwnProperty('apiKey'), 'You must pass an apiKey to use GoogleApi');

        var apiKey = opts.apiKey;
        var libraries = opts.libraries || ['places'];
        var client = opts.client;
        var URL = 'https://maps.googleapis.com/maps/api/js';

        var googleVersion = opts.version || '3';

        var script = null;
        var google = window.google || null;
        var loading = false;
        var channel = null;
        var language = opts.language;
        var region = null;

        var onLoadEvents = [];

        var url = function url() {
            var url = URL;
            var params = {
                key: apiKey,
                callback: 'CALLBACK_NAME',
                libraries: libraries.join(','),
                client: client,
                v: googleVersion,
                channel: channel,
                language: language,
                region: region
            };

            var paramStr = Object.keys(params).filter(function (k) {
                return !!params[k];
            }).map(function (k) {
                return k + '=' + params[k];
            }).join('&');

            return url + '?' + paramStr;
        };

        return url();
    };

    exports.default = GoogleApi;
});