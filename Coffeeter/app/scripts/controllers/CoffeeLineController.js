'use strict';

var Coffee = Coffee || {};

Coffee.coffeeter.controller("CoffeeLineController", [ "$rootScope", "CoffeeLineData", "$timeout", function($rootScope, coffeeLineData, $timeout){
     
     var self = this;
	
 	function tick() {

 		var result = coffeeLineData.query(function(){
 			self.newCoffeetes =  result.length - self.items.length;
 			$rootScope.coffeeLineFactory.setCoffeeLineItems(result);
 			$timeout(tick, 5000);
 		});
  		
  		//self.items = $rootScope.coffeeLineFactory.getCoffeeLineItems();
	 	//$rootScope.coffeeLineFactory.setCoffeeLineItems(coffeeLineData.query());
	 	
	 }

	(function init(){
		 self.items = $rootScope.coffeeLineFactory.getCoffeeLineItems();
		 //$rootScope.coffeeLineFactory.setCoffeeLineItems(coffeeLineData.query());
		 tick();
	})();   

    

	 this.refresh =function(){
	 	self.items = $rootScope.coffeeLineFactory.getCoffeeLineItems();
	 	self.newCoffeetes = null;
		$rootScope.coffeeLineFactory.setCoffeeLineItems(coffeeLineData.query());
	 }


     this.brew = function(item){
     	item.user = $rootScope.user._id;
     	var promise = $rootScope.coffeeLineFactory.add(item);
     	item.realUser = $rootScope.user;
     	self.item = {};
     	self.items.push(item);
     }

}]);