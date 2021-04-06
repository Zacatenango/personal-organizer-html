"use strict";


function cargarFirebase()
{
   // Inicializo mi base de datos Realtime Database
   var firebaseDB = firebase.database();
   
   // Para cargar el item raíz de mi DB, es con firebaseDB.ref() con parámetro en blanco
   // WARNING: Esto baja toda la base de datos con todo y todo, y Google cobra eso carizzimo
   // de París
   var datos_promesa = firebaseDB.ref().child("kk").get();

   // Pero todavía no puedo usar esos datos, porque vienen en forma de promesa. Es necesario
   // esperar a que la promesa se cumpla (que es cuando ya se cargaron) y extraer su
   // valor. 
   // then() es una función que recibe como parámetro una función que se corre cuando
   // la promesa se cumple
   var datos = null;
   datos_promesa.then(function(snapshot)
   {
      if (snapshot.exists())
      {
         // Ahora sí, presento mis datos
         // NOTA: La presentación de datos debe hacerse toda aquí adentro, porque las promesas son asíncronas
         // y este código es el que corre sincronizado
         datos = snapshot.val();
         $("#donGallevante").text(`firebaseDB[kk] = ${datos}`);
      }
   });
}

function guardarFirebaseNuevo()
{
   var firebaseDB_ref = firebase.database().ref();
   var kk = prompt("Textito a guardar");
   firebaseDB_ref.child("posts").push(kk);
}

function guardarFirebaseSobreescribir()
{
   var firebaseDB_ref = firebase.database().ref();
   var kk = prompt("Textito a guardar");
   firebaseDB_ref.update({"/kk": kk});
}

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

$("#btnWebWorker").click(webworker);
$("#btnCargarFirebase").click(cargarFirebase);
$("#btnGuardarFirebaseNuevo").click(guardarFirebaseNuevo);
$("#btnGuardarFirebaseSobreescribir").click(guardarFirebaseSobreescribir);
