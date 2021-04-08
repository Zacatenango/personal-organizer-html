"use strict";

var segundos = 0;

// Función para manejar los mensajes entrantes
onmessage = function(kk)
{
   contar(kk.data);
}

// Función principal del hilo
function contar(_param_segundosRecibidos)
{
   // Primero incremento mi timer
   segundos++;

   // Si no ha expirado el timer:
   if (segundos <= _param_segundosRecibidos)
   {
      // Transmito el contenido del timer
      postMessage(segundos);
      // Agendo recursivamente la función para dentro de 1 segundo, con la misma cantidad de 
      // segundos máximos recibida por parámetro
      setTimeout(contar, 1000, _param_segundosRecibidos);
   }
   else // Si ya expiró:
   {
      // Borro el timer y transmito el fin del timer para que el event handler corte el hilo
      segundos = 0;
      postMessage("Terminat!");
   }
}
