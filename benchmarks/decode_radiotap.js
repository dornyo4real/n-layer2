/* jshint node: true */

/**
 * Benchmark various MAC address parsing methods.
 *
 */
(function () {
  'use strict';

  var utils = require('./utils'),
      addon = require('../src/js/utils').requireAddon();

  var benchmark = new utils.Benchmark();
  var decoder = new addon.RadiotapDecoder();

  benchmark
    .addFn('object creation', function (done) {

      var buf = new Buffer('000019006f080000d51566410000000012301c164001d2a401', 'hex');
      var i = 100;

      while (i--) {
        decoder.decode(buf, 0);
      }
      done();

    })
    .run(1e2, function (stats) {
      console.dir(stats);
    });

})();