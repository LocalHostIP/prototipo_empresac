const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  nombre :{
      type  : String,
      required : true
  } ,
  usuario :{
    type  : String,
    required : true
    } ,
    password :{
        type  : String,
        required : true
    } ,
    empleo :{
        type : String,
        required : true
    },
    role:{
        type: String,
        required:true
    }
});
const User= mongoose.model('User',UserSchema);

module.exports = User;