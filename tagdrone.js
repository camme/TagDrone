var clusterFinder = require("./clusterfinder"),
    arDrone = require('ar-drone'),
    control = arDrone.createUdpControl(),
    png = require('png');

png.decode('./testdata/test1.png', function(pixels){
  console.log(pixels);
});
var fly       = false;
var emergency = true;
var ref = {
  fly: fly,
  emergency: emergency
}

setInterval(function() {
  control.ref(ref);
  control.pcmd();
  control.flush();
}, 30);

// For the first second, disable emergency if there was one
setTimeout(function() {
  emergency = false;
}, 1000);

setTimeout(function() {
  fly = false;
}, 5000);
