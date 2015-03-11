'use strict';
import {stat, readdir} from 'fs';
import {join} from 'path';
import {filter} from 'async';
import {error} from 'magic-log';

export function each (arrOrObj, func) {
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
    error(`magic-utils: each called without array or object: ${arrOrObj}`);
  }
}

/*
* Recursively merge properties of two objects 
*/
function mergeObjects(obj1, obj2) {

  for (var p in obj2) {
    if ( obj2.hasOwnProperty(p) ) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor == Object ) {
          obj1[p] = MergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];

      }
    }
  }
  return obj1;
}


export function count(arrOrObj) {
  var num = 0;
  if ( typeof arrOrObj.length === 'number') { return arrOrObj.length; }

  each(arrOrObj, () => {
    num += 1;
  });
  return num;
}


export function slugify(string) {
  if ( ! string || typeof string !== 'string') { 
    throw Error(`magic-utils: slugify called without string argument: ${string}`); 
  }
  return string.replace(/[^\w\s]/g, '').toLowerCase().replace(/ /g, '-');
}

export function mergeConfig(defaultConf, newConf) {
  each(newConf, (conf, key) => {
    defaultConf[key] = conf;
  });
  return defaultConf;
}

export function isDir(file, cb) {
  stat(file, (err, stats) => {
    if ( err ) { throw err; }
    var isDir = stats.isDirectory();
    cb( (! err && isDir) );
  });
}

export function isFile(file, cb) {
  stat(file, (err, stats) => {
    if ( err ) { throw err; }
    var isFile = stats.isFile();
    cb( (! err && isFile) );
  });
}


export function filterSubDirectories(files, cb) {
  filter(files, isDir, hosts => {
    cb(null, hosts);
  });
}

function filterSubFiles(files, cb) {
  filter(files, isFile, hosts => {
    cb(null, hosts);
  });
}


export function findSubDirectories(dir, cb) {
  readdir(dir, (err, files) => {
    if ( err ) { throw err }
    each(files, (file, key) => {
      files[key] = join(dir, file);
    });
    filterSubDirectories(files, cb);
  });
}

export function findSubFiles(dir, cb) {
  readdir(dir, (err, files) => {
    if ( err ) { throw err }
    each(files, (file, key) => {
      files[key] = join(dir, file);
    });
    filterSubFiles(files, cb);
  });
}

export function prepareAsyncWaterfall(cb) {
  //creating an object to pass to the async waterfall function.
  //this allows us to just start the async waterfall without declaring
  //an object in the first callee
  cb(null, {});
}

export function isCb(cb) {
  return typeof cb === 'function';
}
