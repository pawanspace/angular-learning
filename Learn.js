var Coffee = Coffee || {};

Coffee.coffeeter = angular.module("Coffeeter", ['ngRoute']);


Coffee.coffeeter.factory("bootstrapFactory", function(){
	
		var bootstrapedUsers = [];
		
		function bootstrap(){
		     bootstrapedUsers.push({name: 'Pawan', email: 'pawan@gmail.com'});
		     bootstrapedUsers.push({name: 'Sriram', email: 'sriram@gmail.com'});
		     bootstrapedUsers.push({name: 'Evan', email: 'evan@gmail.com'});
		     localStorage.setItem("bootstrapedUsers" , JSON.stringify(bootstrapedUsers));   
		}
		
		return {"bootstrap" : bootstrap};
});

Coffee.coffeeter.filter("findUserByEmail", function(){
		return function(propertyName, expectedValue, users){
			var numberOfUsers = users.length;
			for( var i = 0; i < numberOfUsers; i++ ){
				if(users[i][propertyName] === expectedValue){
					return users[i];
				}
			}
			return null;
		}
});




Coffee.coffeeter.factory("UserFactory", ["findUserByEmailFilter" ,"bootstrapFactory","$http", function(
	findUserByEmailFilter,bootstrapFactory, $http){
	
		function UserFactory(users){
			this.users = [];

			this.loadUsers();

			if(users){
				this.setUsers(users);
			}
		}


		UserFactory.prototype = {

			setUsers: function(usersFromLocalStorage){
				this.users =  usersFromLocalStorage;
			},

			loadUsers: function(){
				var currentScope = this;
				$http.get("http://localhost:9999/users/getUsers").success(function(users){
					console.table(users);
					currentScope.setUsers(users)
				});
				currentScope.setUsers(JSON.parse(localStorage.getItem("bootstrapedUsers")));
			},

			getUsers: function(){
				return this.users;
			},

			deleteUser: function(user){

			},

			saveUser: function(user, successCallback){
				$http.post("http://localhost:9999/addUser", user).success(successCallback);
			},

			contains: function(user){
				return findUserByEmailFilter("email", user.email, this.users) !== null;
			}


		}
		
		return UserFactory;
}]);






Coffee.coffeeter.controller("HeaderController", ["$rootScope", "$scope", function($rootScope, $scope){
       $scope.currentUser = $rootScope.user;

        $rootScope.$watch('user', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.currentUser = $rootScope.user;
        }
    });
}]);


Coffee.coffeeter.controller("UserController", ["$rootScope", function($rootScope){
       
       

       this.users = $rootScope.userFactory.getUsers();

       this.addUser = function(user){
       	   var scope = this;
           $rootScope.userFactory.saveUser(user, function(){
           	 scope.users.push(user); 
		   	 scope.user = {};
           });
        }

  //      this.init = function(){
		//     bootstrapFactory.bootstrap();  
		// }
        
 }]);

Coffee.coffeeter.controller("LoginController", ["$rootScope","$routeParams", "$location", function($rootScope, $routeParams, $location){
       
       this.errorMessage = $routeParams.error;

       this.login = function(user){
       		if($rootScope.userFactory.contains(user)){
				$rootScope.user = user;
				$location.path("/users");
       		}else{
       			$location.path("/login/User not found");
       		}
       }
        
 }]);


Coffee.coffeeter.config(["$routeProvider", function($routeProvider){
	 
	/**
	 * When expects two arguments
	 * (1) Url
	 * (2) object with two properties: (1) Controller name with alias(Alias is optional) (2) html template url
	 */
	$routeProvider
	.when("/users", {
		controller : "UserController as userController",
		templateUrl: "adduser.html"
	})
	.when("/login/:error?", {
		controller : "LoginController as loginController",
		templateUrl: "login.html"
	})
	// .when("/login", {
	// 	controller : "LoginController as loginController",
	// 	templateUrl: "login.html"
	// })
	.otherwise({
		redirectTo:	"/login"
	});

}]);

Coffee.auth = function($rootScope, $location, $route){
					$rootScope.assertAuth = function(){
						if($rootScope.user){
							return true;
						}
						else{
							return false;
						}
					}
					$rootScope.$on('$locationChangeStart', function (event, next) {
						if( next.indexOf("/login") === -1 && !$rootScope.assertAuth()){
							$location.path("/login");
						}
						// }else if (next.indexOf("/login") !== -1  && $rootScope.assertAuth()){
						// 	$location.path("/users");
						// }
    				});
				 }

Coffee.coffeeter.run(["$rootScope","$location","$route","bootstrapFactory", "UserFactory",function($rootScope, $location, $route, bootstrapFactory, UserFactory) {
	bootstrapFactory.bootstrap();  
	$rootScope.userFactory  = new UserFactory();
	Coffee.auth($rootScope, $location, $route);
}]);				 
