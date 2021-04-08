"use strict";

var X = 0;

// Para manejar los mensajes recibidos (interrupciones al worker), asigno una función al evento onmessage
onmessage = function(kk)
{
   console.log("Worker: interrupción recibida del script principal");
   console.log("Worker: Contenido del mensaje: " + kk.data);
   console.log(`Worker: Iniciando una cuenta de segundos por ${kk.data} segundos`);
   contar(kk.data);
}

// Para pasar información al hilo principal, uso postMessage()
// Con setTimeout() pongo una función para correr después de un tiempo
// En este caso, pongo mi misma función para correr un segundo después si no ha pasado todavía el tiempo máximo
function contar(segundos)
{
   X++;
   postMessage(X);
   if (X < segundos)
      setTimeout(contar, 1000, segundos);
   else
   {
      X = 0;
      terminate();
   }
}

