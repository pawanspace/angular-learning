'use strict';

var Coffee = Coffee || {};

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
