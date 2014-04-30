Coffee.coffeeter.factory("CoffeeLineFactory", [ "$http", "CoffeeLineData", "$timeout", function($http, coffeeLineData, $timeout){



	function CoffeeLineFactory(){
		this.items = [];
		this.load();
	};


	CoffeeLineFactory.prototype = {

		setCoffeeLineItems: function(coffeeLineItemsFromMongo){
			this.items = coffeeLineItemsFromMongo;
		},

		load: function(){
			var currentScope = this;
			// $http.get("http://localhost:9999/users/getCoffeeLine").success(function(coffeeLineItems){
			// 	console.table(coffeeLineItems[0].user.name);
			// 	currentScope.setCoffeeLineItems(coffeeLineItems);
			// });
			currentScope.setCoffeeLineItems(coffeeLineData.query());
			
		},

		add: function(item){
			var currentScope = this;
			var promise = $http.post("http://192.168.1.67:9999/addCoffeeItem", item).success(function(savedItem){
				currentScope.items.push(savedItem);
			//	item.status = "";
			});
			return promise;
		},

		getCoffeeLineItems: function(){
			return this.items;
		}
	}


	return CoffeeLineFactory;
}]);