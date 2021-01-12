const express=require('express'); //Make server easily 
const session = require('express-session'); //Make sessions
const passport = require('passport'); //Login with sessions
require("./config/passport")(passport) //Login config
const flash = require('connect-flash'); //Send messeges to client
const mongoose = require('mongoose');
const app=express();	
const db_config = require('./config/db.js')
var favicon = require('serve-favicon');

//Configure mongoos's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(db_config.url,{useNewUrlParser: true, useUnifiedTopology : true})

//  Setting port and statics
app.set('port', process.env.PORT || 7777); //Setting port automatically
app.use(express.static('public')); //Setting public files

//configure favicon
app.use(favicon('./public/favicon.ico'));

app.use(flash()) 
app.use(express.urlencoded({extended:true}));
app.use(session({
	secret:'prototype secret',
	resave:true,
	saveUninitialized:true,
	maxAge: 3 * 60 * 60 * 1000 // 3 hours
}))

app.use(passport.initialize());
app.use(passport.session());

// Set templating engine
app.set('view engine','ejs');

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/admin',require('./routes/admin'));
//page not found
app.use('*', function(req,res){
    res.status(404)
    res.render('errorPage')     
})

//Listening
var server = require('http').Server(app);

//listen
server.listen(app.get('port'),()=>{
	console.log('Servidor corriendo');
	});