#!/usr/local/bin/node

var exec = require('child_process').exec;
var Dockerode = require('dockerode');
var DockerEvents = require('docker-events');
var options = {socketPath: '/var/run/docker.sock'};
var dockerode = new Dockerode(options);

var emitter = new DockerEvents({
  docker: dockerode,
});

console.log("Started listening on Docker socket");

emitter.start();

// TODO Also check cluster ID

emitter.on("start", function(message) {
  if (message.Actor != null) {
    if (message.Actor.Attributes != null) {
      if (message.Actor.Attributes.name.startsWith("minimesos")) {
		var name = message.Actor.Attributes.name;		  
        var container = dockerode.getContainer(message.id);
        
        container.inspect(function (err,data) {
          var ipAddress = data.NetworkSettings.IPAddress;
   	  var parts = name.split("-");
	  var role = parts[1];
          var command = "avahi-publish -a " + role + ".mycluster.local " + ipAddress;
          console.log("Publishing " + role + ".mycluster.local as " + ipAddress);
          exec(command, function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
              console.log("Could not publish IP address " + ipAddress + " of container: " + message.Actor.Attributes.name + ": " + error);
            }
          });   
        }); 
      }
    }
  }
});

// TODO On stop or destroy kill the avahi-publish or dns-sd process


