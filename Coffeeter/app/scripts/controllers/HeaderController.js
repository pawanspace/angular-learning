'use strict';

var Coffee = Coffee || {};

Coffee.coffeeter.controller('HeaderController', ['$rootScope', '$scope', function($rootScope, $scope) {
       $scope.currentUser = $rootScope.user;

        $rootScope.$watch('user', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.currentUser = $rootScope.user;
        }
    });
}]);