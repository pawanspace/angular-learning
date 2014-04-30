'use strict';

var Coffee = Coffee || {};

Coffee.coffeeter.controller("UserController", ["$rootScope", function($rootScope){
       
       

       this.users = $rootScope.userFactory.getUsers();

       this.addUser = function(user){
       	   var scope = this;
           $rootScope.userFactory.saveUser(user, function(){
           	 scope.users.push(user); 
		   	     scope.user = {};
           });
        };

  //      this.init = function(){
		//     bootstrapFactory.bootstrap();  
		// }
        
 }]);