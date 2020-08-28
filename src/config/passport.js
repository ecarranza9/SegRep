const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {Tecnico} = require('../sequelize')


passport.use(new localStrategy({
        usernameField: 'nombre',
},
async (username,password,done)=>{
    const PASS = "202020"
       const user = await Tecnico.findOne({where:{nombre:username}})
            if(user === null){
                return done(null,false, {message:"no existe el nombre"})
            }else{

                if(password === PASS){
                    console.log("Estas autorizado")
                    return done(null,user)
                } else{
                    console.log("error de inicio")
                    return done(null,false,{message:"Error de credenciales"})
                }
            }
        }))
        passport.serializeUser((user, done)=>{
            console.log("Estoy serializado")
            console.log(user.id)
            done(null,user.id);
        });
        
        
passport.deserializeUser((id, done)=>{
        const user = Tecnico.findByPk(id)
        done(null,user)
    })

