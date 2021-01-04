const LocalStrategy = require('passport-local').Strategy;
const config_role = require('./role.js')
const User = require("./../models/User.js")
const bcrypt = require('bcrypt');

module.exports = function(passport) {
	passport.use(new LocalStrategy({usernameField : 'username'},(user,password,done)=> {
		//match user
		User.findOne({usuario : user})
		.then((user)=>{
		 if(!user) {
			 return done(null,false);
		 }
		 //match pass
		 bcrypt.compare(password,user.password,(err,isMatch)=>{
			 if(err) throw err;
			 if(isMatch) {
				 return done(null,user);
			 } else {
				 return done(null,false);
			 }
		 })
		})
		.catch((err)=> {console.log(err)})
	}))

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	}); 
}; 