'use strict';

angular.module('TextAdventure', [
	'ngRoute',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'Home'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);
