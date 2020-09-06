const {Usuario } = require("../sequelize")
const bcrypt = require("bcryptjs")


async function getRegister(req,res){
    const errors = 0
    res.render('register', {errors:errors})
}

async function Register(req,res){
    const errors = []
    const {username, password, confirm_password} = req.body
    const users = await Usuario.findOne({where:{username:username}})
    if(users != null){
        errors.push({text:'El usuario ya fue registrado, elija otro'})
    }
    if(username.length <= 0){
        errors.push({text:'Debe ingresar un usuario'})
    }
    if(password.length <= 0){
        errors.push({text:'Debe ingresar un password'})
    }
    if(password != confirm_password){
        errors.push({text:'Las contraseñas no coinciden'})
    }
    if(errors.length > 0){
        res.render('register',{
            username:username,
            password:password,
            confirm_password:confirm_password,
            errors:errors
        })
    } else{
        const hash = await bcrypt.hash(password,10)
        const newUser = await Usuario.create({
            username: req.body.username,
            password: hash
        })
        req.flash('success_msg','Te has registrado correctamente')
        res.redirect('/')
    } 

}


async function getresetPassword(req,res){
    const errors = 0
    res.render('resetPassword',{errors:errors})
}

async function resetPassword(req,res) {

    const errors = []
    const {username, password, confirm_password} = req.body
    const users = await Usuario.findOne({where:{username:username}})
    if(users === null){
        errors.push({text:'El usuario no existe'})
    }
    if(password.length <= 0){
        errors.push({text:'Debe ingresar un password'})
    }
    if(password != confirm_password){
        errors.push({text:'Las contraseñas no coinciden'})
    }
    if(errors.length > 0){
        res.render('resetPassword',{
            username:username,
            password:password,
            confirm_password:confirm_password,
            errors:errors
        })
    } else{
        const hash = await bcrypt.hash(password,10)
        users.password = hash
        users.save();
        req.flash('success_msg','Haz cambiado tu contraseña')
        res.redirect('/')
    } 




}

async function getLogin(req,res){
    const user = 0;
    const message = 0;
    res.render('login',{user,message});
}



async function logOut(req,res){
    req.logout();
    req.flash('success_msg','Cerraste sesión, vuelve a dar tus credenciales para ingresar al sitio.')
    res.redirect('/');
}

module.exports = {
    getLogin,
    logOut,
    getRegister,
    Register,
    getresetPassword,
    resetPassword
}