#!/usr/local/bin/node

var Dockerode = require('dockerode');
var DockerEvents = require('docker-events');
var dockerode = new Dockerode();
var Registrator = require('./mdns-registrator.js')

var emitter = new DockerEvents({
	docker: dockerode
});

console.log("Started listening on Docker socket");

emitter.start();

// TODO Also check cluster ID

emitter.on("start", function (message) {
	if (message.Actor != null) {
		if (message.Actor.Attributes != null) {
			if (message.Actor.Attributes.name.startsWith("minimesos")) {
				var name = message.Actor.Attributes.name;
				var container = dockerode.getContainer(message.id);

				container.inspect(function (err, data) {
					var ipAddress = data.NetworkSettings.IPAddress;
					if (ipAddress) {
						var parts = name.split("-");
						var role = parts[1];
						var hostName = role + ".mycluster.local";
						Registrator.registerHost(name, hostName, ipAddress);
					}
				});
			}
		}
	}
});

// TODO On stop or destroy kill the avahi-publish or dns-sd process


