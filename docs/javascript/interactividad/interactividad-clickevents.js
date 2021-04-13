"use strict";

import 
{ 
   navbar_mostrarConfiguracion, 
   navbar_mostrarInicio 
} 
from "/personal-organizer-html/javascript/interactividad/interactividad-navbar.js";

$("#navbar-enlace-configuracion").click(navbar_mostrarConfiguracion);
$("#navbar-enlace-inicio").click(navbar_mostrarInicio);
