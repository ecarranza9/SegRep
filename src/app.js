const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session')
const flash = require('connect-flash');
const pedidosRoutes = require('./routes/pedidos.router');
const tecnicoRoutes = require('./routes/tecnicos.router');
const asignacionRoutes = require('./routes/asignacion.router');
const cierreRoutes = require('./routes/cierres.router');
const usersRoutes = require('./routes/users.router');
const adminRoutes = require('./routes/admin.router');
const passport = require('passport');
const moment = require('moment');
require('./config/passport.js');

const port = process.env.PORT || 3000;

//seteo de puertos y motor grafico.
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');




//configuraciones de middlewares y express
app.use(express.urlencoded({extended: false}) )
app.use(express.json())
app.use(session({ 
    secret: 'secreto',
    resave: true, 
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())



//Variables Globales de acceso.
app.use(function(req, res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// routes
app.use('/pedido', pedidosRoutes);
app.use('/asignacion', asignacionRoutes);
app.use('/cierres', cierreRoutes);
app.use('/tecnico', tecnicoRoutes);
app.use('/admin', adminRoutes);
app.use('/', usersRoutes);



//Carpeta estatica "public"
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))

//activacion de puerto
app.listen(port, () =>{
    console.log(`Conectado al puerto: ${port}`)
})