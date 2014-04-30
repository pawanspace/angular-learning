'use strict';
var Coffee = Coffee || {};

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

			setUsers: function(usersFromMongo){
				this.users =  usersFromMongo;
			},

			loadUsers: function(){
				var currentScope = this;
				$http.get("http://192.168.1.67:9999/users/getUsers").success(function(users){
//					console.table(users);

					// var item = {
					// 	status: "This is my first status",
					// 	user: users[0]._id
					// }

					// $http.post("http://localhost:9999/addCoffeeItem", item).success(function(resp){
					// 	console.log("saved"+resp);
					// });

					currentScope.setUsers(users);
				});


			},

			getUsers: function(){
				return this.users;
			},

			deleteUser: function(user){
				console.log(user);
			},

			saveUser: function(user, successCallback){
				$http.post("http://192.168.1.67:9999/addUser", user).success(successCallback);
			},

			contains: function(user){
				return findUserByEmailFilter("email", user.email, this.users);
			}


		};
		
		return UserFactory;
}]);

