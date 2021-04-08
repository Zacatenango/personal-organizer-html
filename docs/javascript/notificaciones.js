"use strict";

function iNotify()
{
   // Paso 1: confirmar que nuesto navegador sí maneje notificaciones
   if (!("Notification" in window))
   {
      alert("Su Internet Explorer no soporta notificaciones");
      return;
   }
   else 
   {
      // Paso 2: si sí las maneja, confirmar que haya permiso.
      if (Notification.permission === "granted")
      {
         // Paso 3: si hay permiso, mostrar la notificación
         // Sintaxis: var <objeto de notificacion> = new Notification("<titulo del mensaje>", { body: "<contenido del mensaje>" });
         var notificacion = new Notification("Don Guilluvina", { body: "Don Disersa" });
      }
      else
      {
         // Paso 4: si no hay permiso, lo pido
         Notification.requestPermission();
      }
   }
}

// Por seguridad, las notificaciones se tienen que pedir obligatoriamente en un event handler
$("#btnNotificacion").click(iNotify);
