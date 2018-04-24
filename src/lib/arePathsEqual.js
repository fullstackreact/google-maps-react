/**
 * Compares two path arrays of LatLng objects.
 */

export const arePathsEqual = function(pathA, pathB) {
  if (pathA === pathB) {
    return true;
  }
  if (!Array.isArray(pathA) || !Array.isArray(pathB)) {
    return false;
  }
  if (pathA.length !== pathB.length) {
    return false;
  }
  for (let i = 0; i < pathA.length; ++i) {
    if (pathA[i] === pathB[i]) {
      continue;
    }
    if (
      !isValidLatLng(pathA[i]) ||
      !isValidLatLng(pathB[i])
    ) {
      return false;
    }
    if (
      pathB[i].lat !== pathA[i].lat ||
      pathB[i].lng !== pathA[i].lng
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Helper that checks whether an array consists of objects
 * with lat and lng properties
 * @param {object} elem the element to check
 * @returns {boolean} whether or not it's valid
 */
const isValidLatLng = function(elem) {
  return (
    elem !== null &&
    typeof elem === 'object' &&
    elem.hasOwnProperty('lat') &&
    elem.hasOwnProperty('lng')
  );
}
