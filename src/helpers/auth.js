//Esto es un middleware para saber si el usuario esta autenticado o no
const helpers = {};


helpers.isAuthenticated = (req,res,next) =>{

    if(req.isAuthenticated()) {
        return next();
    }

    req.flash('error_msg', 'No esta autorizado para ingresar, coloque un usuario existente y la clave de ACCESO');
    res.redirect('/');

};
    
module.exports = helpers;