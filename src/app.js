const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session')
const flash = require('connect-flash');
const {Pedido} = require('./sequelize')
const pedidosRoutes = require('./routes/pedidos.router');
const tecnicoRoutes = require('./routes/tecnicos.router');
const asignacionRoutes = require('./routes/asignacion.router');
const cierreRoutes = require('./routes/cierres.router');



app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');



app.use(express.urlencoded({extended: false}) )
app.use(express.json())
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'secreto',
    resave: false, 
    saveUninitialized: false}));
app.use(flash())

app.use(function(req, res,next){
    res.locals.success_msg = req.flash('success_msg');
    next();
})



app.use('/pedido', pedidosRoutes);
app.use('/asignacion', asignacionRoutes);
app.use('/cierres', cierreRoutes);
app.use('/tecnico', tecnicoRoutes);


app.use(express.static(path.join(__dirname, 'public')))


app.listen(app.get('port'), () =>{
    console.log("conectado al puerto 3000")
})