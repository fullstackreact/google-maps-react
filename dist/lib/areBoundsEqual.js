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
    global.areBoundsEqual = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * Compares two bound objects.
   */

  var areBoundsEqual = exports.areBoundsEqual = function areBoundsEqual(boundA, boundB) {
    if (boundA === boundB) {
      return true;
    }
    if (!(boundA instanceof Object) || !(boundB instanceof Object)) {
      return false;
    }
    if (Object.keys(boundA).length !== Object.keys(boundB).length) {
      return false;
    }
    if (!areValidBounds(boundA) || !areValidBounds(boundB)) {
      return false;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(boundA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        if (boundA[key] !== boundB[key]) {
          return false;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return true;
  };

  /**
   * Helper that checks whether an array consists of objects
   * with lat and lng properties
   * @param {object} elem the element to check
   * @returns {boolean} whether or not it's valid
   */
  var areValidBounds = function areValidBounds(elem) {
    return elem !== null && (typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) === 'object' && elem.hasOwnProperty('north') && elem.hasOwnProperty('south') && elem.hasOwnProperty('east') && elem.hasOwnProperty('west');
  };
});