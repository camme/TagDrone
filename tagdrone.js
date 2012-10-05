var clusterFinder = require("./clusterfinder");

var png = require('png');

png.decode('./testdata/test1.png', function(pixels) {
    console.log(pixels);
     });
