"use strict";

$("#donGallevante").click(function()
{
   //$(this).text("Don Gallevante");
   var firebaseDB = firebase.database();
var datos = firebaseDB.child("kk").get();
$(this).text(datos);
});


