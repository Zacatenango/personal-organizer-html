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
         // NOTA: La presentación de datos debe hacerse toda aquí adentro, porque las 
         // promesas son asíncronas y este código es el que corre sincronizado
         datos = snapshot.val();
         $("#donGallevante").text(`firebaseDB[kk] = ${datos}`);
      }
   });
}

function guardarFirebaseNuevo()
{
   var firebaseDB_ref = firebase.database().ref();
   var kk = prompt("Textito a guardar");
   // Nota: usar push() genera una clave aleatoria. Investigar cómo generar una
   // clave secuencial 
   firebaseDB_ref.child("posts").push(kk);
}

function guardarFirebaseSobreescribir()
{
   var firebaseDB_ref = firebase.database().ref();
   var kk = prompt("Textito a guardar");
   // Sintaxis: firebaseDB_ref.update({ "/path/hacia/elemento": <valor nuevo> });
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
      const hilo = new Worker("javascript/workerbasico.js");
      hilo.onmessage = function(kk)
      {
         var textito = `Han pasado ${kk.data} segundos`;
         $("#donGallevante").text(textito);
         console.log(textito);
      }
      hilo.postMessage(prompt("Duración del timer"));
   }
}

function worker_cronometro()
{
   // Antes que nada, declaro mi event handler.
   // Puedo hacerlo en caliente, pero es más ordenado declararlo de antemano 
   // (para que no se confundan las declaraciones con los procedimientos)
   function _worker_cronometro_procesarMensaje(kk)
   {
      segundos = kk.data;
      // Si el mensaje dice "Terminat!", corto el hilo
      if (segundos == "Terminat!")
         hilo.terminate();
      // De lo contrario, actualizo la barra de progreso
      else
      {
         //
      }
   }
   
   // Creo mi hilo
   const hilo = new Worker("javascript/worker-cronometro.js");

   // Añado al handle de mi hilo un event handler para procesar los mensajes que éste manda
   hilo.onmessage = _worker_cronometro_procesarMensaje;

   // Luego 
} 

// Sección de asignar funciones a los botones
// En ECMAscript, <button onclick=""> es chafa; se debe usar por lo menos 
// $("#boton").click()
$("#btnWebWorker").click(webworker);
$("#btnCargarFirebase").click(cargarFirebase);
$("#btnGuardarFirebaseNuevo").click(guardarFirebaseNuevo);
$("#btnGuardarFirebaseSobreescribir").click(guardarFirebaseSobreescribir);
$("#btnCronometro").click(worker_cronometro);
