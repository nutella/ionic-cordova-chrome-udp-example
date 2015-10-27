(function() {
'use strict';
    
angular.module('udpTest').controller('udpController',udpController);

udpController.$inject= ['udpServices','$localStorage'];

function udpController(udpServices,$localStorage) {
    var vm= this;
    vm.listening= listening;

	init();

	function init() {
		if (typeof vm.udpArray === 'undefined') {
			vm.udpArray= new Array();
		}
	}

	function listening() {
		udpServices.scanUdp().then(function(data) {
			vm.udpArray= data;
		});
	}


}

})();