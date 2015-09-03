'use strict';

function whichItem(items, loc) {
  /* eslint prefer-const:0, lines-around-comment:0 */
  for ( let [key, circle] of items ) {
    if ( Math.pow(loc.x - circle.x, 2) + Math.pow(loc.y - circle.y, 2) < Math.pow(circle.r, 2)) {
      return key;
    }
  }

  return -1;
}

function getLastItemOfArr(arr) {
  return arr[arr.length - 1];
}

export default {
  whichItem,
  getLastItemOfArr
};
