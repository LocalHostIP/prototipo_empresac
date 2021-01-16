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
		type:[],
		required: true	
	}
});
const Fechadb= mongoose.model('fechadbs',UserSchema);

module.exports = Fechadb;