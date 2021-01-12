//Basic urls, accesded by everybody
const express = require('express');
const router = express.Router();
const passport = require('passport');
const config_role = require('./../config/role.js');



//page on develpment
router.get('/dev',(req,res)=>{
	res.render('usuario_panel',{});
});

//enter to login page
router.get('/login',(req,res)=>{
	//without session
	if(req.flash('error').includes("invalid credentials")) //If client alredy tried to login send alert for password and user invalid
		res.render('login',{incorrecto:true});
	else 
		res.render('login',{incorrecto:false});
});

router.get('/',(req,res,next)=>{
	//Session started
	if(req.isAuthenticated()){ //If user is not authenticated then redirect to login
		if(req.user['role']==config_role.User){ //If user is admin then send to control panel, if not then send to normal user panel
			var datetime = new Date();
			res.redirect('users/'+datetime.toISOString().slice(0,10)); //send to current date panel
		}else{
			res.redirect('admin/register');
		}
	}else{
		res.redirect('/login');
	}
});

//try to log in
router.post('/login',
  passport.authenticate('local', { 
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash:"invalid credentials"}) //If failure 
);

//logout
router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/login');
 })


module.exports  = router;