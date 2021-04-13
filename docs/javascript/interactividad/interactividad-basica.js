"use strict";

export function interactividad_mostrarSeccion(_param_seccionAmostrar_sinGato)
{
   $("[data-cuerpodeldashboard]").hide();
   $(`#${_param_seccionAmostrar_sinGato}`).show();
}
