'use strict';
var Coffee = Coffee || {};

Coffee.coffeeter.controller("LoginController", ["$rootScope","$routeParams", "$location", function($rootScope, $routeParams, $location){
       
       this.errorMessage = $routeParams.error;

       this.login = function(user){
       		var realUser = $rootScope.userFactory.contains(user);
   
       		if(realUser !== null){
				$rootScope.user = realUser;
				$location.path("/coffeeline");
       		}else{
       			$location.path("/login/User not found");
       		}
       };
        
 }]);
