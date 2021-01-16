//Day database structure
const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
	fecha :{
		type  : String,
		required : true
	} ,
	usuario :{
		type  : String,
		required : true
	} ,
	habilitado :{
		type  : Boolean,
		required : true
	} ,
	datos:{
		type:{
			nombre:{type: String, required: true},
			concepto:{type: String, required: true},
			id_concepto:{type: String, required: true},
			predio:{type: String, required: true},
			id_elemento:{type: String, required: true},
			cantidad:{type: Number, required: true},
		},
		required: true	
	}
});
const Fechadb= mongoose.model('fechadb',UserSchema);

module.exports = Fechadb;