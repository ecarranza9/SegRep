const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {Usuario} = require('../sequelize')
const bcrypt = require('bcryptjs')


passport.use(new localStrategy({
        usernameField: 'username',
},
async (username,password,done)=>{
       const user = await Usuario.findOne({where:{username:username}})
            if(user === null){
                return done(null,false, {message:"no existe el nombre"})
            }else{
                const match = await bcrypt.compare(password,user.password)
                if(match){
                    console.log("Correcto")
                    return done(null,user);
                }else{
                    console.log("incorrecto")
                    return done(null, false, {message:'Contraseña incorrecta'});
                }
            }
        }))

        passport.serializeUser((user, done)=>{
            done(null,user.id);
        });
        
        passport.deserializeUser((id, done)=>{
         const user = Usuario.findByPk(id)
                done(null,user);
            })
        
