var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');



var app = express();

mongoose.connect('mongodb://localhost/coffeeter');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Yay yay yay");
  
  app.UserSchema = mongoose.Schema({
    name: String,
    email: String
  });

  app.User = mongoose.model('User', app.UserSchema);
});


/**
 * Allow cross origin request for all requests coming from Angular js file.
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

	next();

});

app.use(bodyParser());   

app.get('/users/getUser/:name', function(req, res) {
  res.type('application/json');
  var name = req.params.name;
  console.log("Parameter: " + name);

  app.User.find({ name:  new RegExp(name, 'i') }, function(error, users){
  	console.log(users);
 	res.json(users);
  })
});
 

app.get('/users/getUsers', function(req, res) {
  res.type('application/json');
  app.User.find(function(error, users){
  	console.log(users);
 	res.json(users);
  })
});
 

app.post('/login', function(req, res) {
	var employee = req.body;
	console.log("Got request: " + JSON.stringify(employee));
	res.send(employee);		
});	

app.post('/addUser', function(req, res) {
	var user = req.body;
	console.log("Got request: " + user.name);
	var newUser = new app.User(user);
	newUser.save(function(error, newUser){
		console.log("Saved new user: "+newUser);
	})
	res.send(newUser);		
});	
 
app.listen(process.env.PORT || 9999);

