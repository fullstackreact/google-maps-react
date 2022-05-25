(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.windowOrGlobal = mod.exports;
  }
})(this, function (module) {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  module.exports = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global.global === global && global || undefined;
});