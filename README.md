magic-utils
===========

[![Dependency Status](https://david-dm.org/express-magic/magic-utils.svg)](https://david-dm.org/express-magic/magic-utils)

This is a part of the [express-magic](https://github.com/express-magic) framework. 

To get started visit the [magic-server repository](https://github.com/express-magic/magic-server)

install:

    npm install express-magic/magic-utils

library usage:

    var utils = require('magic-utils');

    //functions:
    //utils.each takes an array or an object
    utils.each({}, function(item, key) {
      //do whatevs
    });

    //utils.mergeConfig merges two objects, 
    //defaulting values to the first and overwriting with the second
    var config = utils.mergeConfig(obj1, obj2);

    //utils.log is an alias for the (magic-log)[https://git@github.com/express-magic/magic-log) functionality
    utils.log('messages', 'can be arrays');
    utils.log.error()   //red font for first argument
    utils.log.warn()    //yellow font for first argument
    utils.log.success() //green font for first argument
