'use strict'

setTimeout(function() {

	$('#error').fadeOut(2000);

   },3000);


var mail = document.getElementById('mail')
var telefono = document.getElementById('telefono');
var mail_input = document.getElementById('mail_input')
var telefono_input = document.getElementById('telefono_input')
var contacto = document.getElementById('contacto');
var form_pedido = document.getElementById('form_pedido')
function mostrar(id){

   if(id == "WhatsApp"){
      mail.style.display = 'none',
      telefono.style.display = 'block'
   }

   if(id == "Telefono"){
      mail.style.display = 'none',
      telefono.style.display = 'block'
   }
   if(id == "Mail"){
      mail.style.display = 'block',
      telefono.style.display = 'none'
   }

}

form_pedido.onsubmit = function(e){
   e.preventDefault()
     if(telefono_input.value == "" && mail_input.value == ""){
        alert("Favor de completar algun dato de contacto")
     } else{
        form_pedido.submit()
     }
   } 
