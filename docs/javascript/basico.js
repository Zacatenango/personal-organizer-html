"use strict";

$("#donGallevante").click(function()
{
   var firebaseDB = firebase.database();
   // Para cargar el item raíz de mi DB, es con firebaseDB.ref() con parámetro en blanco
   var datos = firebaseDB.ref().child("kk").get();
   $(this).text(`firebaseDB[kk] = ${datos}`);
});

function webworker()
{
   if (!window.Worker)
   {
      $("#donGallevante").text("Este navegador básico o del año del caldo no soporta hilos");
   }
   else
   {
      const hilo = new Worker("workerbasico.js");
      hilo.onmessage = function(kk)
      {
         textito = `Han pasado ${kk.data} segundos`;
         $("#donGallevante").text(textito);
         console.log(textito);
      }
   }
}
