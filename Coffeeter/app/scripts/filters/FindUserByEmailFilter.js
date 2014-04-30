'use strict';

var Coffee = Coffee || {};

Coffee.coffeeter.filter("findUserByEmail", function(){
		return function(propertyName, expectedValue, users){
			var numberOfUsers = users.length;
			for( var i = 0; i < numberOfUsers; i++ ){
				if(users[i][propertyName] === expectedValue){
					return users[i];
				}
			}
			return null;
		};
});