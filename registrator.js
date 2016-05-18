'use strict';

var os = require('os');
var exec = require('child_process').exec;

var Registrator = function () {

	var createCommand = function (container, hostName, ip) {
		if (os.platform() === 'darwin') {
			return "dns-sd -P " + container + " _http._tcp \"\" 1111 " + hostName + " " + ip;
		} else if (os.platform() === 'linux') {
			return "avahi-publish -a " + hostName + " " + ip;
		}
	};

	return {
		registerHost: function (container, hostName, ip) {
			console.log("Publishing container " + container + " on ip " + ip + " with hostname: " + hostName);
			var command = createCommand(container, hostName, ip);
			exec(command, function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log("Could not publish IP address " + ip + " of container: " + container + ": " + error + "\n\tcommand=" + command);
				}
			});
		}
	}

};

module.exports = Registrator;