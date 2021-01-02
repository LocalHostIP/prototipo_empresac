
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
	//Session started
	res.render('form')
});

module.exports  = router;

