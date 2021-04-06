"use strict";

$("#donGallevante").click(function()
{
   var firebaseDB = firebase.database();
   // Para cargar el item raíz de mi DB, es con firebaseDB.ref() con parámetro en blanco
   var datos = firebaseDB.ref().child("kk").get();
   $(this).text(`firebaseDB[kk] = ${datos}`);
});

