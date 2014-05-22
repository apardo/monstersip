var monsterxCtrls = angular.module('monsterxCtrls', []);

monsterxCtrls.controller('rootCtrl', ['$scope', 'sipSrv', function($scope, sipSrv) {

		$('#loginModal').modal();

		$scope.submitLogin = function() {

			var sip = new sipSrv($scope.username, $scope.password);
			sip.login();

			window.sip = sip;
		};
	}]);
