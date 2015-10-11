'use strict';

angular.module('MyApp', [
	'ngRoute',
	'Home'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
	$routeProvider.when('/what', {templateUrl: 'partials/what.html', controller: 'HomeController'});
	$routeProvider.when('/why', {templateUrl: 'partials/why.html', controller: 'HomeController'});
	$routeProvider.when('/how', {templateUrl: 'partials/how.html', controller: 'HomeController'});
	$routeProvider.when('/gallery', {templateUrl: 'partials/gallery.html', controller: 'HomeController'});
	$routeProvider.when('/links', {templateUrl: 'partials/links.html', controller: 'HomeController'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);