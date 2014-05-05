'use strict';

var Coffee = Coffee || {};

moment.fn.fromNowOrNow = function (a) {
    if (Math.abs(moment().diff(this)) < 25000) { // 25 seconds before or after now
        return 'just now';
    }
    return this.fromNow(a);
}

Coffee.coffeeter.controller("CoffeeLineController", [ "$rootScope", "CoffeeLineData", "$timeout", '$sce', function($rootScope, coffeeLineData, $timeout, $sce){
     
     var self = this;
	
 	function tick() {

 		var result = coffeeLineData.query(function(){
 			self.newCoffeetes =  result.length - self.items.length;
 			$rootScope.coffeeLineFactory.setCoffeeLineItems(result);
 			$timeout(tick, 5000);
 		});
  		
   	
	 }

	(function init(){
		 self.items = $rootScope.coffeeLineFactory.getCoffeeLineItems();
		 tick();
	})();   


	this.time = function(time){
		return moment(time).fromNowOrNow();
	}

    this.replaceSmilies = function(smilyText){
    	smilyText = smilyText.replace(/:\)/ig, '<img src="images/smiley-glad-icon.png">');
    	smilyText = smilyText.replace(/:D/ig, '<img src="images/smiley-laugh-icon.png">');
    	smilyText = smilyText.replace(/:\(/ig, '<img src="images/smiley-sad-icon.png">');
    	smilyText = smilyText.replace(/:p/ig, '<img src="images/foolish-icon.png">');
    	smilyText = smilyText.replace(/;\)/ig, '<img src="images/smiley-wink-icon.png">');
    	return $sce.trustAsHtml(smilyText);
    }
    

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
     	self.items.unshift(item);
     }

}]);