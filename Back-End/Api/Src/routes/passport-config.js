const LolcalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')



function initialize (passport, getUserbyEmail, getUserById){
    
    const authenticateUser = async (email, password, done) => {
        const user = getUserbyEmail(email)
        if (user == null) {
            return done(null,false, {message: 'No user with that email'})
        }
        try { 
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else {
            return done(null,false, {message: 'Password Incorrect'})
            }
            } catch(e){
                return done(e)
            }

        passport.use(new LolcalStrategy({usernameField: 'email'}), authenticateUser)
            passport.serializeUser((user, done) =>{ 
                done(null, user.id) 
            })
            passport.deserializeUser((id, done) =>{
                return done(null, getUserById(id))
            })
    }
}

modules.exports = initialize
