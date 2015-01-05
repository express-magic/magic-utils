'use strict';
//middleware function
var log = require('magic-log')
  , utils = {}
;

utils.each = utils.forEach = function (arrOrObj, func) {
  if ( typeof arrOrObj === 'array' ) {
    for ( let i = 0; i < arrOrObj.length; i++ ) {
      func(arrOrObj[i], i);
    }
  } else if ( typeof arrOrObj === 'object' ) {
    for ( let key in arrOrObj ) {
      if ( arrOrObj.hasOwnProperty(key) ) {
        func(arrOrObj[key], key);
      }
    }
  } else {
    log.error('magic-utils', 'each called without array or object:', arrOrObj);
  }
}

module.exports = utils;
