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
   // Según Google, el siguiente código se usa para cargar el valor de una promesa; pero
   // a mí me funciona más bien con await.
   datos_promesa.then(function(snapshot)
   {
      if (snapshot.exists())
      {
         datos = snapshot.val();
      }
   });

   // await en ECMAscript 2020 sirve para esperar a que se cumpla una promesa y
   // carga a la vez su valor
   //datos_kk = await datos_promesa;
   //var datos = datos_kk.node_.value_;

   // Ahora sí, presento mis datos
   $("#donGallevante").text(`firebaseDB[kk] = ${datos}`);
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

function guardarFirebaseNuevo()
{

}

function guardarFirebaseSobreescribir()
{

}

$("#btnWebWorker").click(webworker);
$("#btnCargarFirebase").click(cargarFirebase);
$("#btnGuardarFirebaseNuevo").click(guardarFirebaseNuevo);
$("#btnGuardarFirebaseSobreescribir").click(guardarFirebaseSobreescribir);
