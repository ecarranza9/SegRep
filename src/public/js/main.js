'use strict'
var Loading=(loadingDelayHidden=0)=>{let loading=null;const myLoadingDelayHidden=loadingDelayHidden;let imgs=[];let lenImgs=0;let counterImgsLoading=0;function incrementCounterImgs(){counterImgsLoading+=1;if(counterImgsLoading===lenImgs){hideLoading()}}function hideLoading(){if(loading!==null){loading.classList.remove('show');setTimeout(function(){loading.remove()},myLoadingDelayHidden)}}function init(){document.addEventListener('DOMContentLoaded',function(){loading=document.querySelector('.loading');imgs=Array.from(document.images);lenImgs=imgs.length;if(imgs.length===0){hideLoading()}else{imgs.forEach(function(img){img.addEventListener('load',incrementCounterImgs,false)})}})}return{'init':init}}

Loading(800).init();


setTimeout(function() {

$('#error').fadeOut(2000);

},3000);

var mail = document.getElementById('mail')
var telefono = document.getElementById('telefono');
var mail_input = document.getElementById('mail_input')
var telefono_input = document.getElementById('telefono_input')
var contacto = document.getElementById('contacto');
var form_pedido = document.getElementById('form_pedido');
var fecha_hora = document.getElementById('fecha_hora');
var tickets = document.getElementById('table_ticket');
var modal_estado = document.getElementById('modal-estado');
var btnTicket = document.querySelector('#boton-estado')

mostrarModal("http://localhost:3000/pedido")
function mostrarModal(location){
   console.log(location)
   console.log(window.location.href)
   if(window.location.href.toString() == location){
      $("#exampleModal2").modal("show");
   }
}






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

if(form_pedido){
form_pedido.onsubmit = function(e){
   e.preventDefault()
     if(telefono_input.value == "" && mail_input.value == ""){
        alert("Favor de completar algun dato de contacto")
     } else{
        form_pedido.submit()
     }
   } 
}
   


function mueveReloj(){
   var hoy = new Date();
   var fecha = hoy.getDate() + "-" + (hoy.getMonth()+1) + "-" + (hoy.getFullYear()); 
  var momentoActual = new Date()
  var hora = momentoActual.getHours()
  var minuto = momentoActual.getMinutes()
   var segundo = momentoActual.getSeconds()

  var horaImprimible = hora + " : " + minuto + " : " + segundo

   fecha_hora.innerHTML = "Fecha:" + " " + fecha + " " + "Hora:" + " " + horaImprimible
   setTimeout("mueveReloj()",1000)
}


var head = [],
       i = 0,
       tableObj = {myrows: []};
$.each($("#my_table thead th"), function() {
       head[i++] = $(this).text();
});

$.each($("#my_table tbody tr"), function() {
       var $row = $(this),
           rowObj = {};

       i = 0;
       $.each($("td", $row), function() {
           var $col = $(this);
           rowObj[head[i]] = $col.text();
           i++;
       })

       tableObj.myrows.push(rowObj);
});

var ticket;
var object = [];
var finalObject =[];
var now = moment()


for(ticket of tableObj.myrows){
   object.push({
      ticket : ticket["N° Ticket"],
      fechaHora: ticket["Fecha / Hora apertura"]
   })
}

for(let item in object){
   finalObject.push({
      ticket: object[item].ticket.slice(1),
      fecha: object[item].fechaHora.slice(6,16),
      hora: object[item].fechaHora.slice(22,27),
      fechayHora: moment(object[item].fechaHora.slice(6,16) + " " + object[item].fechaHora.slice(22,27),'YYYY-MM-DD HH:mm'),
   })
}

var objetoaMostrar = []

for(let item in finalObject){
   objetoaMostrar.push({
      Ticket : object[item].ticket.slice(1),
      Dias: now.diff(finalObject[item].fechayHora,'hours'),
      Estado: now.diff(finalObject[item].fechayHora,'days', true) > 2
   })
}

let datos = JSON.parse(JSON.stringify(objetoaMostrar))
console.log(datos)
modal_estado.innerHTML = 'No hay novedades'
for(let item of objetoaMostrar){
if(item.Estado === false){
   item.Estado = "La averia esta en tiempo y forma"
} else{
   item.Estado = "OJO, ya han pasado 48hs"
}
modal_estado.innerHTML = `
<ul>
      <li> <strong>TICKET:</strong> ${item.Ticket}, <strong> HORAS DESDE EL PEDIDO:</strong> ${item.Dias}HS., <strong> ESTADO:</strong> ${item.Estado}</li>
     
     
      
</ul>



`
}

window.onload = function () {
   mueveReloj()
}