(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.ScriptCache = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var counter = 0;
    var scriptMap = window._scriptMap || new Map();

    var ScriptCache = exports.ScriptCache = function (global) {
        global._scriptMap = global._scriptMap || scriptMap;
        return function ScriptCache(scripts) {
            var Cache = {};

            Cache._onLoad = function (key) {
                return function (cb) {
                    var stored = scriptMap.get(key);
                    if (stored) {
                        stored.promise.then(function () {
                            stored.error ? cb(stored.error) : cb(null, stored);
                            return stored;
                        });
                    } else {
                        // TODO:
                    }
                };
            };

            Cache._scriptTag = function (key, src) {
                if (!scriptMap.has(key)) {
                    (function () {
                        var tag = document.createElement('script');
                        var promise = new Promise(function (resolve, reject) {
                            var resolved = false,
                                errored = false,
                                body = document.getElementsByTagName('body')[0];

                            tag.type = 'text/javascript';
                            tag.async = false; // Load in order

                            var cbName = 'loaderCB' + counter++ + Date.now();
                            var cb = void 0;

                            var handleResult = function handleResult(state) {
                                return function (evt) {
                                    var stored = scriptMap.get(key);
                                    if (state === 'loaded') {
                                        stored.resolved = true;
                                        resolve(src);
                                        // stored.handlers.forEach(h => h.call(null, stored))
                                        // stored.handlers = []
                                    } else if (state === 'error') {
                                            stored.errored = true;
                                            // stored.handlers.forEach(h => h.call(null, stored))
                                            // stored.handlers = [];
                                            reject(evt);
                                        }
                                    stored.loaded = true;

                                    cleanup();
                                };
                            };

                            var cleanup = function cleanup() {
                                if (global[cbName] && typeof global[cbName] === 'function') {
                                    global[cbName] = null;
                                    delete global[cbName];
                                }
                            };

                            tag.onload = handleResult('loaded');
                            tag.onerror = handleResult('error');
                            tag.onreadystatechange = function () {
                                handleResult(tag.readyState);
                            };

                            // Pick off callback, if there is one
                            if (src.match(/callback=CALLBACK_NAME/)) {
                                src = src.replace(/(callback=)[^\&]+/, '$1' + cbName);
                                cb = window[cbName] = tag.onload;
                            } else {
                                tag.addEventListener('load', tag.onload);
                            }
                            tag.addEventListener('error', tag.onerror);

                            tag.src = src;
                            body.appendChild(tag);

                            return tag;
                        });
                        var initialState = {
                            loaded: false,
                            error: false,
                            promise: promise,
                            tag: tag
                        };
                        scriptMap.set(key, initialState);
                    })();
                }
                return scriptMap.get(key);
            };

            // let scriptTags = document.querySelectorAll('script')
            //
            // NodeList.prototype.filter = Array.prototype.filter;
            // NodeList.prototype.map = Array.prototype.map;
            // const initialScripts = scriptTags
            //   .filter(s => !!s.src)
            //   .map(s => s.src.split('?')[0])
            //   .reduce((memo, script) => {
            //     memo[script] = script;
            //     return memo;
            //   }, {});

            Object.keys(scripts).forEach(function (key) {
                var script = scripts[key];

                var tag = window._scriptMap.has(key) ? window._scriptMap.get(key).tag : Cache._scriptTag(key, script);

                Cache[key] = {
                    tag: tag,
                    onLoad: Cache._onLoad(key)
                };
            });

            return Cache;
        };
    }(window);

    exports.default = ScriptCache;
});