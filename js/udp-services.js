(function() {
'use strict';

angular.module('udpTest').factory('udpServices', udpServices);

udpServices.$inject= ['$q','$ionicLoading','$localStorage'];

function udpServices($q,$ionicLoading,$localStorage) {

	function scanUdp() {
		var delay= 10000; // scan for 10 seconds
		var _udpScanPort= 55555; // port to listen
        var deferred= $q.defer();
		$ionicLoading.show({
			template: 'Listening...'
		});
		chrome.sockets.udp.create({}, function (createInfo) {
			var _socketUdpId= createInfo.socketId;
			/// connect the socket to the port 55555
			chrome.sockets.udp.bind(_socketUdpId, "0.0.0.0", _udpScanPort, function(result) {
				console.log(result);
			});
			/// add the listener
			chrome.sockets.udp.onReceive.addListener(function (info) {
				if (typeof $localStorage.list === 'undefined') {
					$localStorage.list= new Array();
				}
				var data= arrayBuffer2str(info.data);
				var row= { 
					"addr": info.remoteAddress,
					"data": data
				};
				$localStorage.list.push(row);
			});
			/// the timeout set the end of the listening
			setTimeout(function() {
				chrome.sockets.udp.close(_socketUdpId, function() {
					/// close the socket
					$ionicLoading.hide();
					deferred.resolve($localStorage.list);
				});
			}, delay);
		});
        return deferred.promise;
    };

	function arrayBuffer2str(buf) {
		return String.fromCharCode.apply(null, new Uint8Array(buf));
	}

	return {
		scanUdp: scanUdp
    };
};

})();



