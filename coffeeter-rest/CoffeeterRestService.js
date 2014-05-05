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


  app.CoffeeLineSchema = mongoose.Schema({
    status: String,
    time : { type : Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

  app.CoffeeLine = mongoose.model('CoffeeLine', app.CoffeeLineSchema);
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
    res.setHeader('Access-Control-Allow-Origin', '*');

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
  app.User.find().sort([['id', 'descending']]).exec(function(error, users){
  	console.log(users);
 	res.json(users);
  })
});


app.get('/users/getCoffeeLine', function(req, res) {
  res.type('application/json');
  app.CoffeeLine.find().populate('user').sort([['time', 'descending']]).exec(function(error, items){
  	console.log(items);
 	res.json(items);
  })
});
 

app.post('/addCoffeeItem', function(req, res) {
	var item = req.body;
//	console.log("Got request: " + item.user.name);
//	console.log("Got request: " + item.status);
	var newItem = new app.CoffeeLine(item);
	newItem.save(function(error, newItem){
		console.log(error);
		console.log("Saved new item: "+item);
	});
	res.send(item);		
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

