'use strict';

describe('Controller: LoginController', function () {

  // load the controller's module
  beforeEach(module('Coffeeter'));


  var mockUserFactoryInvalid = {
    contains: function(user){
      return null;
    }
  }


  var  mockLocation = {
      path: function(new_path){
        this.newPath = new_path
      }
  };

  var LoginController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    $rootScope.userFactory = mockUserFactoryInvalid;
   
    LoginController = $controller('LoginController', {
      $scope: scope,
      $location: mockLocation
    });
  }));

  it('should not have any error message for first time load', function () {
    expect(LoginController.errorMessage).toBe(undefined);
  });

  it('should give login error for empty user', function () {
    LoginController.login({});
    expect(mockLocation.newPath).toBe("/login/User not found");
  });

   it('should login and got o Coffeeline', function () {
        mockUserFactoryInvalid.contains = function(user){
                                            return {name: "valid"};
                                          };
        LoginController.login({name: "valid"});
        expect(mockLocation.newPath).toBe("/coffeeline");
   });



});
