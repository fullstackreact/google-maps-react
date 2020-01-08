/**
 * Compares two bound objects.
 */

export const areBoundsEqual = function(boundA, boundB) {
  if (boundA === boundB) {
    return true;
  }
  if (
    !(boundA instanceof Object) ||
    !(boundB instanceof Object)
  ) {
    return false;
  }
  if (Object.keys(boundA).length !== Object.keys(boundB).length) {
    return false;
  }
  if (
    !areValidBounds(boundA) ||
    !areValidBounds(boundB)
  ) {
    return false;
  }
  for (const key of Object.keys(boundA)) {
    if (boundA[key] !== boundB[key]) {
      return false;
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
const areValidBounds = function(elem) {
  return (
    elem !== null &&
    typeof elem === 'object' &&
    elem.hasOwnProperty('north') &&
    elem.hasOwnProperty('south') &&
    elem.hasOwnProperty('east') &&
    elem.hasOwnProperty('west')
  );
};
