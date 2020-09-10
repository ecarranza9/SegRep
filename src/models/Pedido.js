module.exports = (sequelize,Datatypes) => {

    const Pedido = sequelize.define('pedido',{
        interno: {
            type: Datatypes.INTEGER
        },
        fecha_apertura:{
            type: Datatypes.STRING
        },
        hora_apertura:{
            type: Datatypes.STRING
        },
        solicitud:{
            type: Datatypes.STRING
        },
        ubicacion_eqp:{
            type: Datatypes.STRING
        },
        emisor: {
            type: Datatypes.STRING
        },
        metodo_contacto:{
            type: Datatypes.STRING
        },
        mail_solicitante:{
            type: Datatypes.STRING
        },
        tel_solicitante:{
            type: Datatypes.STRING
        },
        indicaciones: {
            type: Datatypes.STRING
        },
        prioridad:{
            type: Datatypes.INTEGER
        },
        estado:{
            type: Datatypes.INTEGER,
            defaultValue: 0
        }

    })

    
    Pedido.associate = function(models){
      Pedido.belongsToMany(models.Tecnico,{
            through:'pedidotecnicos',
        })
        
      Pedido.hasOne(models.Cierre,{
          as: 'cierres'
      })
        
    }
       

    return Pedido



}