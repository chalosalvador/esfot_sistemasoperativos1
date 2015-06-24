/* Integré aquí las funciones que me sirven de openacs core.js */
/* La idea de no utilizarlo es para que, al actualizar, no sobreescribir */

/* Emulate getElementById on document.all only browsers. Requires
   that IDs are unique to the page and do not coincide with NAME
   attributes on other elements:-
   Source: http://www.litotes.demon.co.uk/js_info/faq_notes/alt_dynwrite.html#getEl
*/
if((!document.getElementById) && document.all){
    document.getElementById = function(id){return document.all[id];};
}

function acs_Focus(form_name, element_name) {
    if (document.forms == null) return;
    if (document.forms[form_name] == null) return;
    if (document.forms[form_name].elements[element_name] == null) return;
    if (document.forms[form_name].elements[element_name].type == 'hidden') return;

    document.forms[form_name].elements[element_name].focus();
}

/* RTE functions */ 	 
 function acs_rteSubmitForm() { 	 
         updateRTEs(); 	 
         return true; 	 
 } 	 
  	 
 function acs_rteInit(form_name) { 	 
 // sets onsubmit to function for the given form name 	 
     if (document.forms == null) return; 	 
     if (document.forms[form_name] == null) return; 	 
     document.forms[form_name].onsubmit = acs_rteSubmitForm; 	 
 }

/* HTMLArea (part of Richtext Widget) Support */

function acs_initHtmlArea(editor_var, elementid) {
    editor_var.generate();
    return false;
}

 /* List Builder Support */

function acs_ListFindInput() {
  if (document.getElementsByTagName) {
    return document.getElementsByTagName('input');
  } else if (document.all) {
    return document.all.tags('input');
  }
  return false;
}

function acs_ListCheckAll(listName, checkP) {
  var Obj, Type, Name, Id;
  var Controls = acs_ListFindInput(); if (!Controls) { return; }
  // Regexp to find name of controls
  var re = new RegExp('^' + listName + '..+');

  checkP = checkP ? true : false;

  for (var i = 0; i < Controls.length; i++) {
    Obj = Controls[i];
    Type = Obj.type ? Obj.type : false;
    Name = Obj.name ? Obj.name : false;
    Id = Obj.id ? Obj.id : false;

    if (!Type || !Name || !Id) { continue; }

    if (Type == "checkbox" && re.exec(Id)) {
      Obj.checked = checkP;
    }
  }
}

function acs_ListBulkActionClick(formName, url) {
  if (document.forms == null) return;
  if (document.forms[formName] == null) return;

  var form = document.forms[formName];

  form.action = url;
  form.submit();
}

function acs_KeypressGoto(theUrl, event) {
	var key;
    	if (event) {
	      if (event.which == 13) {
	        location.href = theUrl;
      	      }
    	}
}



/* Copy-Paste functionality */
// Using acs_CopyText form Openacs core and ...
// http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript */
// http://stackoverflow.com/questions/7713182/copy-to-clipboard-for-all-browsers-using-javascript

function copia_al_portapapeles(text) {
    if (document.all) {
        holdtext.innerText = text;
        Copied = holdtext.createTextRange();
        Copied.execCommand("Copy");
    } else if (window.netscape) {
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;

        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;

        trans.addDataFlavor('text/unicode');

        var str = new Object();
        var len = new Object();

        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);

        var copytext = text;

        str.data = copytext;

        trans.setTransferData("text/unicode", str, copytext. length*2);

        var clipid = Components.interfaces.nsIClipboard;
        if (!clipid) return false;

        clip.setData(trans, null, clipid. kGlobalClipboard);
    }
	set_user_message ('<p>Copiaste' + text + 'y ahora puedes pegarlo donde quieras (con Ctrl + V)</p>')
}


// Show / Hide an element
// QUITAR (ya utilizo jquery)

function hide_element(id) {
    var item = document.getElementById(id);
    item.style.display = "none";
}
// QUITAR (ya utilizo jquery)
function show_element(id) {
    var item = document.getElementById(id);
    item.style.display = "block";
}

// Swap Display Property an ID Class
// to show/hide content 

function showHide(shID, cadena_mostrar, cadena_ocultar) {

    if (cadena_mostrar && cadena_ocultar) {
       var mostrar = cadena_mostrar;
       var ocultar = cadena_ocultar;
    } else {
       var mostrar = '+';
       var ocultar  = '-';
    }

    if (document.getElementById(shID)) {
       if (document.getElementById(shID+'-button').innerHTML == mostrar) {
           $(document.getElementById(shID)).show('slow');
           document.getElementById(shID+'-button').innerHTML = ocultar;
       }
       else {
           $(document.getElementById(shID)).hide('slow');
           document.getElementById(shID+'-button').innerHTML = mostrar;
       }
    }
    return true;
}

