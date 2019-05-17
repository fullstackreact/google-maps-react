export const camelize = function(str) {
  return str.replace('_',' ').split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}
