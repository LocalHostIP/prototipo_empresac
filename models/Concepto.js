//Concepto database structure
const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
	IdConcepto :{
	  	type  : String,
	  	required : true
  	},
  	Descripcion :{
		type  : String,
		required : true
	}
});
const Concepto= mongoose.model('conceptos',UserSchema);

module.exports = Concepto;