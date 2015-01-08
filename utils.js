'use strict';
//middleware function
var fs    = require('fs')
  , log   = require('magic-log')
  , path  = require('path')
  , async = require('async')
  , utils = {}
;
utils.log = log;

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

utils.mergeConfig = function (defaultConf, newConf) {
  utils.each(newConf, function(conf, key) {
    defaultConf[key] = conf;
  });
  return defaultConf;
}

utils.isDir = function (file, cb) {
  fs.stat(file, function (err, stat) {
    if ( err ) { throw err; }
    var isDir = stat.isDirectory();
    cb( (! err && isDir) );
  });
}

utils.isFile = function (file, cb) {
  fs.stat(file, function (err, stat) {
    if ( err ) { throw err; }
    var isFile = stat.isFile();
    cb( (! err && isFile) );
  });
}


function filterSubDirectories(files, cb) {
  async.filter(files, utils.isDir, function(hosts) {
    cb(null, hosts);
  });
}

function filterSubFiles(files, cb) {
  async.filter(files, utils.isFile, function(hosts) {
    cb(null, hosts);
  });
}


utils.findSubDirectories = function findSubDirectories(dir, cb) {
  fs.readdir(dir, function (err, files) {
    if ( err ) { throw err }
    utils.each(files, function(file, key) {
      files[key] = path.join(dir, file);
    });
    filterSubDirectories(files, cb);
  });
}

utils.findSubFiles = function findSubFiles(dir, cb) {
  fs.readdir(dir, function (err, files) {
    if ( err ) { throw err }
    utils.each(files, function(file, key) {
      files[key] = path.join(dir, file);
    });
    filterSubFiles(files, cb);
  });
}

utils.prepareAsyncWaterfall = function prepareWaterFall(cb) {
  cb(null, {});
}


module.exports = utils;
