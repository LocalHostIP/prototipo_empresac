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
	},
	Busqueda :{
		type  : String,
		required : true
	}
});
const Predio= mongoose.model('predios',UserSchema);

module.exports = Predio;