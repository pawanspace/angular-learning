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
			currentScope.setCoffeeLineItems(coffeeLineData.query());
			
		},

		add: function(item){
			var currentScope = this;
			var promise = $http.post("http://192.168.66.76:9999/addCoffeeItem", item).success(function(savedItem){
				currentScope.items.push(savedItem);
			});
			return promise;
		},

		getCoffeeLineItems: function(){
			return this.items;
		}
	}


	return CoffeeLineFactory;
}]);