"use strict";

var X = 0;

onmessage = function(kk)
{
   console.log("Worker: interrupción recibida del script principal");
   console.log("Worker: Contenido del mensaje: " + kk.data);
   console.log(`Worker: Iniciando una cuenta de segundos por ${kk.data} segundos`);
   contar(kk.data);
}

function contar(segundos)
{
   X++;
   postMessage(X);
   if (X < segundos)
      setTimeout(contar, 1000, segundos);
   else
      X = 0;
}
