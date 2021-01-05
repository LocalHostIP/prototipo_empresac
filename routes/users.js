//User urls
const express = require('express');
const router = express.Router();

router.get('/:p_day',(req,res)=>{
	//Session started
	res.render('form')
});

module.exports  = router;

