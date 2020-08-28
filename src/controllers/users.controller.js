async function getLogin(req,res){
    const user = 0;
    const message = 0;
    res.render('login',{user,message});
}


async function logOut(req,res){
    req.logout();
    req.flash('error_msg','Cerraste Sesión, vuelve a dar tus credenciales para ingresar al sitio.')
    res.redirect('/');
}

module.exports = {
    getLogin,
    logOut
}