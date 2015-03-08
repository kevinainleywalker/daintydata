'use strict';

angular.module('MyApp', [
	'ngRoute',
	'Home'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);
