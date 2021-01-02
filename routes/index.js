
const express = require('express');
const router = express.Router();

router.get('/login',(req,res)=>{
	//without session
	if(req.flash('error').includes("invalid credentials")) //If client alredy tried to login send alert 
		res.render('login',{incorrecto:true});
	else
		res.render('login',{incorrecto:false});
});

router.get('/',(req,res)=>{
	//Session started
	res.redirect('/users/')
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