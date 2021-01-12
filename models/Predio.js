//Concepto database structure
const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
    IdElemento :{
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
const Predio= mongoose.model('Predio',UserSchema);

module.exports = Predio;