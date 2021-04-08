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
   function _worker_cronometro_procesarMensajeDesdeHilo(kk)
   {
      var segundos = kk.data;
      // Si el mensaje dice "Terminat!", corto el hilo
      if (segundos == "Terminat!")
         hilo.terminate();
         
      // De lo contrario, actualizo la barra de progreso
      else
      {
         // Saco cuánto % del total de segundos es el tiempo transcurrido
         var segundos_porcentaje = segundos / max_segundos;

         // Actualizo en base a eso la anchura de la parte rellena de la progressbar
         $("#progress-interno").css("width", `${Math.round(segundos_porcentaje * 100)}%`);
         
         // Luego actualizo la etiqueta de la progressbar
         $("#progress-interno").text(`${segundos} s / ${max_segundos} s`);
      }
   }
   
   // Ahora que he declarado mi event handler, comienzo ahora sí con el worker
   // Comienzo preguntando por cuántos segundos debe ser el cronómetro
   var max_segundos = prompt("¿Cuántos segundos debe durar el cronómetro?");

   // Creo mi hilo
   const hilo = new Worker("javascript/worker-cronometro.js");

   // Añado al handle de mi hilo el event handler que declaré previamente
   hilo.onmessage = _worker_cronometro_procesarMensajeDesdeHilo;

   // Luego pateo el hilo con los segundos que debe contar
   hilo.postMessage(max_segundos);
} 

// Sección de asignar funciones a los botones
// En ECMAscript, <button onclick=""> es chafa; se debe usar por lo menos 
// $("#boton").click()
$("#btnWebWorker").click(webworker);
$("#btnCargarFirebase").click(cargarFirebase);
$("#btnGuardarFirebaseNuevo").click(guardarFirebaseNuevo);
$("#btnGuardarFirebaseSobreescribir").click(guardarFirebaseSobreescribir);
$("#btnCronometro").click(worker_cronometro);
