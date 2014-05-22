var monsterX = angular.module('monsterX', [
	'ngRoute',
	'monsterxCtrls',
  'monsterxSrvs'
]);

monsterX.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/static/js/views/root.html',
        controller: 'rootCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);