'use strict';

angular.module('Home')
    .controller('NavigationController', ['$scope', function($scope) {
        $scope.navigate = function (page){
            location.href = '#/' + page;
        };
    }]);