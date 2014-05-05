describe('Coffeeter', function() {
  beforeEach(function() {
     browser().navigateTo('/');
  });
 
   it('should jump to the /login path when / is accessed', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe("/login");
  });

  it('ensures user can log in', function() {
    browser().navigateTo('#/login');
    expect(browser().location().path()).toBe("/login");

    // assuming inputs have ng-model specified, and this conbination will successfully login
    input('loginController.user.email').enter('pawan@gmail.com');
    element('#login').click();
    // logged in route
    expect(browser().location().path()).toBe("/coffeeline");

    // my dashboard page has a label for the email address of the logged in user
    expect(element('#user').text()).toContain('Pawan');
  });


});