(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.cancelablePromise = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  // https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html

  var makeCancelable = exports.makeCancelable = function makeCancelable(promise) {
    var hasCanceled_ = false;

    var wrappedPromise = new Promise(function (resolve, reject) {
      promise.then(function (val) {
        return hasCanceled_ ? reject({ isCanceled: true }) : resolve(val);
      });
      promise.catch(function (error) {
        return hasCanceled_ ? reject({ isCanceled: true }) : reject(error);
      });
    });

    return {
      promise: wrappedPromise,
      cancel: function cancel() {
        hasCanceled_ = true;
      }
    };
  };
});