"use strict";

$("#donGallevante").click(function()
{
   //$(this).text("Don Gallevante");
   var firebaseDB = firebase.database();
   // Para cargar el item raíz de mi DB, es con firebaseDB.ref() con parámetro en blanco
   var datos = firebaseDB.ref().child("kk").get();
   $(this).text(datos);
});


