const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(new PassportLocal(function(usuario,password,done){
        if(usuario==="1" && password==="1")
        {
            return done(null,{id:1,name:'cody'}) //pass 
        }
        done(null,false) //No user or password recognized
    }));
    
    passport.serializeUser(function(user,done){
        done(null,user.id)
    })
    
    passport.deserializeUser(function(id,done){
        done(null,{id:1,name:'cody'})
    })
}; 