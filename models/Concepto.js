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
	},
	Tipo :{
		type  : String,
		required : true
	},
	Captura :{
		type  : String,
		required : true
	},
	ImporteFijo :{
		type  : Number,
		required : true
	},
	FactorCaputra :{
		type  : Number,
		required : true
	},
	Substituye :{
		type  : Number,
		required : true
	}
});
const Concepto= mongoose.model('Concepto',UserSchema);

module.exports = Concepto;