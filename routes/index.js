const express = require('express');
const router = express.Router();
const passport = require('passport');
const config_role = require('./../config/role.js')

router.get('/login',(req,res)=>{
	//without session
	if(req.flash('error').includes("invalid credentials")) //If client alredy tried to login send alert 
		res.render('login',{incorrecto:true});
	else
		res.render('login',{incorrecto:false});
});

router.get('/',(req,res,next)=>{
	//Session started
	if(req.isAuthenticated()){
		if(req.user['role']==config_role.User){
			res.redirect('users/')
		}else{
			res.redirect('admin/register')
		}
	}else{
		res.redirect('/login')
	}
});

router.post('/login',
  passport.authenticate('local', { 
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash:"invalid credentials"}) //If failure 
);

//logout
router.get('/logout',(req,res)=>{
 })

module.exports  = router;