"use strict";

$("#btnNotificacion").click(iNotify);

function iNotify()
{
   if (!("Notification" in window))
   {
      alert("Su Internet Explorer no soporta notificaciones");
      return;
   }
   else if (Notification.permission === "granted")
   {
      var notificacion = new Notification("Don Guilluvina", { body: "Don Disersa" });
   }
}