// JS Function to check email 
//
function valida_correo(campo_email, imagen){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    var campo = document.getElementById(campo_email);
    var imagen = document.getElementById(imagen);
    var correo = campo.value;

    if ( correo.search(re) == 0 ) {
       campo.setAttribute("style","color: rgb(5,5,5);");
       imagen.innerHTML = "<img class=\"icon\" src=\"/resources/acs-subsite/icons/yes_logo.png\"  /> Email Ok";
       return false;
    }
    campo.setAttribute("style","color: red;");
    imagen.innerHTML = "<img  class=\"icon\" src=\"/resources/acs-subsite/icons/no_logo.png\"  /> Revisa Email";

    return true;
}

// JS Function to check  
//
function valida_nombre(f, imagen){
    var re = /^[A-Za-z -_á-úñ]+$/;
    var campo = document.getElementById(f);
    var imagen = document.getElementById(imagen);
    var correo = campo.value;

    if ( correo.search(re) == 0 ) {
       campo.setAttribute("style","color:  rgb(5,5,5);");
       imagen.innerHTML = "<img class=\"icon\" src=\"/resources/acs-subsite/icons/yes_logo.png\"  />";
       return false;
    }
    campo.setAttribute("style","color: red;");
    imagen.innerHTML = "<img  class=\"icon\" src=\"/resources/acs-subsite/icons/no_logo.png\"  />";

    return true;
}

function valida_int(f, imagen){
    var re = /^[0-9]+$/ ;
    var campo = document.getElementById(f);
    var correo = campo.value;
    var mostrar = false;
    
    var imagen = document.getElementById(imagen);

    if ( correo.search(re) == 0 ) {

       campo.setAttribute("style","color:  rgb(5,5,5);");
       //imagen.innerHTML = "<img class=\"icon\" src=\"/resources/acs-subsite/icons/yes_logo.png\"  /> Número Ok";
       imagen.innerHTML = "";

       return false;
    } else {
       campo.setAttribute("style","color: red;");
       imagen.innerHTML = "<img  class=\"icon\" src=\"/resources/acs-subsite/icons/no_logo.png\"  /> Revisa el Número (sin espacios ni decimales)";
       return true;
    }

}

/* 
 Funciones de Geolocalización HTML5
 Gracias Antonio Navajas !!
 http://www.antonionavajas.com/blog/categoria-tutoriales/geolocalizacion-html5/ 
*/

function localizame() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
           mostrar_coordenadas(position);
       });
    } else{
       set_user_message('Ups! Tu navegador no soporta geolocalización.');
    }
}

function donde_estoy () {
if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
           set_user_message ('Con una precisión de <b>' + position.coords.accuracy + 'm</b>');
           var de = document.getElementById('donde_estoy');
           de.href = 'https://maps.google.com/?ll=' + position.coords.latitude + ',' + position.coords.longitude + '&z=16';
           de.innerHTML = "Ver";
           return true;
       });
    } else{
       set_user_message('Oops! Tu navegador no soporta geolocalización.');
    }
}

function mostrar_coordenadas(p) {
    var gsd = document.getElementById('geolocation-simple-data');
    gsd.innerHTML = '<a href="https://maps.google.com/?ll=' + p.coords.latitude + ',' + p.coords.longitude +'&z=16">Mapa</a> ' + ' (con una <b>precisión de  ' +  p.coords.accuracy;
    return true;
}

// Da Request Denied
function pais(p) {
    var coordenadas = 'latlng=' + p.coords.latitude + ',' + p.coords.longitude;
    $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?", coordenadas,
             function(data) {
                 for (i = 0; i < data.results.length; i++) {
                     set_user_message (data.results[i].formatted_address);
                 }
             });
}

function errores(err) {
    if (err.code == 0) {
       set_user_message('Oops! Algo ha salido mal');
    }
    if (err.code == 1) {
       set_user_message('¡Ah! Bueno. Pero no puedo darte avisos específicos para tu país');
    }
    if (err.code == 2) {
       set_user_message('¡Uy! No puedo obtener tu posición');
    }
    if (err.code == 3) {
       set_user_message('¡Ups! Hemos superado el tiempo de espera');
    }
}

/* Mensajes de Usuario */
function set_user_message (message) {
    var pb = document.getElementById('alert-message');

    if  (pb) {
	
    }  else {
	padre = document.getElementById('inner-wrapper');
	var mensaje = document.createElement("div");
	mensaje.id = 'alert-message';
	mensaje.innerHTML = message;
	var abuelo  = padre.parentNode;
	abuelo.insertBefore(mensaje, padre);
    }

    setTimeout("document.getElementById('alert-message').style.display = 'none'", 5000);
    return true;
}




// Para mostrar una de las opciones 
// Espera el id de la lista-ul y el id d

function muestra_menu(menu, item) {
    alert('Al menos entra aquí');
    var list = document.getElementById(menu).getElementsByTagName("li");
    for (l in list) {
       document.getElementById(menu).getElementsByTagName("li").display='none';
    }
    $("li").find(".contenido").show();
    return true;
}
