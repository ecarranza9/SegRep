const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session')
const flash = require('connect-flash');
const pedidosRoutes = require('./routes/pedidos.router');
const tecnicoRoutes = require('./routes/tecnicos.router');
const asignacionRoutes = require('./routes/asignacion.router');
const cierreRoutes = require('./routes/cierres.router');
const usersRoutes = require('./routes/users.router')
const passport = require('passport');
require('./config/passport.js')

//configuracion general server
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');



app.use(express.urlencoded({extended: false}) )
app.use(express.json())
app.use(session({ 
    secret: 'secreto',
    resave: true, 
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.use(function(req, res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})



app.use('/pedido', pedidosRoutes);
app.use('/asignacion', asignacionRoutes);
app.use('/cierres', cierreRoutes);
app.use('/tecnico', tecnicoRoutes);
app.use('/', usersRoutes);


app.use(express.static(path.join(__dirname, 'public')))


app.listen(app.get('port'), () =>{
    console.log("conectado al puerto 3000")
})