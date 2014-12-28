/* jshint mocha: true, node: true */

(function () {
  'use strict';

  var assert = require('assert'),
      decoders = require('../lib/decoders');

  describe('Decoder for', function () {

    describe('IEEE802_11_RADIO', function () {

      it('decodes radiotap frames', function () {

        validate(
          'IEEE802_11_RADIO',
          '000020006708040054c6b82400000000220cdaa002000000400100003c142411aa',
          {
            'headerRevision': 0,
            'headerPad': 0,
            'headerLength': 32,
            'body': new Buffer('aa', 'hex')
          }
        );

      });

    });

    describe('IEEE802_11_FRAME', function () {

      it('decodes beacon frames', function () {

        validate(
          'IEEE802_11_FRAME',
          '80000000ffffffffffff06037f07a01606037f07a016b077',
          {
            'version': 0,
            'type': 'mgmt',
            'subType': 'beacon',
            'toDs': 0,
            'fromDs': 0,
            'duration': 0,
            'ra': 'ff:ff:ff:ff:ff:ff',
            'ta': '06:03:7f:07:a0:16',
            'da': 'ff:ff:ff:ff:ff:ff',
            'sa': '06:03:7f:07:a0:16',
            'bssid': '06:03:7f:07:a0:16'
          }
        );

      });

      it('decodes rts frames', function () {

        validate(
          'IEEE802_11_FRAME',
          'b400c400606c668ff5e3ac220bce6de0',
          {
            'version': 0,
            'type': 'ctrl',
            'subType': 'rts',
            'toDs': 0,
            'fromDs': 0,
            'duration': 196,
            'ra': '60:6c:66:8f:f5:e3',
            'ta': 'ac:22:0b:ce:6d:e0'
          }
        );

      });

      it('decodes cts frames', function () {

        validate(
          'IEEE802_11_FRAME',
          'c400da0f606c668ff5e3',
          {
            'version': 0,
            'type': 'ctrl',
            'subType': 'cts',
            'toDs': 0,
            'fromDs': 0,
            'duration': 4058,
            'ra': '60:6c:66:8f:f5:e3'
          }
        );

      });

      it('decodes data frames', function () {

        validate(
          'IEEE802_11_FRAME',
          '08420000ffffffffffffac220bce6de0ac220bce6de0a0e45c2400a000000000',
          {
            'version': 0,
            'type': 'data',
            'subType': 'data',
            'toDs': 0,
            'fromDs': 1,
            'duration': 0,
            'ra': 'ff:ff:ff:ff:ff:ff',
            'ta': 'ac:22:0b:ce:6d:e0',
            'da': 'ff:ff:ff:ff:ff:ff',
            'bssid': 'ac:22:0b:ce:6d:e0' // No SA.
          }
        );

      });

      it('decodes qos frames', function () {

        validate(
          'IEEE802_11_FRAME',
          'c8093c0016abf0a58460fc4dd42bab2816abf0a5846040b70000',
          {
            'version': 0,
            'type': 'data',
            'subType': 'qos',
            'toDs': 1,
            'fromDs': 0,
            'duration': 60,
            'ra': '16:ab:f0:a5:84:60',
            'ta': 'fc:4d:d4:2b:ab:28',
            'sa': 'fc:4d:d4:2b:ab:28',
            'bssid': '16:ab:f0:a5:84:60' // No DA.
          }
        );

      });

      it('decodes ack frames', function () {

        validate(
          'IEEE802_11_FRAME',
          'd4000000606c668ff5e3',
          {
            'version': 0,
            'type': 'ctrl',
            'subType': 'ack',
            'toDs': 0,
            'fromDs': 0,
            'duration': 0,
            'ra': '60:6c:66:8f:f5:e3'
          }
        );

      });

    });

  });

  function validate(datalink, hexBytes, expectedObject) {

    var buf = new Buffer(hexBytes, 'hex');
    var actualObject = decoders[datalink].decode(buf);
    assert.deepEqual(
      actualObject,
      expectedObject,
      JSON.stringify(actualObject) + ' != ' + JSON.stringify(expectedObject)
    );

  }

})();
