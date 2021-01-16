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
		type  : String,
		required : true
	},
	FactorCaptura :{
		type  : String,
		required : true
	},
	Substituye :{
		type  : String,
		required : true
	}
});
const Concepto= mongoose.model('conceptos',UserSchema);

module.exports = Concepto;