const LocalStrategy = require('passport-local').Strategy;
const config_role = require('./role.js')

module.exports = function(passport) {
    passport.use(new LocalStrategy(function(usuario,password,done){
        if(usuario==="2" && password==="2")
        {
            return done(null,{id:1,name:'cody'}) //pass 
        }
        done(null,false) //No user or password recognized
    }));
    
    passport.serializeUser(function(user,done){
        done(null,user.id)
    })
    
    passport.deserializeUser(function(id,done){
        done(null,{id:1,name:'cody',role:config_role.Admin})
    })
}; 