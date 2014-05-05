'use strict';

var Coffee = Coffee || {};


Coffee.coffeLineDataServices = angular.module('coffeLineDataServices', ['ngResource']);



Coffee.coffeeter = angular.module("Coffeeter", ['ngRoute', 'coffeLineDataServices']);

Coffee.coffeeter.directive("coffeterHeader", function(){
   return {
      templateUrl: 'views/header.html'
    };
})


Coffee.coffeeter.config(["$routeProvider", function($routeProvider){
   
  /**
   * When expects two arguments
   * (1) Url
   * (2) object with two properties: (1) Controller name with alias(Alias is optional) (2) html template url
   */
  $routeProvider
  .when("/users", {
    controller : "UserController as userController",
    templateUrl: "views/adduser.html"
  })
  .when("/login/:error?", {
    controller : "LoginController as loginController",
    templateUrl: "views/login.html"
  })
  .when("/coffeeline", {
    controller : "CoffeeLineController as coffeeLineController",
    templateUrl: "views/coffeeline.html"
  })
  .otherwise({
    redirectTo: "/login"
  });

}]);

Coffee.auth = function($rootScope, $location){
                $rootScope.assertAuth = function(){
                  if($rootScope.user){
                    return true;
                  }
                  else{
                    return false;
                  }
                };
                $rootScope.$on('$locationChangeStart', function (event, next) {
                    if( next.indexOf("/login") === -1 && !$rootScope.assertAuth()){
                      $location.path("/login");
                    }
                  });
              };


Coffee.coffeeter.run(["$rootScope","$location","$route","bootstrapFactory", "UserFactory","CoffeeLineFactory",
  function($rootScope, $location, $route, bootstrapFactory, UserFactory, CoffeeLineFactory) {
    bootstrapFactory.bootstrap();  
    $rootScope.userFactory  = new UserFactory();
    $rootScope.coffeeLineFactory  = new CoffeeLineFactory();

    Coffee.auth($rootScope, $location, $route);
}]);         
