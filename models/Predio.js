//Concepto database structure
const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
    Id_Elemento :{
	  	type  : String,
	  	required : true
  	},
  	Descripcion :{
		type  : String,
		required : true
	},
	Activo :{
		type  : String,
		required : true
	}
});
const Predio= mongoose.model('predios',UserSchema);

module.exports = Predio;