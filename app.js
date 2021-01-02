const express=require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const PassportLocal = require('passport-local').Strategy;
const app=express();

//  Setting port and statics
app.set('port', process.env.PORT || 7777);
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'));

app.use(flash())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser('prototype secret'));
app.use(session({
	secret:'prototype secret',
	resave:true,
	saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());


passport.use(new PassportLocal(function(usuario,password,done){
	if(usuario==="1" && password==="1")
	{
		return done(null,{id:1,name:'cody'}) //pass 
	}
	done(null,false) //No user or password recognized
}));

passport.serializeUser(function(user,done){
	done(null,user.id)
})

passport.deserializeUser(function(id,done){
	done(null,{id:1,name:'cody'})
})

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