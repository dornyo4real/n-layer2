Dot11
=====

Wi-Fi packets streams!


Motivation
----------

`dot11` aims to provide an efficient and powerful yet simple interface to Wi-Fi
(802.11) transmissions, both for capturing and emitting. Its API is similar to
the built-in `Socket`, but for lower network layers. It is originally inspired
by [node_pcap](https://github.com/mranney/node_pcap).


Installation
------------

```bash
$ npm install dot11
```

`dot11` depends on [libpcap](http://www.tcpdump.org/) (available by default on
OS X). In order to be able to capture packets, you might also need to execute
live captures as root.


Quickstart
----------

```javascript
var dot11 = require('dot11');

// Create a readable stream from a network interface.
var live = new dot11.capture.Live('en0', {promisc: true});

// Create a writable stream to eventually store our data.
var save = new dot11.capture.Save('log.pcap');

// Read and store 5 seconds' worth of packets from our live stream.
var nPackets = 0;
live
  .close(5000)
  .on('data', function (buf) {
    nPackets++;
    console.log('Read packet of length: ' + buf.length);
  })
  .on('end', function () {
    console.log('Read ' + nPackets + ' packets!');
  })
  .pipe(save);
```

A `Replay` stream is also available to stream packets from a saved capture
file.


Documentation
-------------

You can find the API docs
[here](https://github.com/mtth/dot11/blob/master/doc/api.md).
