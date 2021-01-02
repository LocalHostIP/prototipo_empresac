const express=require('express');
const session = require('express-session');
const passport = require('passport');
require("./config/passport")(passport)
const flash = require('connect-flash');
const app=express();

//  Setting port and statics
app.set('port', process.env.PORT || 7777);
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'));

app.use(flash())
app.use(express.urlencoded({extended:true}));
app.use(session({
	secret:'prototype secret',
	resave:true,
	saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());

// Set templating engine
app.set('view engine','ejs');

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

//Listening
var server = require('http').Server(app);

//listen
server.listen(app.get('port'),()=>{
	console.log('Servidor corriendo');
	});