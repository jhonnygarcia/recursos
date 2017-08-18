
/**
 * @fileoverview Libreria con funciones de utilidad
 *
 * @author Johann Cespedes
 * @version 0.1
 */
/*******************************************************************************/
var scriptData = {
    windowHeight: $(window).height()
}
/*Funciones Globales*/
/**
 * Cuenta los elementos de un objeto javascript
 * @param    {Object} elem Elemento a evaluar
 * @return   {Integer} Tamaño del elememto
 */
function objectCount(elem) {
    var n = 0;
    for (var i in elem) {
        n++;
    }
    return n;
}
/**
 * Obtiene los parametros pasados por la direccion URL
 * @return   {Object} Objeto con parametros
 */
function getUrlVars(url) {
    var vars = {};
    var tempUrl = url == null ? window.location.href : url;
    var parts = tempUrl.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
/**
 * Evalua el valor de un elemento,
 * si el elemento no es NULO retorna el mismo
 * si el elemento es NULO devuelve un valor por defecto
 * @param    {Object} elem Elemento a evaluar
 * @param    {Object} $default Valor a devolver en caso de que 'elem' sea NULO
 * @return   {Integer} Tamaño del elememto
 */
function nvl(elem, $default) {
    var retorno = null;
    if ((elem != null) && (elem != undefined)) {
        retorno = elem;
    } else {
        if ($default != undefined) {
            retorno = $default;
        }
    }
    return retorno;
}
/**
 * Evalua el valor de un elemento, permitiendo saber si es o no NULO, si es o no indefinido
 * @param    {Object} elem Elemento a evaluar
 * @return   {Boolean} true|false
 */
function isNull(elem) {
    return ((elem == null) || (elem == undefined));
}

function decode(param, values) {
    var retorno;
    $.each(values, function (index, value) {
        if ((index % 2) == 0) {
            if (param == value) {
                retorno = values[index + 1];
                return false;
            }
        }
    });
    if ((retorno == undefined) && ((values.length - 1) % 2 == 0)) {
        retorno = values[values.length - 1];
    }
    return retorno;
}

function parseParams(params) {
    return $.toJSON(params);
}

/**
 * Trunca un texto para que paresca un resumen
 * @param    {String} text Texto a truncar
 * @param    {Integer} length Longitud para truncar el texto
 * @param    {String} end Texto opcional que ira al final del texto
 * @return   {String} Texto truncado
 */
function summary(text, length, end) {
    return trim(text.substr(0, length) + ((text.length > length) ?
            (isNull(end) ? '' : '...') : ''));
}

/**
 * Genera texto cortado dentro de una etiqueta SPAN
 * @param {string} text Texto que se procesara
 * @param {int} length Cantidad de caracteres a mostrar del texto a procesar
 * @param {string} end Texto que se presentara al final del texto procesado
 * @return {string} Cadena de caracteres
 */
function summaryHtml(text, length, end) {

    return '<span title="' + text + '">' + trim(text.substr(0, length) +
            ((text.length > length) ? (isNull(end) ? '' : '...') : '')) + '</span>';
}

/**
 * Valida la existencia de tela de bloquedo para asignar el nuevo zIndex
 */
function fixDialogZIndex(popup) {
    if (popup.dialog('instance').overlay) {
        popup.dialog('instance').overlay.zIndex(getNewDialogZIndex());
    }
}

/**
 * Obtiene un nuevo zIndex para la tela de bloqueo del dialogo
 */
/**
 * Actualiza la pagina actual
 */
function refresh() {
    window.location.reload();
}
/**
 * Evalua si un texto esta vacio
 *
 * @param {string} text Texto a evaluar
 * @return {Boolean}
 */
function isEmpty(text) {

    if (text !== null && text !== undefined) {
        if (text.length) {
            return false;
        }
        return true;
    }
    return true;
}
/**
 * Evalua si un texto es nulo o vacio
 *
 * @param {string} text Texto a evaluar
 * @return {Boolean}
 */
function isNullOrEmpty(elem) {
    return !(elem && elem.length);
}
/**
 * Verifica si no existen valores repetidos dentro de una lista  Array
 *
 * @param {Array} list Lista a evaluar
 * @return {Boolean} true|false
 */
function arrayHasDupes(list) {
    var i, j, n;
    n = list.length; // to ensure the fewest possible comparisons
    for (i = 0; i < n; i++) { // outer loop uses each item i at 0 through n
        for (j = i + 1; j < n; j++) { // inner loop only compares items j at i+1 to n
            if (list[i] == list[j])
                return true;
        }
    }
    return false;
}

/**
 * Remueve los tags html de una cadena de texto
 *
 * @param    {String} text Texto a evaluar
 * @return   {String} Texto sin tags html
 */
function stripTags(text) {
    return text.replace(/<([^>]+)>/g, '');
}

/**
 * Remueve los espacios vacios de los extremos de una cadena de texto
 *
 * @param    {String} text Texto a evaluar
 * @return   {String} Texto
 */
function trim(text) {
    return $.trim(text);
}

/**
 * Genera un numero aleatorio
 *
 * @return {Integer} Numero aleatorio
 */
function random() {
    return new Date().getTime() + Math.floor(Math.random() * 1000);
}

/**
 * Conversor de variables comunes a su equivalente booleano, incluyendo los textos 'true' y 'false'
 *
 * @param {string} val Valor a evaluar
 * @return {Boolean} true|false
 */
function parseBoolean(val) {
    if (typeof val == "string") {
        return decode(val, ['true', true, 'false', false]);
    }
    return Boolean(val);
}

/**
 * Convierte los caracteres extraños html a caracteres normales, dentro de una cadena de texto
 *
 * @param    {String} text Texto a evaluar
 * @return   {Sttring} Texto
 */
function entityToHtml(text) {
    var ta = $("<textarea />");
    ta.html(text); //.replace(/</g,"&lt;").replace(/>/g,"&gt;");
    return ta.val();
}

/**
 * Resalta partes especificas de un texto con la etiqueta STRONG
 *
 * @param {string} text Cadena de texto a procesar
 * @param {string} highlight Fragmento de texto para buscar y marcar
 * @return {string} Cadena de texto
 */
function highlightText(text, highlight) {
    return text.toString().replace(
            new RegExp(
                    "(?![^&;]+;)(?!<[^<>]*)(" +
                    $.ui.autocomplete.escapeRegex(highlight) +
                    ")(?![^<>]*>)(?![^&;]+;)", "gi"
                    ), "<strong>$1</strong>");
}

//function round(cantidad, decimales) {
//    var cantidad = parseFloat(cantidad);
//    var decimales = parseFloat(decimales);
//    decimales = (!decimales ? 2 : decimales);
//    return parseInt(cantidad * Math.pow(10, decimales)) / Math.pow(10, decimales);
//}
function round(cantidad, decimales) {
    cantidad = parseFloat(cantidad);
    decimales = parseInt(decimales);
    decimales = ((isNull(decimales) || isNaN(decimales)) ? 2 : decimales);
    var digitos = Math.pow(10, decimales);
    return (Math.round(cantidad * digitos) / digitos);
}
/**
 * validar Numero de seguro social en ESPAÑA
 */
function esNss(valor) {
    valor = valor.allTrim();
    //podemos encontrarnos números con 11 o 12 dígitos
    if (valor.length != 12 && valor.length != 11) {
        return false;
    }
    //sacamos las partes…
    var a = parseInt(valor.substring(0, 2));
    var b = valor.substring(2, (valor.length - 2));
    var c = parseInt(valor.substring((valor.length - 2), (valor.length)));
    // si el numero b (la parte central) empieza por 0 hay que quitar primero los ceros
    var cero = b.substring(0, 1);
    if (cero == '0') {
        for (var i = 0; i < b.length; i++) {
            if (b[0] == 0) {
                b = b.substring(1, b.length);
            } else {
                break;
            }
        }
    }
    //unimos las partes en caso de que hubiese ceros
    var d = parseInt(a + '' + b);
    var valor = d % 97;
    if (c != valor) {
        return false;
    } else {
        return true;
    }
}

/**
 * validar DNI en ESPAÑA
 */
function esDni(valor) {
    valor = valor.allTrim();
    if (valor.length > 9 || valor.length == 0) {
        return false; //Evalua longitud
    }
    var esFormatoDni = /^([0-9]{8})[A-Z]{1}$/i.test(valor);
    var esFormatoNif = /^[KLM]{1}[0-9]{7}[A-Z]{1}$/i.test(valor);
    if (esFormatoDni || esFormatoNif) {

        var caracterVerificacion = valor.substr(valor.length - 1, 1).toUpperCase();
        var numero = 0;
        if (esFormatoDni) {
            numero = parseInt(valor.substr(0, valor.length - 1));
        }
        if (esFormatoNif) {
            numero = parseInt(valor.substr(1, valor.length - 2));
        }

        var letras = 'TRWAGMYFPDXBNJZSQVHLCKET';
        if (!isNaN(numero) && valor.substr(valor.length - 1, 1) == letras.substr(numero % 23, 1)) {
            return true;
        }
    }
    return false;
}

/**
 * validar NIF en ESPAÑA
 */
function esNif(valor) {
    valor = valor.allTrim();
    if (valor.length > 9 || valor.length == 0) {
        return false; //Evalua longitud
    }
    var esFormatoDni = /^([0-9]{8})[A-Z]{1}$/i.test(valor);
    var esFormatoNif = /^[KLM]{1}[0-9]{7}[A-Z]{1}$/i.test(valor);
    var esFormatoNifAntiguo = /^[0-9]{7}[A-Z]{1}$/i.test(valor);
    if (esFormatoDni || esFormatoNif || esFormatoNifAntiguo) {
        while (valor[0] == '0') {
            valor = valor.substr(1, valor.length - 1);
        }

        var caracterVerificacion = valor.substr(valor.length - 1, 1).toUpperCase();
        var numero = 0;
        if (esFormatoDni) {
            numero = parseInt(valor.substr(0, valor.length - 1));
        }
        if (esFormatoNif) {
            numero = parseInt(valor.substr(1, valor.length - 2));
        }
        if (esFormatoNifAntiguo) {
            numero = parseInt(valor.substr(0, valor.length - 1));
        }

        var letras = 'TRWAGMYFPDXBNJZSQVHLCKET';
        if (!isNaN(numero) && valor.substr(valor.length - 1, 1) == letras.substr(numero % 23, 1)) {
            return true;
        }
    }
    return false;
}

/**
 * validar NIE en ESPAÑA
 */
function esNie(valor) {
    valor = valor.allTrim();
    if (valor.length > 9 || valor.length == 0) {
        return false; //Evalua longitud
    }
    if (!/^[XYZ]{1}[0-9]{7}[A-Z]{1}$/i.test(valor)) {
        return false; //Evalua formato
    }

    var caracterVerificacion = valor.substr(valor.length - 1, 1).toUpperCase();
    var numero = valor.substr(1, valor.length - 2);
    var letras = 'TRWAGMYFPDXBNJZSQVHLCKET';

    while (numero[0] == '0') {
        numero = numero.substr(1, numero.length - 1);
    }

    numero = parseInt(numero);

    if (!isNaN(numero)) {
        numero += decode(valor[0], ['X', 0, 'Y', 10000000, 'Z', 20000000]);
        if (valor.substr(valor.length - 1, 1) == letras.substr(numero % 23, 1)) {
            return true;
        }
    }
    return false;
}
function getNewDialogZIndex() {
    var contadorIndex = 0;
    $.each($('.ui-widget-overlay.ui-front'), function (item, value) {
        if (item == 0) {
            contadorIndex = $(value).zIndex();
        } else {
            contadorIndex = $(value).zIndex() >= contadorIndex ?
                    $(value).zIndex() + 1 :
                    contadorIndex;
            contadorIndex = contadorIndex;
        }
    });
    return contadorIndex;
}

(function ($) {
    function CallbackRecursos() {
    }
    $.widget("if.ayuda", {
        options: {
            urlData: '',
            urlResources: ''
        },
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;


            _this.click(function () {
                var popup = null;
                self._show({
                    width: '515px',
                    open: function () {
                        popup = $(this);
                    }
                }, function () {
                    popup.block();
                    $.ajax({
                        url: opc.urlData,
                        dataType: 'jsonp',
                        jsonp: false,
                        jsonpCallback: "CallbackRecursos",
                        data: {
                            idApp: IdApp,
                            idPage: IdPage
                        },
                        success: function (data) {
                            popup.unblock();
                            var playList = new jPlayerPlaylist({
                                jPlayer: "#jquery_jplayer_1",
                                cssSelectorAncestor: "#jp_container_1"
                            }, [], {
                                swfPath: SiteUrl + "Scripts/js",
                                supplied: "webmv, m4v"
                            });
                            var SiteUrlPlayer = opc.urlResources;
                            $.each(data.Data, function (item, value) {
                                playList.add({
                                    title: value.Name,
                                    mp4: SiteUrlPlayer + value.Mp4,
                                    webmv: SiteUrlPlayer + value.Webm
                                });
                            });
                        }
                    });
                });
            });

        },
        _show: function (params, success) {
            var html =
                    '<div id="jp_container_1" class="jp-video jp-video-270p">' +
                    '<div class="jp-type-playlist">' +
                    '<div id="jquery_jplayer_1" class="jp-jplayer"></div>' +
                    '<div class="jp-gui">' +
                    '<div class="jp-video-play">' +
                    '<a href="javascript:;" class="jp-video-play-icon" tabindex="1">play</a>' +
                    '</div>' +
                    '<div class="jp-interface">' +
                    '<div class="jp-progress">' +
                    '<div class="jp-seek-bar">' +
                    '<div class="jp-play-bar"></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="jp-current-time"></div>' +
                    '<div class="jp-duration"></div>' +
                    '<div class="jp-controls-holder">' +
                    '<ul class="jp-controls">' +
                    '<li><a href="javascript:;" class="jp-previous" tabindex="1">previous</a></li>' +
                    '<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>' +
                    '<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>' +
                    '<li><a href="javascript:;" class="jp-next" tabindex="1">next</a></li>' +
                    '<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>' +
                    '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>' +
                    '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>' +
                    '<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>' +
                    '</ul>' +
                    '<div class="jp-volume-bar">' +
                    '<div class="jp-volume-bar-value"></div>' +
                    '</div>' +
                    '<ul class="jp-toggles">' +
                    '<li><a href="javascript:;" class="jp-full-screen" tabindex="1" title="full screen">full screen</a></li>' +
                    '<li><a href="javascript:;" class="jp-restore-screen" tabindex="1" title="restore screen">restore screen</a></li>' +
                    '<li><a href="javascript:;" class="jp-shuffle" tabindex="1" title="shuffle">shuffle</a></li>' +
                    '<li><a href="javascript:;" class="jp-shuffle-off" tabindex="1" title="shuffle off">shuffle off</a></li>' +
                    '<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>' +
                    '<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="jp-title">' +
                    '<ul>' +
                    '<li>Super video</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="jp-playlist">' +
                    '<ul>' +
                    '<li></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="jp-no-solution">' +
                    '<span>Update Required</span>' +
                    'To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            var opc = $.extend({}, $.showPopupPageSetup.defaults, params);
            var popup = $('#dialog-ayuda').length == 0 ? $('<div id="dialog-ayuda" />') : $('#dialog-ayuda');
            popup.empty();
            popup.dialog(opc);
            popup.append(html);
            if (!isNull(success) && $.isFunction(success)) {
                success();
            }
            popup.dialog('option', 'position', {
                my: "center bottom"
            });
            popup.dialog('open');
        }
    });
    /**************************************************************************/
    $.widget("if.validation", {
        options: {
            type: null,
            minvalue: 0,
            maxvalue: 99999,
            minlength: 0,
            maxlength: 99999,
            defaultvalue: '',
            valid: false,
            clsRequired: 'required',
            clsError: 'error',
            restrict: false,
            addOverlabel: false
        },
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.maxlength = opc.maxvalue.toString().length;
            if (!isNull(opc.type)) {
                switch (opc.type) {
                    case 'numeric':
                        self._numeric();
                        break;
                    case 'alphabetic':
                        self._alphabetic();
                        break;
                    case 'email':
                        self._email();
                        break;
                }
            }
        },
        _numeric: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            _this.bind('keyup change', function () {
                if (opc.restrict) {
                    _this.val(numericFilter(_this.val()));
                }
                self._validateLength();
                if (!opc.restrict) {
                    self._setError(numericValid(_this.val()));
                }
                self._validateMaxValue();
            });
            _this.focusout(function () {
                if (isEmpty(_this.val())) {
                    _this.val(opc.minvalue);
                }
            });

            function numericFilter(val) {
                val = $.trim(val);
                if (opc.minvalue == 0 && val.length == 1 && val.toString() == '0') {
                    return val;
                }
                return val.replace(/^[^1-9]*/, '').replace(/^([0-9]{1,3})[^0-9]+/, '$1');
            }

            function numericValid(val) {
                return /^\d+$/.test(val);
            }
        },
        _alphabetic: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            _this.bind('keyup change', function () {
                if (opc.restrict) {
                    _this.val(alphabeticFilter(_this.val()));
                }
                self._validateLength();
                if (!opc.restrict) {
                    self._setError(alphabeticValid(_this.val()));
                }
            });
            _this.focusout(function () {
                if (isEmpty(_this.val())) {
                    _this.val(opc.minvalue);
                }
            });

            function alphabeticFilter(val) {
                return val.replace(/[0-9]/, '');
            }

            function alphabeticValid(val) {
                return !(/[0-9*]/.test(val));
            }
        },
        _email: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            _this.bind('keyup change', function () {
                self._setError(emailValid(_this.val()));
            });

            function emailValid(val) {
                return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(val);
            }
        },
        _setError: function (valid) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            if (valid) {
                _this.removeClass(opc.clsError);
            } else {
                _this.addClass(opc.clsError);
            }
        },
        _validateLength: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var value = _this.val().toString();
            if (value.length > opc.maxlength) {
                value = value.substr(0, opc.maxlength);
                _this.val(value);
            }
        },
        _validateMaxValue: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var value = _this.val();
            if (parseInt(value) > opc.maxvalue) {
                value = opc.maxvalue.toString();
                _this.val(value);
            }
        },
        isValid: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return opc.valid;
        }
    });
    /**************************************************************************/
    $.widget("if.collapsibleContainer", {
        options: {},
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var btn = $('<span class="left ui-button ui-icon ui-icon-triangle-1-e" />');
            _this.addClass('collapsible-target')
                    .hover(function () {
                        $(this).addClass('hover');
                    }, function () {
                        $(this).removeClass('hover');
                    })
                    .prepend(btn)
                    .click(
                            function () {
                                if (btn.hasClass('ui-icon-triangle-1-e')) {
                                    btn.removeClass('ui-icon-triangle-1-e');
                                    btn.addClass('ui-icon-triangle-1-s');
                                } else {
                                    btn.removeClass('ui-icon-triangle-1-s');
                                    btn.addClass('ui-icon-triangle-1-e');
                                }
                                _this.siblings().toggle('slideUp');
                            }
                    );

        }
    });
    /**************************************************************************/
    $.widget("if.multiSelection", {
        options: {},
        _create: function () {
            this.wrapper = $("<span>")
                    .addClass("box-multiselection")
                    .insertAfter(this.element);

            this._createMultiselection();
            this._createShowAllButton();
        },
        _createMultiselection: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
        },
        _createSelectedItem: function (dataMultiselection) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var box = $('<div class="item-selected ui-corner-all" />');
            box.text(dataMultiselection.label);
            box.data('data', dataMultiselection.data);
            box.append(
                    $('<button>&nbsp;</button>')
                    .addClass('btn-delete')
                    .attr("title", "Eliminar")
                    .click(function () {
                        $($(this).parents('.item-selected')[0]).remove();
                    }).button({
                        icons: {
                            primary: "ui-icon-close"
                        },
                        text: false
                    }));
            self.wrapper.prepend(box);
        },
        getSelectedItemData: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return $.map($('.item-selected', self.wrapper), function (item) {
                return $(item).data('data');
            });
        },
        _createShowAllButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            _this.attr("title", "Agregar Items")
                    .appendTo(this.wrapper)
                    .addClass("box-multiselection-toggle")
                    .click(function () {
                        var popup = $('<div class="dialog-multiselection" />');
                        var buttons = {
                            Aceptar: function () {
                                $.each($('ul li', popup), function (item, value) {
                                    if ($(':checkbox', value).prop('checked')) {
                                        self._createSelectedItem($(value).data('data-multiselection'));
                                    }
                                });
                                popup.dialog('close');
                            },
                            Cancelar: function () {
                                popup.dialog('close');
                            }
                        };
                        popup.dialog({
                            modal: true,
                            width: '600px',
                            buttons: buttons
                        });
                        /**************************************************************/
                        var fnLoadItems = function (listaDatos) {
                            var lista = $('<ul />');
                            $.each(listaDatos, function (item, value) {
                                var li = $('<li />');
                                li.append($('<input type="checkbox">'));
                                li.append($('<label />').text(value.label));
                                li.data('data', value.data);
                                li.data('data-multiselection', value);

                                lista.append(li);
                            });
                            $('li', lista).click(function () {
                                if (!$(':checkbox', this).prop('checked'))
                                    $(this).addClass('selected');
                                else
                                    $(this).removeClass('selected');
                                $(':checkbox', this)
                                        .prop('checked', !$(':checkbox', this).prop('checked'));
                            }).hover(function () {
                                $(this).addClass('hover');
                            }, function () {
                                $(this).removeClass('hover');
                            });
                            popup.append(lista);
                        };

                        opc.fnServerData(fnLoadItems, popup);
                        return false;
                    });
        }
    });
    /**************************************************************************/
    $.comboboxSetup = function (opc_user) {
        $.opc_default_combobox = $.extend($.comboboxSetup.defaults, opc_user);
    };
    $.comboboxSetup.defaults = {
        message_loading: 'Cargando...',
        textOverlabel: 'Seleccionar',
        /*
         * Si el termino de busqueda es requerido
         * Caso TRUE : Caja de texto editable y envia el termino de busqueda
         * Caso FALSE : Caja de texto no editable y no envia termino de busqueda
         * osea muestra todos los registros
         */
        textRequired: true,
        forceStrictWords: true,
        url: '',
        fnLoadServerData: null,
        minlength: 3,
        id: null,
        value: null,
        fnSelect: function () {
        },
        fnTextChange: function () {
        },
        fnFocusOut: function () {
        },
        template: '',
        pageable: false,
        buttonPaginationOnlyIcon: false,
        configButtonPrev: null,
        configButtonNext: null,
        pagination: {
            currentPage: 1,
            //totalItems  : 0,
            //itemsPage   : 0,
            nextPage: null,
            prevPage: null,
            totalPages: null,
            btnPrev: null,
            btnNext: null
        },
        tooltip: {
            position: {
                my: 'left bottom',
                at: 'right top'
            }
        },
        buttonSearch: {
            fnClick: null
        },
        toolbar: {
            reset: false,
            edit: false,
            add: false,
            search: false
        }
    };
    $.widget("if.combobox", {
        options: {},
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.tooltip = $.extend({}, $.opc_default_combobox.tooltip, opc.tooltip);
            self.options = opc = $.extend({}, $.opc_default_combobox, opc);
            self.box = $('<div class="box-combobox" />');
            self.enabled = true;
            $(window).resize(function () {
                if (self.input.length && self.input.is(":visible")) {
                    if (opc.template != 'search') {
                        if (self.input.autocomplete("widget") != null &&
                            self.input.autocomplete("widget").length &&
                            self.input.autocomplete("widget").is(":visible")) {
                            self.input.autocomplete("close");
                        }
                    }
                }
            });
            switch (opc.template) {
                case 'search':
                    {
                        self.box.addClass('box-combobox-template-search');
                        var select = this.element.hide(),
                                selected = select.children(":selected"),
                                value = selected.val() ? selected.text() : "";
                        this.id = random();
                        /******************************************************/
                        self.input = $('<input type="text" />');

                        if (isResponsiveDesign()) {
                            self.box.addClass(this.element.attr('class'));
                        } else {
                            self.input.addClass(this.element.attr('class'));
                        }
                        self.input.attr('name', this.element.attr('name'));
                        self.input.attr('id', this.id)
                                .addClass('ui-autocomplete-input')
                                .attr('title', '')
                                .attr('readonly', 'readonly')
                                .insertAfter(select)
                                .val(value)
                                .tooltip(opc.tooltip);

                        self._setTemplate();
                    }
                    break;
                case 'none':
                    {
                        self.loaded = false;
                        self._setItemEmpty();

                        var response = function (listData) {
                            $.each(listData, function (item, value) {
                                self._setItem(value);
                            });
                            self.loaded = true;
                        };
                        _this.click(function () {
                            if (!self.loaded) {
                                opc.fnLoadServerData(response);
                            }
                            return false;
                        });
                        _this.change(function () {
                            var selected = $(':selected', this);
                            if (!isNull(selected.data('ui').item)) {
                                opc.id = selected.data('ui').item.id;
                                opc.value = selected.data('ui').item.value;
                                if (!isNull(selected.data('ui').item.data)) {
                                    opc.data = selected.data('ui').item.data;
                                }
                            } else {
                                opc.id = null;
                                opc.value = null;
                            }
                            opc.fnSelect(null, selected.data('ui'));
                            return false;
                        });
                    }
                    break;
                default:
                    {
                        var select = this.element.hide(),
                                selected = select.children(":selected"),
                                value = selected.val() ? selected.text() : "";
                        this.id = random();
                        /******************************************************/
                        self.input = $('<input type="text" />');

                        if (isResponsiveDesign()) {
                            self.box.addClass(this.element.attr('class'));
                        } else {
                            self.input.addClass(this.element.attr('class'));
                        }
                        self.input.attr('name', this.element.attr('name'));
                        self.input.attr('id', this.id)
                                .addClass(this.element.attr('class'))
                                .attr('title', '')
                                .insertAfter(select)
                                .val(value)
                                .tooltip(opc.tooltip)
                                .keypress(function () {
                                    opc.pagination.currentPage = 1;
                                })
                                .bind('textchange', function (event, previousTex) {
                                    opc.fnTextChange(event, previousTex);
                                })
                                .autocomplete({
                                    delay: opc.delay,
                                    minLength: opc.minlength,
                                    source: function (request, response) {
                                        if (opc.fnLoadServerData == null) {
                                            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                                            response(select.children("option").map(function () {
                                                var text = $(this).text();
                                                if (this.value &&
                                                        (!request.term || matcher.test(text)
                                                                || !opc.forceStrictWords))
                                                    return {
                                                        label: highlightText(text, request.term),
                                                        id: this.value,
                                                        value: text,
                                                        option: this
                                                    };
                                            }));
                                        } else {
                                            if (opc.pageable) {
                                                self._initButtonsPagination();
                                            }
                                            opc.fnLoadServerData(self, request, response);
                                        }
                                    },
                                    open: function (event, ui) {
                                        self.input.autocomplete("widget").css('width', self.box.innerWidth());
                                        if (!self.input.closest('.ui-dialog').length) {
                                            self.input.autocomplete("widget").css('left', self.box.offset().left);
                                        } else {
                                            //Si esta en un dialog
                                            var posleft = parseFloat(self.box.offset().left) - parseFloat(self.input.closest('.ui-dialog').offset().left) - 1;
                                            self.input.autocomplete("widget").css('left', posleft);
                                        }
                                    },
                                    search: function (event, ui) {
                                        if (event.keyCode === 35 || event.keyCode === 36) {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }
                                    },
                                    select: function (event, ui) {
                                        if (ui.item.option != null) {
                                            ui.item.option.selected = true;
                                            self._trigger("selected", event, {
                                                item: ui.item.option
                                            });
                                            opc.id = ui.item.id;
                                            opc.value = ui.item.value;
                                            if (ui.item.data) {
                                                opc.data = ui.item.data;
                                            }
                                            self.input.val(opc.value);
                                            opc.fnSelect(event, ui);
                                            if (event.originalEvent.type == 'menuselected') {
                                                $(self.input).keyup();
                                            }
                                        }
                                    },
                                    change: function (event, ui) {
                                        if ($(event.target).val() === ui.value) {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        } else {
                                            if (!ui.item) {
                                                var matcher = new RegExp("^" +
                                                        $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                                                        valid = false;
                                                select.children("option").each(function () {
                                                    if ($(this).text().match(matcher)) {
                                                        this.selected = valid = true;
                                                        return false;
                                                    }
                                                });
                                                if (opc.forceStrictWords && !valid) {
                                                    // remove invalid value, as it didn't match anything
                                                    $(this).val("");
                                                    select.val("");
                                                    self.input.data("uiAutocomplete").term = "";
                                                    self.input.trigger('focusout');
                                                    return false;
                                                }
                                            }
                                        }
                                    }
                                });
                        //Validacion de texto requerido
                        if (opc.textRequired === false) {
                            self.input.attr('readonly', 'readonly');
                        }
                        /******************************************************/
                        self.input.data("uiAutocomplete")._renderMenu = function (ul, items) {
                            var _self = this;
                            $(ul).css('overflow-y', 'hidden');
                            $.each(items, function (index, item) {
                                _self._renderItem(ul, item);
                            });
                            /**************************************************/
                            if (opc.pageable && opc.fnLoadServerData != null) {
                                var item_pageable = $('<li />')
                                        .addClass('ui-helper-clearfix item-pageable ui-menu-item')
                                        .data("ui-autocomplete-item", {});

                                opc.pagination.btnPrev
                                        .appendTo(item_pageable)
                                        .click(
                                                function () {
                                                    opc.pagination.nextPage = self.getPrevPage();
                                                    _self.element.autocomplete("option", "minLength", 0);
                                                    if (opc.textRequired) {
                                                        self.input.autocomplete("search");
                                                    } else {
                                                        self.input.autocomplete("search", "");
                                                    }
                                                    _self.element
                                                            .autocomplete("option", "minLength", opc.minlength);
                                                    _self.element.focus();
                                                    return false;
                                                });
                                opc.pagination.btnNext
                                        .appendTo(item_pageable)
                                        .click(
                                                function () {
                                                    opc.pagination.nextPage = self.getNextPage();
                                                    _self.element.autocomplete("option", "minLength", 0);
                                                    if (opc.textRequired) {
                                                        self.input.autocomplete("search");
                                                    } else {
                                                        self.input.autocomplete("search", "");
                                                    }
                                                    _self.element
                                                            .autocomplete("option", "minLength", opc.minlength);
                                                    _self.element.focus();
                                                    return false;
                                                });

                                ul.append(item_pageable);
                                if (opc.pagination.totalPages <= 1) {
                                    item_pageable.hide();
                                }
                            }
                            /**************************************************/
                        };

                        self.input.data("uiAutocomplete")._renderItem = function (ul, item) {
                            return $("<li></li>")
                                    .data("ui-autocomplete-item", item)
                                    .append("<a>" + item.label + "</a>")
                                    .appendTo(ul);
                        };
                        /******************************************************/
                        if ($('option', select).length > 0) {
                            opc.id = $('option:selected', select).val();
                            opc.value = $('option:selected', select).text();
                        }
                    }
                    self._setTemplate();
                    self.input.off('focusout');
                    self.input.on('focusout', function () {
                        if ($(this).val() === '') {
                            opc.fnFocusOut();
                        }
                    });
            }
        },
        /**
         * Habilita y desabilita los botones de navegacion de acuerdo a la
         * pagina en la que se encuentra
         *
         */
        loadPagination: function (pagination) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (opc.pageable === false) {
                return false;
            }
            if (pagination) {
                if (!isNull(pagination.totalPages)) {
                    opc.pagination.totalPages = pagination.totalPages;
                }

            }

            if (opc.pagination.totalPages > 0) {
                if (opc.pagination.currentPage > 1) {
                    opc.pagination.btnPrev.button('option', 'disabled', false);
                } else {
                    opc.pagination.btnPrev.button('option', 'disabled', true);
                }
                if (opc.pagination.currentPage == opc.pagination.totalPages) {
                    opc.pagination.btnNext.button('option', 'disabled', true);
                } else {
                    opc.pagination.btnNext.button('option', 'disabled', false);
                }
            }
        },
        getCurrentPage: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return opc.pagination.currentPage;
        },
        getNextPage: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.pagination.currentPage += 1;
            return opc.pagination.currentPage;
        },
        getPrevPage: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var prev = opc.pagination.currentPage;
            if (opc.pagination.currentPage > 1) {
                opc.pagination.currentPage -= 1;
            }
            return prev;
        },
        /**
         * Inicializa los botones de navegacion SIGUIENTE | ANTERIOR
         *
         */
        _initButtonsPagination: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var opcPrev = {
                disabled: true,
                label: 'Anterior',
                text: false,
                icons: {
                    primary: "ui-icon-triangle-1-w"
                }
            };
            var opcNext = {
                disabled: true,
                label: 'Siguiente',
                text: false,
                icons: {
                    primary: "ui-icon-triangle-1-e"
                }
            };
            if (!isNull(opc.configButtonPrev) && $.isPlainObject(opc.configButtonPrev)) {
                opcPrev = $.extend({}, opcPrev, opc.configButtonPrev);
            }
            if (!isNull(opc.configButtonNext) && $.isPlainObject(opc.configButtonNext)) {
                opcNext = $.extend({}, opcNext, opc.configButtonNext);
            }

            opc.pagination.btnPrev = $('<button class="prev" />').text('Anterior');
            opc.pagination.btnPrev.button(opcPrev);

            opc.pagination.btnNext = $('<button class="next" />').text('Siguiente');
            opc.pagination.btnNext.button(opcNext);
        },
        /**
         * Activa un tipo de vista para el elemento de autocompletado
         * CLASSIC: Muestra un combobox, con bordes cuadrados
         * DEFAULT:
         * NONE:
         */
        _setTemplate: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc = $.extend({}, $.opc_default_combobox, opc);
            switch (opc.template) {
                case 'autocomplete':
                    self.box.addClass('box-combobox-searcher');
                    self.box.insertAfter(this.element);
                    self.box.append(self.input);
                    if (!isEmpty(opc.textOverlabel)) {
                        var overlabel =
                                $('<label for="' + self.id + '">' + opc.textOverlabel + '</label>');
                        self.box.append(overlabel);
                        overlabel.overlabel();
                    }
                    /**********************************************************/
                    self._addToolbar();
                    break;
                case 'search':
                    self.box.addClass('box-combobox-searcher');
                    self.box.insertAfter(this.element);
                    self.box.append(self.input);
                    if (!isEmpty(opc.textOverlabel)) {
                        var overlabel =
                                $('<label for="' + self.id + '">' + opc.textOverlabel + '</label>');
                        self.box.append(overlabel);
                        overlabel.overlabel();
                    }
                    /**********************************************************/
                    self._addToolbar();
                    break;
                case 'none':
                    break;
                default:

                    self.button = $('<button type="button" />')
                            .addClass('btn-combobox')
                            .attr("tabIndex", -1)
                            .attr("title", "Mostrar todos los resultados")
                            .insertAfter(self.input)
                            .button({
                                icons: {
                                    primary: 'ui-icon-triangle-1-s'
                                },
                                text: false
                            })
                            .removeClass('ui-corner-all')
                            .addClass('ui-button-icon')
                            .click(function () {
                                        // close if already visible
                                        if (self.input.autocomplete("widget").is(":visible")) {
                                            self.input.autocomplete("close");
                                            return;
                                        }

                                        // work around a bug (likely same cause as #5265)
                                        $(this).blur();
                                        self.input.focus();
                                        // pass empty string as value to search for, displaying all results
                                        opc.pagination.currentPage = 1;
                                        self.input.autocomplete("option", "minLength", 0);
                                        if (opc.textRequired) {
                                            self.input.autocomplete("search");
                                        } else {
                                            self.input.autocomplete("search", "");
                                        }

                                        self.input
                                                .autocomplete("option", "minLength", opc.minlength)
                                                .tooltip('close')
                                                .attr('title', '');
                                        self.input.autocomplete("widget").css('width', self.box.innerWidth());
                                    });
                    self.box.insertAfter(this.element);
                    self.box.append(self.input, self.button);
                    if (!isEmpty(opc.textOverlabel)) {
                        var overlabel =
                                $('<label for="' + self.id + '">' + opc.textOverlabel + '</label>');
                        self.box.append(overlabel);
                        overlabel.overlabel();
                    }
                    /**********************************************************/
                    //ADICION DE BOTON DE BUSQUEDA O LUPITA
                    if (!isNull(opc.buttonSearch.fnClick)) {
                        var buttonSearch = $('<button />')
                                .addClass('btn-combobox-search')
                                .button({
                                    icons: {
                                        primary: 'ui-icon-search'
                                    },
                                    text: false
                                })
                                .removeClass("ui-corner-all");
                        buttonSearch.click(opc.buttonSearch.fnClick);
                        self.box.append(buttonSearch);
                    }
                    self._addToolbar();
            }
        },
        _addToolbar: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            self.toolbarWrapper = $('<div />')
                    .addClass('box-combobox-toolbar')
                    .hide()
                    .appendTo(self.box);

            self.box.hover(
                    function () {
                        if (self.enabled) {
                            if (!isNull(self.buttonEdit)) {
                                if (isNull(self.getId())) {
                                    self.buttonEdit.hide();
                                } else {
                                    self.buttonEdit.show();
                                }
                            }
                            self.toolbarWrapper.css('left', self.box.outerWidth() - 2);
                            self.toolbarWrapper.show();
                            var widthToolbar = 0;
                            $.each($('>*', self.toolbarWrapper), function (item, value) {
                                if ($(value).is(':visible')) {
                                    widthToolbar += $(value).width();
                                }
                            });
                            self.toolbarWrapper.width(widthToolbar);
                        }
                    },
                    function () {
                        if (self.enabled) {
                            self.toolbarWrapper.hide();
                        }
                    });

            if (opc.toolbar.search) {
                self._addButtonSearch();
            }
            if (opc.toolbar.reset) {
                self._addButtonClean();
            }
            if (opc.toolbar.add) {
                self._addButtonAdd();
            }
            if (opc.toolbar.edit) {
                self._addButtonEdit();
            }
        },
        _addButtonClean: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            self.buttonClean = $('<span />')
                    .addClass('btn-combobox-clean')
                    .addClass('ui-icon ui-icon-close')
                    .attr('title', 'Limpiar')
                    .appendTo(self.toolbarWrapper)
                    .click(function () {
                        self.reset();
                        if (self.buttonEdit != null) {
                            self.buttonEdit.hide();
                        }
                        
                        self.toolbarWrapper.css('left', self.box.outerWidth() - 2);
                        self.toolbarWrapper.show();
                        var widthToolbar = 0;
                        $.each($('>*', self.toolbarWrapper), function (item, value) {
                            if ($(value).is(':visible')) {
                                widthToolbar += $(value).width();
                            }
                        });
                        self.toolbarWrapper.width(widthToolbar);
                    })
                    .click($.isFunction(opc.toolbar.reset) ? opc.toolbar.reset : null);
        },
        removeToolClean: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (!isNull(self.buttonClean)) {
                self.buttonClean.remove();
            }
        },
        _addButtonAdd: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            self.buttonAdd = $('<span />')
                    .addClass('btn-combobox-add')
                    .addClass('ui-icon ui-icon-plus')
                    .attr('title', 'Adicionar')
                    .appendTo(self.toolbarWrapper)
                    .click($.isFunction(opc.toolbar.add) ? opc.toolbar.add : null);
        },
        removeToolAdd: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (!isNull(self.buttonAdd)) {
                self.buttonAdd.remove();
            }
        },
        _addButtonEdit: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            self.buttonEdit = $('<span />')
                    .addClass('btn-combobox-edit')
                    .addClass('ui-icon ui-icon-pencil')
                    .attr('title', 'Editar')
                    .appendTo(self.toolbarWrapper)
                    .click($.isFunction(opc.toolbar.edit) ? opc.toolbar.edit : null);
        },
        removeToolEdit: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (!isNull(self.buttonEdit)) {
                self.buttonEdit.remove();
            }
        },
        _addButtonSearch: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            self.buttonSearch = $('<span />')
                    .addClass('btn-combobox-search')
                    .addClass('ui-icon ui-icon-search')
                    .attr('title', 'Buscar')
                    .appendTo(self.toolbarWrapper)
                    .click($.isFunction(opc.toolbar.search) ? opc.toolbar.search : null);
        },
        removeToolSearch: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (!isNull(self.buttonSearch)) {
                self.buttonSearch.remove();
            }
        },
        block: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
        },
        unBlock: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

        },
        getId: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var id = null;

            switch (opc.template) {
                case 'search':
                    if (self.input.val().isEmpty())
                        opc.id = null;
                    id = opc.id;
                    break;
                case 'none':
                    id = isNull($('option:selected', _this).data('ui').item) ?
                            null :
                            $('option:selected', _this).data('ui').item.id;
                    break;
                default:
                    if (self.input.val().isEmpty())
                        opc.id = null;
                    id = opc.id;
                    break;
            }
            return id;
        },
        setData: function (data) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.data = data;
        },
        getData: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var data = null;

            switch (opc.template) {
                case 'search':
                    if (isEmpty(self.input.val()) || !opc.data) {
                        opc.data = null;
                    }
                    data = opc.data;
                    break;
                case 'none':
                    data = isNull($('option:selected', _this).data('ui').item) ?
                            null :
                            $('option:selected', _this).data('ui').item.data;
                    break;
                default:
                    if (isEmpty(self.input.val()) || !opc.data) {
                        opc.data = null;
                    }
                    data = opc.data;
                    break;
            }
            return data;
        },
        isSelected: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var selected = null;

            switch (opc.template) {
                case 'search':
                    break;
                case 'none':
                    break;
                default:
                    selected = !isNull(self.getId());
                    break;
            }

            return selected;
        },
        getValue: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var value = null;

            switch (opc.template) {
                case 'search':
                    if (self.input.val().isEmpty())
                        opc.value = null;
                    value = opc.value;
                    break;
                case 'none':
                    value = isNull($('option:selected', _this).data('ui').item) ?
                            null :
                            $('option:selected', _this).data('ui').item.value;
                    break;
                default:
                    if (self.input.val().isEmpty())
                        opc.value = null;
                    value = opc.value;
                    break;
            }
            return value;
        },
        getText: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var text = null;

            switch (opc.template) {
                case 'search':
                    break;
                case 'none':
                    break;
                default:
                    text = $(self.input).val();
                    break;
            }
            return text;
        },
        setId: function (id) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            switch (opc.template) {
                case 'search':
                    if (!isNull(id))
                        opc.id = id;
                    break;
                case 'none':
                    break;
                default:
                    if (!isNull(id))
                        opc.id = id;
                    break;
            }
        },
        setValue: function (value) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            switch (opc.template) {
                case 'search':
                    if (value) {
                        $(self.input).val(value);
                        opc.value = value;
                        $('.overlabel-apply', self.box).hide();
                    }
                    break;
                case 'none':
                    break;
                default:
                    if (value) {
                        $(self.input).val(value);
                        opc.value = value;
                        $('.overlabel-apply', self.box).hide();
                    }
                    break;
            }
        },
        setItem: function (item) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            switch (opc.template) {
                case 'search':
                    break;
                case 'none':
                    if (!isNull(item.id) && !isNull(item.value)) {
                        var option = $('<option />')
                                .text(item.value)
                                .attr('value', item.id);
                        option.data('ui', {
                            item: item
                        });
                        _this.append(option);
                        option.attr('selected', 'selected');
                        opc.id = item.id;
                        opc.value = item.value;
                    }
                    break;
                default:
                    break;
            }
        },
        _setItem: function (item) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            switch (opc.template) {
                case 'search':
                    break;
                case 'none':
                    if (!isNull(item.id) && !isNull(item.value)) {
                        var option = $('<option />')
                                .text(item.value)
                                .attr('value', item.id);
                        option.data('ui', {
                            item: item
                        });
                        _this.append(option);
                    }
                    break;
                default:
                    break;
            }
        },
        reset: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.id = null;
            opc.value = null;
            opc.data = null;

            switch (opc.template) {
                case 'search':
                    self.input.val('').blur();
                    self.box.show().siblings('.combobox-text-readonly').remove();
                    $('html').blur();
                    break;
                case 'none':
                    self.loaded = false;
                    _this.empty();
                    self._setItemEmpty();
                    _this.val(-1);
                    break;
                default:
                    self.input.val('').blur();
                    self.box.show().siblings('.combobox-text-readonly').remove();
                    $('html').blur();
                    break;
            }
        },
        reload: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            switch (opc.template) {
                case 'search':
                    break;
                case 'none':
                    self.loaded = true;
                    _this.empty();
                    self._setItemEmpty();

                    var response = function (listData) {
                        $.each(listData, function (item, value) {
                            self._setItem(value);
                        });
                        self.loaded = true;
                    };
                    opc.fnLoadServerData(response);
                    break;
                default:
                    break;
            }
        },
        _setItemEmpty: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var option = $('<option />')
                    .text(opc.textOverlabel)
                    .attr('value', -1)
                    .data('ui', {
                        item: null
                    });
            _this.append(option);
        },
        hide: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            $(self.box).hide();
        },
        readonly: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var textReadonly =
                    '<span class="combobox-text-readonly">' + self.getValue() + '</span>';

            switch (opc.template) {
                case 'search':
                    break;
                case 'none':
                    _this.after(textReadonly);
                    _this.hide();
                    break;
                default:
                    self.box.after(textReadonly);
                    self.box.hide();
                    break;
            }
        },
        disable: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            switch (opc.template) {
                case 'search':
                    break;
                case 'none':
                    break;
                default:
                    self.input.disable();
                    self.button.button('disable');
                    break;
            }
            self.enabled = false;
        },
        enable: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            switch (opc.template) {
                case 'search':
                    break;
                case 'none':
                    break;
                default:
                    self.input.enable();
                    self.button.button('enable');
                    break;
            }
            self.enabled = true;
        },
        destroy: function () {
            this.box.remove();
            this.element.show();
            $.Widget.prototype.destroy.call(this);
        }
    });

    $.tableSetup = function (opc_user) {
        $.opc_default_table = $.extend($.tableSetup.defaults, opc_user);
    };
    $.tableSetup.defaults = {
        "sPaginationType": "full_numbers",
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": false,
        "oLanguage": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sInfo": "Mostrando desde _START_ hasta _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando desde 0 hasta 0 de 0 registros",
            "sInfoFiltered": "(filtrado de _MAX_ registros en total)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "Primero",
                "sPrevious": "Anterior",
                "sNext": "Siguiente",
                "sLast": "&Uacute;ltimo"
            }
        }
    };
    $.widget("if.table", {
        options: {
            oTable: null,
            selectable: true,
            multi_selectable: false,
            btn_delete: null,
            btn_addrow: null,
            fnAfterAddRow: function () {
            },
            value_newrow: null,
            cols_editable: null,
            cols_novisible: null,
            value_selectedrow: null,
            no_deletable_rows: [],
            data: []
        },
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            self._loadTabla();
        },
        _loadTabla: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            var paramsDatatable = $.extend({}, $.opc_default_table, opc);
            
            paramsDatatable.createdRow = function ( row, data, index ){
                $('td:first input:checkbox', row).click(function (event) {   
                    //controlar los tres estados del checkbox del checkbox maestro de la columna
                    var rows = self.getRows();
                    var checkedCount = $('td:first input:checkbox:checked', rows).length;
                    var checkedHeader = $('thead tr th:first input:checkbox', _this);
                    if(!isNull(checkedHeader)){
                        if(checkedCount == 0){
                            checkedHeader.prop('indeterminate', false);
                            checkedHeader.prop('checked', false);
                        }else{
                            if(rows.length == checkedCount){
                              checkedHeader.prop('indeterminate', false);
                              checkedHeader.prop('checked', true);  
                            }
                            else{
                              checkedHeader.prop('indeterminate', true);
                            }
                        }
                    }

                    //Funcionalidad click del checkbox
                    var checked = $(this).prop('checked');
                    if(checked){
                        $(this).prop('checked', true);  
                    }else{
                        $(this).prop('checked', false);
                    }
                    $(this).trigger('customclick');
                    //Interrumpir la propagacion del evento
                    event.stopPropagation();
                });

                if($('thead tr th:first input:checkbox', _this).length > 0){
                    $('thead tr th:first input:checkbox', _this).prop('indeterminate', false);
                    $('thead tr th:first input:checkbox', _this).prop('checked', false);
                }

                $('td:first',row).addClass('td-details').click(function(){
                    if($(_this).hasClass('collapsed')){
                        setTimeout(function(){
                            var rowChild = $(row).next();
                            if(rowChild.hasClass('child')){
                                rowChild.data('data', $(row).data('data'));
                                var fnRowCallback = opc.oTable.table('option', 'fnRowCallback');
                                fnRowCallback(rowChild, data, index, index);
                            }
                        }, 500);
                    }
                });
            };

            opc.oTable = $(_this).dataTable(paramsDatatable);

            // Renderizacion cuando tabla es responsive
            if (opc.fnResponsive) {
                $(window).on("resize", function () {
                    if ($(window).width() > 776) {
                        $.each(opc.oTable.fnGetNodes(), function (index, value) {
                            opc.fnResponsive(value, index);
                        });
                        $(_this).DataTable().responsive.recalc();
                    }
                });
            }
            if (opc.selectable) {
                self._loadSelection();
            }
            if (opc.multi_selectable) {
                self._loadMultiSelection();
            }
            // Agrega nueva fila
            $(opc.btn_addrow).click(function () {
                self._addRow();
                opc.fnAfterAddRow($(opc.oTable.fnGetNodes()).last());
                return false;
            });
            self._setEditable();
            self._hideCols();

        },
        _setEditable: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            if ((opc.cols_editable != null) && $.isArray(opc.cols_editable)) {
                $.each(opc.cols_editable, function (index, value) {
                    self._setColEditable($('td:eq(' + value + ')', opc.oTable.fnGetNodes()));
                });
            }
        },
        _setColEditable: function (elem) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            $(elem).editable(
                    function (value, settings) {
                        return value;
                    }, {
                        tooltip: 'Click para editar',
                        placeholder: '',
                        type: 'text'
                    }
            );
        },
        _loadSelection: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            /* Add a click handler to the rows - this could be used as a callback */
            $(opc.oTable).on('click', 'tbody tr', function (event) {
                if (!opc.multi_selectable) {
                    $(opc.oTable.fnSettings().aoData).each(function () {
                        $(this.nTr).removeClass('row_selected');
                    });
                }
                if ($(event.target.parentNode)[0].tagName.toLowerCase() == 'tr') {
                    $(event.target.parentNode).toggleClass('row_selected');
                } else {
                    $($(event.target.parentNode).parents('tr')[0]).toggleClass('row_selected');
                }
            });

            $(opc.oTable).on('click', 'tbody tr', function () {
                /* Get the position of the current data from the node */
                var aPos = opc.oTable.fnGetPosition(this);
                /* Get the data array for this row */
                var aData = opc.oTable.fnGetData(this);
                opc.value_selectedrow = aData;
                return aData;
            });

            /* Add a click handler for the delete row */
            $(opc.btn_delete).click(function () {
                var anSelected = self._fnGetSelected();
                if (objectCount(anSelected)) {
                    if ($.inArray($(anSelected).index(), opc.no_deletable_rows) == -1) {
                        opc.oTable.fnDeleteRow(anSelected[0]);
                    }
                }
                return false;
            });
        },
        _loadMultiSelection: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            $('tbody tr', opc.oTable).on('click', function () {
                $(this).toggleClass('row_selected');
            });
            opc.multi_selectable = true;
        },
        setMultiSelection: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            $('tbody', opc.oTable).unbind('click');
            $('tbody tr', opc.oTable).off('click');
            self._loadMultiSelection();
        },
        getRows: function (posRow) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (isNull(posRow)) {
                return opc.oTable.fnGetNodes();
            }
            return opc.oTable.fnGetNodes(posRow);
        },
        _fnGetSelected: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            var aReturn = [];
            var aTrs = opc.oTable.fnGetNodes();

            for (var i = 0; i < aTrs.length; i++) {
                if ($(aTrs[i]).hasClass('row_selected')) {
                    aReturn.push(aTrs[i]);
                }
            }
            return aReturn;
        },
        _addRow: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (opc.value_newrow != null && $.isArray(opc.value_newrow)) {
                opc.oTable.fnAddData(opc.value_newrow);
                self._setEditable();
            }
        },
        addRowBasic: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            self._addRow();
        },
        addRow: function (values, data) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            if (values != null && $.isArray(values) && (values.length > 0)) {
                var rowAdd = opc.oTable.fnAddData(values, true);
                if (!isNull(data)) {
                    $(opc.oTable.fnSettings().aoData[rowAdd[0]].nTr).data('data', data);
                }
                self._setEditable();
            }
        },
        empty: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.oTable.fnClearTable(false);
        },
        isSelectedRow: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (self._fnGetSelected().length > 0) {
                return true;
            }
            return false;
        },
        getSelectedRow: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return self._fnGetSelected();
        },
        getSelectedRowData: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return $(self._fnGetSelected()).data('data');
        },
        getSelectedRowValues: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return opc.value_selectedrow;
        },
        getValues: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return opc.oTable.fnGetData();
        },
        selected: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return self._fnGetSelected();
        },
        _hideCols: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (!isNull(opc.cols_novisible) && $.isArray(opc.cols_novisible)) {
                $.each(opc.cols_novisible, function (index, value) {
                    opc.oTable.fnSetColumnVis(value);
                });
            }
        },
        update: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.oTable.fnDraw();
        },
        setData: function (data) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            $.each(opc.oTable.fnGetNodes(), function (index, value) {
                $(value).data('data', data[index]);
            });
        },
        setClass: function (list_classes) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            if (list_classes.length > 0) {
                $.each(opc.oTable.fnGetNodes(), function (index, value) {
                    $(value).addClass(isNull(list_classes[index]) ? '' : list_classes[index]);
                });
            }
        },
        setSettingsDataTable: function (params) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var oDefault = opc.oTable.fnSettings();
            oDefault.aoColumns = [{
                bSortable: false
            }, {}, {}, {}, {}, {
                sClass: 'align-center',
                bSortable: false
            }];
            self.update();
        },
        getSettingsDataTable: function (params) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return opc.oTable.fnSettings();
        },
        getDataTable: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return opc.oTable;
        },
        setColumnVis: function (col, vis) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (vis) {
                opc.oTable.fnSetColumnVis(col, vis, false);
                $(opc.oTable.fnSettings().aoColumns[col].nTh).removeClass('never');
                opc.oTable.fnSettings().aoColumns[col].sClass = "";
                opc.oTable.fnSettings().aoColumns[col].className = "";

            } else {
                opc.oTable.fnSetColumnVis(col, vis, false);
                $(opc.oTable.fnSettings().aoColumns[col].nTh).addClass('never');
                opc.oTable.fnSettings().aoColumns[col].sClass = "never";
                opc.oTable.fnSettings().aoColumns[col].className = "never";
            }
            $(_this).DataTable().responsive.rebuild();
            $(_this).DataTable().responsive.recalc();
        },
        removeSelectedRows: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var anSelected = self._fnGetSelected();
            if (objectCount(anSelected)) {
                if ($.inArray($(anSelected).index(), opc.no_deletable_rows) == -1) {
                    opc.oTable.fnDeleteRow(anSelected[0]);
                }
            }
        },
        /**
         * Bloquea la envoltura de una tabla
         */
        block: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            if ($.isFunction($.blockUI)) {
                $('#' + $(_this).attr('id') + '_wrapper').block();
            } else {
                alert('table: La funcción de bloqueo no esta definida');
            }
        },
        /**
         * Desbloquea la envoltura de una tabla
         */
        unblock: function (elemTable) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            if ($.isFunction($.blockUI)) {
                $('#' + $(_this).attr('id') + '_wrapper').unblock();
            } else {
                alert('table: La funcción de bloqueo no esta definida');
            }

        }
    });

    /**
     * Menu contextual
     *
     */
    $.widget("if.contextMenu", {
        options: {
            useRightClick: false,
            fnLoadServerData: null,
            fnClick: null,
            style: {
                useDefault: true
            }
        },
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            if (opc.style.useDefault === true) {
                _this.addClass('context-menu-target');
            }
            if ($('body .context-menu-wrapper').length == 0) {
                self.container = $('<div class="context-menu-wrapper" />');
                self.menu = $('<ul class="context-menu" />');
                self.container.css({
                    display: 'none',
                    position: 'absolute'
                });
                self.container.append(self.menu);
                self.container.appendTo('body');
            } else {
                self.container = $('body .context-menu-wrapper');
                self.menu = $('body .context-menu-wrapper .context-menu');
            }

            if (opc.useRightClick) {
                _this.contextmenu(function () {
                    return false;
                });
                _this.mousedown(function (e) {
                    if (e.button == 2) {
                        self.hide();
                        if (opc.fnLoadServerData) {
                            var callbackSuccess = function (tempData) {
                                self._callbackSuccess(tempData, e);
                            };
                            opc.fnLoadServerData(callbackSuccess);
                        } else {
                            self.show(e);
                        }
                    }
                });
            } else {
                _this.click(function (e) {
                    self.hide();
                    if (opc.fnLoadServerData) {
                        var callbackSuccess = function (tempData) {
                            self._callbackSuccess(tempData, e);
                        };
                        opc.fnLoadServerData(callbackSuccess);
                    } else {
                        self.show(e);
                    }
                    return false;
                });
            }

            $('body').click(function () {
                self.hide();
            });
            $(window).on('resize', function () {
                if (self.container.is(':visible')) {
                    self.hide();
                }
            });
        },
        _callbackSuccess: function (listElements, e) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            self.menu.empty();
            $.each(listElements, function (item, value) {
                var li = $('<li />');
                if (value.separator === true) {
                    li.addClass('item-separator');
                } else {
                    var link = $('<a />')
                            .text(value.value)
                        .toggleClass(value.sClass);
                    if (!isNull(value.fnClick)) {
                        link.contextmenu(function (event) {
                            e.stopPropagation();
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            return false;
                        });
                        link.css('cursor', 'pointer');
                    } else {
                        link.attr('href', value.url);
                    }
                    li.data('data', value.data);
                    li.append(link);

                    li.click(function () {
                        self.hide();
                    });
                    if (isNull(value.fnClick)) {
                        li.click(opc.fnClick);
                    } else {
                        li.click(value.fnClick);
                    }
                }
                li.appendTo(self.menu);
            });
            self.show(e);
        },
        show: function (e) {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            var win = $(window);
            var mWidth = self.container.outerWidth(true),
                    mHeight = self.container.outerHeight(true),
                    xPos = ((e.pageX - win.scrollLeft()) + mWidth < win.width()) ?
                    e.pageX :
                    e.pageX - mWidth,
                    yPos = ((e.pageY - win.scrollTop()) + mHeight < win.height()) ?
                    e.pageY :
                    e.pageY - mHeight;

            self.container.css({
                display: 'block',
                top: yPos + 3 + 'px',
                left: xPos + 3 + 'px',
                zIndex: 1000
            });
        },
        hide: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            $('.context-menu-wrapper').hide();
        }
    });
    /**************************************************************************/
    $.widget("if.compFileupload", {
        options: {
            params: {},
            labels: {
                btnUpload: 'Add file...',
                btnDelete: 'Delete',
                lbFileSize: 'Tamaño máximo: ',
                lbFileType: 'Las extensiones válidas son: '
            },
            fnSuccess: function () {
            },
            fnDelete: function () {
            },
            fnError: function () {
            },
            fnAdd: function () {
            },
            fnSend: function () {
            },
            bLegent: false,
            sFileTypes: 'doc|docx|pdf|txt',
            iFileSize: 5000000, // convertido a MB,
            iLimitMultiFileUploads: 1,
            counterFiles: 0,
            xhrFiles: [],
            bEditable: false
        },
        _create: function () {

            var self = this,
                    _this = self.element,
                    opc = self.options;
            self.options.xhrFiles = [];
            self.options.counterFiles = 0;
            self.errors = [];
            self._constructForm();
            _this.find(':file')
                    .click(function () {
                        if (self.btnUpload.hasClass('disabled')) {
                            return false;
                        }
                    })
                    .val('');
            var file = _this.fileupload({
                limitMultiFileUploads: opc.iLimitMultiFileUploads,
                pasteZone: $(document),
                dropZone: $(document),
                singleFileUploads: true,
                recalculateProgress: true,
                send: function (e, data) {
                    self._initProgress();
                    self.progressbar.fadeIn();
                    if ($.browser.msie) {
                        self.progressbar.progressbar('value', 98);
                    }
                    return opc.fnSend(e, data);
                },
                progress: function (e, data) {

                    var progress = parseInt((data.loaded / data.total * 100), 10);
                    if (progress > 2 || progress <= 100) {
                        progress = progress - 2;
                    }
                    self.progressbar.progressbar("value", progress);
                    self.progressText.text(progress.toString() + '%');
                },
                done: function (e, data) {
                    if (isNull(data.result)) {
                        self._initProgress();
                        self.btnUpload.removeClass('disabled');
                        self.options.counterFiles--;
                        opc.fnError(e, data);
                    } else {
                        var normalizeResponse = function () {
                            return $.browser.msie && parseInt($.browser.version)
                                    < 10 ?
                                    $.parseJSON($(data.result[0].body.innerHTML)
                                            .text()) : data.result;
                        };
                        var callbackSuccess = function (tempData) {
                            self._callbackSuccess(tempData);
                        };
                        self._finishProgress();
                        self.btnUpload.addClass('disable');
                        self._removeXhrDone();
                        var succes = opc.fnSuccess(normalizeResponse(), callbackSuccess);
                        opc.Cargado = true;
                        if (!isNull(succes) && !succes) {
                            self._initProgress();
                            self.btnUpload.removeClass('disabled');
                            self.options.counterFiles--;
                        }
                    }
                },
                add: function (e, data) {
                    var maxLimitFiles = file.fileupload('option', 'limitMultiFileUploads');
                    var fileCount = data.originalFiles.length;
                    self.options.counterFiles++;
                    if ((self.options.counterFiles <= maxLimitFiles) && (fileCount <= maxLimitFiles)) {
                        if (self.options.counterFiles == maxLimitFiles) {
                            self.btnUpload.addClass('disabled');
                        } else {
                            self.btnUpload.removeClass('disabled');
                        }

                        var fnAdd = opc.fnAdd(e, data);
                        if (fnAdd || fnAdd === undefined) {
                            var submit = data.submit();
                            self.options.xhrFiles.push(data.submit());
                            self.btnUpload.find('input:file').attr('title', data.files[0].name);
                        } else {
                            self.options.counterFiles--;
                            self.btnUpload.removeClass('disabled');
                        }
                    } else {
                        self.options.counterFiles--;
                        self.btnUpload.removeClass('disabled');
                        return false;
                    }
                }
            });
            _this.bind('fileuploadfail', function (e, data) {
                self.btnUpload.find('input:file').attr('title', 'Seleccionar');
                self.btnUpload.removeClass('disabled');
                self.options.counterFiles--;
                self._initProgress();
				opc.fnError(e, data);
            });
            $(document).on('drop dragover', function (e, data) {
                e.preventDefault();
                e.originalEvent.dataTransfer.dropEffect = 'none';
            });
        },
        _finishProgress: function () {
            var self = this;
            self.progressbar.progressbar('value', 100);
            self.progressText.text("100%");
            self.progressbar.hide();
        },
        _initProgress: function () {
            var self = this;
            self.progressbar.progressbar('value', 0);
            self.progressText.text("0%");
            self.progressbar.hide();
        },
        _constructForm: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (!isNull(opc.params)) {
                $.each(opc.params, function (item, value) {
                    $('<input type="hidden" />')
                            .attr('name', item)
                            .val(value)
                            .appendTo(_this);
                });
            }
            _this.attr('method', 'post').attr('enctype', 'multipart/form-data');
            self.container = $('<div class="fileupload-container" />');
            self.progressbar =
                    $('<div title="Cargando" class="progressbar fileupload-progressbar"></div>')
                    .progressbar().hide();
            self.progressText = $('<span style="" class="progress-label"></span>');
            self.progressbar.find('.ui-progressbar-value').append(self.progressText);
            self.fileuploadButtonbar = $('<div class="fileupload-buttonbar" />');

            //self.btnUpload =
            //        $('<span class="btn-upload btn success fileinput-button">'
            //                + '<span>' + opc.labels.btnUpload + '</span>'
            //                + '<input type="file" title="Seleccionar" name="files"  />' + '</span>');
            //self.btnDelete =
            //        $('<button type="button" title="Eliminar" class="btn-delete btn danger delete">'
            //                + opc.labels.btnDelete + '</button>').hide();
            if (!opc.bEditable) {
                self.btnUpload =
                        $('<span class="btn-upload btn success fileinput-button">'
                                + '<span>' + opc.labels.btnUpload + '</span>'
                                + '<input type="file" name="files" />' + '</span>');
                self.btnDelete =
                        $('<button type="button" class="btn-delete btn danger delete">'
                                + opc.labels.btnDelete + '</button>').hide();
            } else {
                self.btnUpload = $('<span class="btn-upload   ui-icon ui-icon-search fileinput-button">'
                                 + '<span></span>'
                                 + '<input type="file" name="files" />' + '</span>');
                self.btnDelete =
                        $('<span  class="btn-delete  ui-icon ui-icon-close ">'
                                + '</span>').hide().css('display', 'none');
            }
            self.btnCancel =
                    $('<button type="reset" class="btn-cancel  btn danger cancel">'
                            + 'Cancelar' + '</button>');
            self.containerSuccess = $('<div class="fileupload-result" />').hide();

            if (!opc.bEditable) {
                self.fileuploadButtonbar.append(self.btnUpload);
                self.fileuploadButtonbar.append(self.btnDelete);
            } else {
                self.fileuploadButtonbar.append(self.btnDelete);
                self.fileuploadButtonbar.append(self.btnUpload);
            }
            self.container.append(self.containerSuccess);
            self.container.append(self.progressbar);
            self.container.append(self.fileuploadButtonbar);

            self.fileuploadLegent = $('<div class="box-fileupload-legent"/>');
            if (opc.sFileTypes != null && opc.bLegent && opc.sFileTypes.trim() != '') {
                if (opc.sFileTypes.trim().length > 0) {
                    self.sFileTypes = $('<span class="block">' + opc.labels.lbFileType +
                            opc.sFileTypes.trim().replace(/\|/g, ", ") + '.' + '</span>');
                    self.fileuploadLegent.append(self.sFileTypes);
                }
            }
            if (opc.iFileSize != null && opc.iFileSize.toString().trim() != '' && opc.bLegent) {
                self.iFileSize = $('<span class="block">' + opc.labels.lbFileSize +
                        ((parseInt(opc.iFileSize) / 1048576)) + ' MB.' + '</span>');
                self.fileuploadLegent.append(self.iFileSize);
            }
            if (opc.bLegent && self.fileuploadLegent != null) {
                self.container.append(self.fileuploadLegent);
            }

            _this.append(self.container);

            self.btnDelete
                    .click(function () {
                        var callbackDelete = function () {
                            self._callbackDelete();
                            self.options.counterFiles = 0;
                            self.options.xhrFiles = [];
                        };
                        opc.fnDelete(self.params, callbackDelete);
                    });
            self.btnCancel
                    .click(function () {
                        self.cancel();
                    });
        },
        _removeXhrDone: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var xhrs = [];
            for (var i = 0; i < opc.xhrFiles.length; i++) {
                var xhr = opc.xhrFiles[i];
                if (xhr.readyState != 4) {
                    xhrs.push(xhr);
                }
            }
            opc.xhrFiles = xhrs;
        },
        /**
         * agrega un archivo enviando los datos del mismo
         * filename : campo obligatorio, para poner el nombre
         * url      : campo obligatorio, para descargar el archivo
         */
        _callbackSuccess: function (params) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.Cargado = true;
            self.params = {
                filename: 'archivo',
                url: '#'
            };
            if ($.isPlainObject(params)) {
                $.extend(self.params, params);
            }
            self.btnDelete.fadeIn();
            $('<a class="fileupload-link" />')
                    .text(self.params.filename)
                    .attr('title', self.params.title)
                    .attr('href', self.params.url)
                    .appendTo(self.containerSuccess);
            self.containerSuccess.fadeIn();
            self.btnUpload.addClass('disabled');
            self.btnUpload.find('input:file').attr('title', self.params.filename);
        },
        _callbackDelete: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            opc.Cargado = false;
            self.containerSuccess.hide().empty();
            self.btnUpload.find('input:file').attr('title', 'Seleccionar');
            self.progressbar.fadeIn();
            self.progressbar.progressbar('value', 99);
            self.btnDelete.fadeOut();
            self.btnUpload.removeClass('disabled');
            self.progressbar.fadeOut('nomal', function () {
                self.progressbar.progressbar('value', 0);
            });
            self.params = null;

        },
        inproFiles: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var xhrs = [];
            for (var i = 0; i < opc.xhrFiles.length; i++) {
                var xhr = opc.xhrFiles[i];
                if (xhr.readyState != 4) {
                    xhrs.push(xhr);
                }
            }
            return xhrs.length;
        },
        settings: function () {
            var self = this,
                    opc = self.options;
            return opc;
        },
        getData: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return self.params;
        },
        hasFile: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return isNull(opc.Cargado) ? false : opc.Cargado;
        },
        setFile: function (dataFile) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            self._callbackSuccess(dataFile);
            opc.counterFiles = 1;
        },
        cancel: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (opc.xhrFiles.length) {
                $.each(opc.xhrFiles, function (index, value) {
                    var xhr = value;
                    if (xhr && xhr.readyState != 4) {
                        xhr.abort();
                        self._callbackDelete();
                    }
                });
                self.options.xhrFiles = [];
                self.counterFiles = 0;
            }
        },
    });
    /**************************************************************************/
    $.datepickerSetup = function (opc_user) {
        $.datepicker.setDefaults(opc_user);
        $.extend($.datepickerSetup.defaults, opc_user);
    };
    $.datepickerSetup.defaults = {
        changeMonth: true,
        changeYear: true,
        showOn: "button",
        buttonImageOnly: true,
        dateFormat: 'dd/mm/yy',
        yearRange: '1900:2500',
        buttonText: 'Fecha',
        mask: '99/99/9999',
        separator: '/',
        dateFormatForValidation: 'dd/MM/yyyy'
    };
    /**
     * OPCIONES REQUERIDAS
     * *******************
     * dateFormat: Por ejemplo, dd/mm/yy
     * mask: Por ejemplo, 99/99/9999
     *
     */
    $.widget("if.compDatepicker", {
        options: {
            datepickerSetup: {}
        },
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            self.options = opc = $.extend({}, $.datepickerSetup.defaults, opc);
            self._datepicker();
            $(window).on('resize', function () {
                if (!isNull(self.element) && self.element.length) {
                    $(self.element).datepicker('hide');
                }
            });
        },
        _datepicker: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            self.wrapper = $('<div class="box-datepicker" />');
            //TODO
            var inputClass = _this.attr('class') ?
                    _this.attr('class').replace('datepicker', '').trim() : '';

            if (!_this.parent().hasClass('box-datepicker')) {
                self.wrapper.addClass(inputClass);
                //   _this.removeClass(inputClass);

                _this.after(self.wrapper);
                _this.appendTo(self.wrapper);
            }

            if (_this.get(0).tagName == 'INPUT') {
                if (opc.datepickerSetup != null && !$.isEmptyObject(opc.datepickerSetup)) {
                    var format = 'dd/mm/yy';

                    if (_this.hasClass('day-month')) {
                        _this.datepicker('option', 'changeMonth', false);
                        _this.datepicker('option', 'changeYear', false);
                        _this.mask('99/99');
                        format = 'dd/mm';
                    } else {
                        if (_this.hasClass('month-year')) {
                            _this.mask('99/9999');
                            format = 'mm/yy';
                        } else {
                            _this.mask('99/99/9999');
                        }
                    }
                    opc.datepickerSetup.dateFormat = format;
                    _this.datepicker($.extend({}, $.datepickerSetup.defaults, opc.datepickerSetup));
                } else {
                    _this.datepicker(opc);
                }

                _this
                        .mask(opc.mask)
                        .bind('textchange keypress keyup',
                                function () {
                                    if (Date.parseExact(_this.val(),
                                            opc.dateFormatForValidation) === null
                                            || !self._validate()) {
                                        self.wrapper.addClass('invalid-date');
                                    } else {
                                        self.wrapper.removeClass('invalid-date');
                                    }
                                })
                        .focusout(
                                function () {
                                    if (self.wrapper.hasClass('invalid-date')) {
                                        _this.val('');
                                        self.wrapper.removeClass('invalid-date');
                                    }
                                });
            }
        },
        _validate: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var esErrorDia = false;
            var esErrorMes = false;
            var esErrorAnio = false;
            var tempFormat = opc.dateFormat.split(opc.separator);
            var oDate = {};
            for (var i = 0; i < tempFormat.length; i++) {
                oDate[tempFormat[i].toLowerCase().charAt(0)] =
                        parseInt(_this.val().split(opc.separator)[i]);
            }
            /******************************************************************/
            if (oDate['d'] <= 0 || oDate['d'] > 31) {
                esErrorDia = true;
            }
            if (oDate['m'] <= 0 || oDate['m'] > 12) {
                esErrorMes = true;
            } else {
                if (oDate['m'] === 2) {
                    if (oDate['d'] <= 0 || (oDate['d'] > 29 && isLeapYear(oDate['y']))) {
                        esErrorDia = true;
                    } else {
                        if (oDate['d'] <= 0 || (oDate['d'] > 28 && !isLeapYear(oDate['y']))) {
                            esErrorDia = true;
                        }
                    }
                } else {
                    switch (oDate['m']) {
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            if (oDate['d'] <= 0 || oDate['d'] === 31) {
                                esErrorDia = true;
                            }
                    }
                }
            }
            if (oDate['y'] < 1900) {
                esErrorAnio = true;
            }
            /******************************************************************/
            if (esErrorDia || esErrorMes || esErrorAnio) {
                return false;
            } else {
                return true;
            }
        },
        destroy: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            _this.datepicker('destroy');
            _this.unmask();
            _this.insertBefore(self.wrapper);
            self.wrapper.remove();
        }
    });

    $.widget("if.spinner", $.ui.spinner, {
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var cls = _this.attr('class');
            // _this.removeClass(cls);
            $.ui.spinner.prototype._create.call(this);
            if (isResponsiveDesign()) {
                self.uiSpinner.addClass(cls);
            }
        }
    });
    /***************************************************************************/
    /*Componente tablas editables en linea*/
    $.editorSetup = function (opc_user) {
        $.opc_default_editor = $.extend($.editorSetup.defaults, opc_user);
    };
    $.editorSetup.defaults = {
        toolbar: {
            reset: true,
            edit: true,
            save: true,
            cancel: true,
            show: false
        },
        getNode: function () {
        },
        content: '.box-editor-tabla',
        fnValidate: null,
        fnBeforeEdit: null
    };
    $.widget("if.editor", {
        options: {
            columns: {}
        },
        _create: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            $.editorSetup();
            self.options = opc = $.extend({}, $.opc_default_editor, opc);
            $(_this).dblclick(function (event) {
                self.btnEditar.click();
            });

            self.btnEditar = null;
            self.btnGuardar = null;
            self.btnCancelar = null;
            self.btnEliminar = null;
            self.btnMostrar = null;

            self.toolbar = $(opc.content, _this).addClass('comp-editor-tabla-toolbar');
            self.btnEditar = (opc.toolbar.edit) ? self._createEditButton() : null;
            self.btnEliminar = (opc.toolbar.reset) ? self._createDeleteButton() : null;
            self.btnMostrar = (opc.toolbar.show) ? self._createShowButton() : null;
            self.toolbar.append(self.btnEditar, self.btnEliminar);
            self.toolbar.append(self.btnMostrar, self.btnMostrar);
        },
        reset: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (self.btnCancelar != null) {
                self.btnCancelar.click();
            }
        },
        startEdition: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (self.btnEditar != null) {
                self.btnEditar.click();
            }
        },
        _crearEditor: function (conf) {

            var self = this,
                    _this = self.element,
                    opc = self.options;
            var dataFila = _this.data('data');
            var valorCelda = null;

            if (conf.type == 'combobox') {
                valorCelda = {};
                if (!isNull(dataFila[conf.dataPath])) {
                    valorCelda = {
                        Id: dataFila[conf.dataPath].Id,
                        Description:
                                (!isEmpty(dataFila[conf.dataPath].Description)) ?
                                dataFila[conf.dataPath].Description :
                                dataFila[conf.dataPath].DisplayName,
                        DisplayName: (!isEmpty(dataFila[conf.dataPath].Description)) ?
                                dataFila[conf.dataPath].Description :
                                dataFila[conf.dataPath].DisplayName,
                        data: dataFila[conf.dataPath]
                    }
                }
            } else {
                valorCelda = dataFila[conf.dataPath];
            }
            var editor = $('<div class="comp-editor-tabla-celda"/>');
            switch (conf.type) {
                case 'calendar':
                    var inputCalendar =
                            $('<input type="text" class="grid-100 editor-cell-datepicker datepicker cell-editor" />');
                    editor.append(inputCalendar);
                    conf.options.buttonImage = appData.resourcesUrl + "images/calendar.gif";
                    inputCalendar.compDatepicker(conf.options);
                    inputCalendar.datepicker('setDate', valorCelda != null ? valorCelda.deserializeDate() : '');
                    break;
                case 'cadena':
                    editor
                            .append($('<input  type="text" class="grid-100 editor-cell-text cell-editor" />')
                                    .val(valorCelda));
                    break;
                case 'checkbox':
                    editor
                            .append(
                                    $('<input  type="checkbox" class="grid-10 editor-cell-checkbox cell-editor" />')
                                    .prop('checked', valorCelda));
                    break;
                case 'radio':
                    editor
                            .append(
                                    $('<input  type="radio" class="grid-10 editor-cell-checkbox cell-editor" />')
                                    .prop('checked', valorCelda));
                    break;
                case 'spinner':
                    var inputSpinner = $('<input type="text" class="grid-100 cell-editor" />');
                    editor.append(inputSpinner);
                    inputSpinner.spinner(conf.options);
                    inputSpinner.spinner('value', valorCelda);
                    break;
                case 'numerico':
                    editor
                            .append($('<input  type="text" class="grid-100 editor-cell-text cell-editor" />')
                                    .val(valorCelda));
                    break;
                case 'combobox':
                    var inputCombobox = $('<select class="grid-90 combobox cell-editor" />');
                    editor.append(inputCombobox);
                    conf.options.textOverlabel = "";
                    if (!isNull(conf.api) && conf.api) {
                        inputCombobox.combobox(defaultApiCombobox(conf.options));
                    } else {
                        inputCombobox.combobox(DefaultCombobox(conf.options));
                    }
                    if (isNull(valorCelda) || isNull(valorCelda.Id)) {
                        inputCombobox
                                .combobox('setId', null)
                                .combobox('setValue', "")
                                .combobox('setData', null);
                    } else {
                        inputCombobox
                                .combobox('setId', valorCelda.Id)
                                .combobox('setValue', valorCelda.DisplayName)
                                .combobox('setData', valorCelda.data);
                    }
                    break;
                case 'fileupload':
                    var inputFileUpload =
                            $('<div class="box-fileupload left grid-100 mobile-grid-100"> </div>');
                    var file = $('<form action="#" class="file"></form>');
                    file.compFileupload(conf.options);
                    file.compFileupload('setFile',
                            {
                                filename: valorCelda,
                                title: Globalize.localize('TextDownload'),
                                url: appData.siteUrl + 'InformeEvaluacionAneca/DowloadTempFichero/'
                            });
                    inputFileUpload.append(file);
                    editor.append(inputFileUpload);
                    break;
            }
            return editor;
        },
        _createEditButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return $('<button />')
                    .addClass('btn-editar')
                    .button({
                        label: 'Editar',
                        text: false,
                        icons: {
                            primary: 'ui-icon-pencil'
                        }
                    })
                    .click(function () {
                        $('> tr:not(.child-details)', _this.parents('tbody')).editor('reset');
                        self.btnCancelar = self._createCancelButton();
                        self.btnCancelar.insertBefore(self.btnEditar);

                        self.btnGuardar = self._createSaveButton();
                        self.btnGuardar.insertBefore(self.btnCancelar);
                        if (opc.toolbar.edit)
                            self.btnEditar.remove();
                        if (opc.toolbar.reset)
                            self.btnEliminar.remove();
                        if (opc.toolbar.show) {
                            self.btnMostrar.remove();
                        }
                        $.each(opc.columns, function (index, value) {
                            var celda = $($('td', _this)[value.position]);
                            celda.data('dataCeldaOriginal', celda.clone());
                            celda
                                    .empty()
                                    .data('dataEditorTemporal', self._crearEditor(value))
                                    .append(celda.data('dataEditorTemporal'));
                        });
                        self._enter();
                        if (opc.fnBeforeEdit != null)
                            opc.fnBeforeEdit(_this);
                    });
        },
        _createSaveButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            return $('<button />')
                    .addClass('btn-guardar')
                    .button({
                        label: 'Guardar',
                        text: false,
                        icons: {
                            primary: 'ui-icon-check'
                        }
                    })
                    .click(function () {
                        var errors = [];
                        var tempData = $(_this).data('data');
                        var data = $(_this).data('data');
                        var row = [];
                        errors = self._getRequireds();
                        var continuar = true;
                        if (errors == null || !errors.length) {
                            var params = self._getNewData();
                            if (opc.fnValidate !== null)
                                continuar = opc.fnValidate(params);
                        } else {
                            continuar = false;
                            showErrors(errors);
                            $(_this).data('data', tempData);
                        }
                        if (continuar) {
                            var fnGetData = function () {
                                $.each(opc.columns, function (index, value) {
                                    var celda = $($('td', _this)[value.position]);
                                    params[index] = value;
                                    switch (value.type) {
                                        case 'cadena':
                                            row.push({
                                                position: value.position,
                                                value: value.newValue
                                            });
                                            break;
                                        case 'checkbox':
                                            row.push({
                                                type: value.type,
                                                lbTrue: value.lbTrue,
                                                lbFalse: value.lbFalse,
                                                position: value.position,
                                                value: value.newValue
                                            });
                                            break;
                                        case 'radio':
                                            row.push({
                                                type: value.type,
                                                lbTrue: value.lbTrue,
                                                lbFalse: value.lbFalse,
                                                position: value.position,
                                                value: value.newValue
                                            });
                                            break;
                                        case 'spinner':
                                            row.push({
                                                position: value.position,
                                                value: value.newValue
                                            });
                                            break;
                                        case 'numerico':
                                            row.push({
                                                position: value.position,
                                                value: value.newValue
                                            });
                                            break;
                                        case 'combobox':
                                            row.push({
                                                position: value.position,
                                                value: ((!isEmpty(value.newValue.DisplayName)) ?
                                                        value.newValue.DisplayName :
                                                        value.newValue.Decription)
                                            });
                                            break;
                                        case 'calendar':
                                            row.push({
                                                position: value.position,
                                                value: value.newValue.asLocalizedDate()
                                            });
                                            break;
                                        case 'fileupload':
                                            row.push({
                                                position: value.position,
                                                value: value.newValue

                                            });
                                            break;
                                    }
                                });
                            }
                            var fnRender = function (elementos, dataRow) {
                                var fnDraw = function (elem) {

                                    $.each(elem, function (index, val) {
                                        if (val.type != "checkbox" && val.type != "calendar") {
                                            $($('>td', _this)[val.position])
                                                    .removeData('dataEditorTemporal')
                                                    .removeData('dataCeldaOriginal')
                                                    .html(!isNull(val.value) ? val.value.toString() : null);
                                        } else {

                                            if (val.type == "checkbox") {
                                                $($('>td', _this)[val.position])
                                                        .removeData('dataEditorTemporal')
                                                        .removeData('dataCeldaOriginal')
                                                        .html((val.value) ? val.lbTrue : val.lbFalse);
                                            }
                                            if (val.type == 'calendar') {
                                                $($('>td', _this)[val.position])
                                                        .removeData('dataEditorTemporal')
                                                        .removeData('dataCeldaOriginal')
                                                        .html(!isNull(val.value) ? val.value.toString() : null);
                                            }
                                        }
                                    });
                                }
                                fnDraw(elementos);
                                self.btnGuardar.remove();
                                self.btnCancelar.remove();
                                if (opc.toolbar.edit) {
                                    self.btnEditar = self._createEditButton();
                                    self.btnEditar.prependTo(self.toolbar);
                                }
                                if (opc.toolbar.reset) {
                                    self.btnEliminar = self._createDeleteButton();
                                    self.btnEliminar.appendTo(self.toolbar);
                                }
                                if (opc.toolbar.show) {
                                    self.btnMostrar = self._createShowButton();
                                    self.btnMostrar.appendTo(self.toolbar);
                                }
                                //3er parametro recibe los nuevos valores a pintar y la nueva data de fila
                                if (opc.fnSuccess != null) {
                                    opc.fnSuccess(tempData, params, function (elems, newDataRow) {
                                        if (elems != null && newDataRow != null && elems.length) {
                                            fnDraw(elems)
                                        } else {
                                            self._modifyData(params);
                                        }
                                    });
                                } else {
                                    self._modifyData(params);
                                }
                            };
                            if (errors.length) {
                                showErrors(errors);
                            } else {
                                fnGetData();
                                fnRender(row, data);
                            }
                        }
                    });
        },
        _createCancelButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            return $('<button />')
                    .addClass('btn-cancelar')
                    .button({
                        label: 'Cancelar',
                        text: false,
                        icons: {
                            primary: 'ui-icon-close'
                        }
                    })
                    .click(function () {
                        if (opc.fnCancel != null) {
                            if (!opc.fnCancel(self._getNewData(false, {}))) {
                                return false;
                            }
                        }
                        self.btnGuardar.remove();
                        self.btnCancelar.remove();
                        if (opc.toolbar.edit) {
                            self.btnEditar = self._createEditButton();
                            self.btnEditar.prependTo(self.toolbar);
                        }
                        if (opc.toolbar.reset) {
                            self.btnEliminar = self._createDeleteButton();
                            self.btnEliminar.appendTo(self.toolbar);
                        }
                        if (opc.toolbar.show) {
                            self.btnMostrar = self._createShowButton();
                            self.btnMostrar.appendTo(self.toolbar);
                        }
                        $.each(opc.columns, function (index, value) {
                            var celda = $($('td', _this)[value.position]);
                            celda.data('dataEditorTemporal').remove();
                            celda.append(celda.data('dataCeldaOriginal').html());
                            celda.removeData('dataEditorTemporal').removeData('dataCeldaOriginal');
                        });
                    });
        },
        _createDeleteButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return $('<button />')
                    .addClass('btn-eliminar')
                    .button({
                        label: 'Eliminar',
                        text: false,
                        icons: {
                            primary: 'ui-icon-trash'
                        }
                    })
                    .click(function () {
                        if (opc.fnDelete != null) {
                            opc.fnDelete();
                        } else {
                            _this.remove();
                        }
                    });
        },
        _createShowButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return $('<button />')
                    .addClass('btn-mostrar')
                    .button({
                        label: 'Mostrar',
                        text: false,
                        icons: {
                            primary: 'ui-icon-search'
                        }
                    })
                    .click(function () {
                        if (opc.fnShow != null) {
                            opc.fnShow();
                        }
                    });
        },
        _getNewData: function (data) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var params = {};
            $.each(opc.columns, function (index, value) {

                var celda = $($('td', _this)[value.position]);
                params[index] = value;
                switch (value.type) {
                    case 'cadena':
                        var inputText = $(':text', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputText.val();
                        break;
                    case 'checkbox':
                        var inputCheck = $(':checkbox', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputCheck.is(':checked');
                        break;
                    case 'radio':
                        var inputRadio = $(':radio', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputRadio.is(':checked');
                        break;
                    case 'spinner':
                        var inputSpinner = $(':text', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputSpinner.spinner('value');
                        break;
                    case 'numerico':
                        var inputNumber = $(':text', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputNumber.val();
                        break;
                    case 'combobox':
                        var inputCombobox = $('select', celda.data('dataEditorTemporal'));
                        params[index].newData = inputCombobox.combobox('getData');
                        params[index].newValue = {
                            Id: inputCombobox.combobox('getId'),
                            Description: inputCombobox.combobox('getValue'),
                            DisplayName: inputCombobox.combobox('getValue'),
                            data: inputCombobox.combobox('getData')
                        };
                        break;
                    case 'calendar':
                        var inputCalendar = $(':text', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputCalendar.datepicker('getDate').serialize();
                        break;
                    case 'fileupload':
                        var inputFile = $('form.file', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputFile.compFileupload('getData').filename;
                        params[index].newData = inputFile.compFileupload('getData').data;
                        break;
                }
            });
            return params;
        },
        _modifyData: function (params) {
            var self = this,
                    _this = self.element;
            var newDataTable = $(_this).data('data');
            $.each(params, function (index, value) {
                var datapath = value.dataPath;
                switch (value.type) {
                    case 'cadena':
                        newDataTable[datapath] = value.newValue;
                        break;
                    case 'checkbox':
                        newDataTable[datapath] = value.newValue;
                        break;
                    case 'radio':
                        newDataTable[datapath] = value.newValue;
                        break;
                    case 'spinner':
                        newDataTable[datapath] = value.newValue;
                        break;
                    case 'numerico':
                        newDataTable[datapath] = value.newValue;
                        break;
                    case 'combobox':
                        newDataTable[datapath] = {
                            Id: value.newValue.Id,
                            Description: value.newValue.Description,
                            DisplayName: value.newValue.DisplayName
                        };
                        break;
                    case 'calendar':
                        newDataTable[datapath] = value.newValue;
                        break;
                    case 'fileupload':
                        newDataTable[datapath] = inputFile.compFileupload('getData').filename;
                        break;
                }
            });
            return newDataTable;
        },
        _getRequireds: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var errors = [];
            $.each(opc.columns, function (index, value) {

                var celda = $($('td', _this)[value.position]);
                var params = {};
                params[index] = value;
                switch (value.type) {
                    case 'cadena':
                        var inputText = $(':text', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputText.val();
                        break;
                    case 'checkbox':
                        var inputCheck = $(':checkbox', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputCheck.is(':checked');
                        break;
                    case 'radio':
                        var inputRadio = $(':radio', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputRadio.is(':checked');
                        break;
                    case 'spinner':
                        var inputSpinner = $(':text', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputSpinner.spinner('value');
                        break;
                    case 'numerico':
                        var inputNumber = $(':text', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputNumber.val();
                        break;
                    case 'combobox':
                        var inputCombobox = $('select', celda.data('dataEditorTemporal'));
                        params[index].newValue = {
                            Id: inputCombobox.combobox('getId')
                        };
                        break;
                    case 'calendar':
                        var inputCalendar = $(':text', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputCalendar.datepicker('getDate').serialize();
                        break;
                    case 'fileupload':
                        var inputFile = $('form.file', celda.data('dataEditorTemporal'));
                        params[index].newValue = inputFile.compFileupload('getData').filename;
                        break;
                }
                if (value.type == "combobox") {
                    if (value.required && isNull(params[index].newValue.Id))
                        errors.push("Debe ingresar " + value.tooltip);
                } else {
                    if (value.required && isNull(params[index].newValue))
                        errors.push("Debe ingresar" + value.tooltip);
                }
            });

            return errors;
        },
        getNode: function (col, keyName) {
            var self = this,
                    opc = self.options;
            var type = opc.columns[keyName].type;
            var celda = this.element.find('td').eq(col);
            var element = null;
            switch (type) {
                case 'cadena':
                    break;
                case 'checkbox':
                    break;
                case 'spinner':
                    element = celda.find('input.ui-spinner-input');
                    break;
                case 'numerico':
                    break;
                case 'combobox':
                    element = celda.find('select.combobox');
                    break;
                case 'calendar':
                    element = celda.find('input.datepicker');
                    break;
                case 'fileupload':
                    element = '';//celda.find('input.datepicker');
                    break;
            }
            return element;
        },
        _enter: function () {
            var self = this,
                    _this = self.element;
            _this.find('input.cell-editor:visible , .ui-spinner-input:visible')
                    .on('keypress', function (e) {
                        if (e.which == '13') {
                            _this.find('.btn-guardar').click();
                            e.preventDefault();
                        }
                    });

        }
    });
    $.editableSetup = function (opc_user) {
        $.opc_default_editable = $.extend($.editableSetup.defaults, opc_user);
    };
    $.editableSetup.defaults = {
        toolbar: {
            reset: true,
            edit: true,
            save: true,
            cancel: true,
            show: false
        },
        getNode: function () {
        },
        content: '.box-editor-table',
        fnValidate: null,
        fnBeforeEdit: null,
        optionMenu: ".btn-opciones",
        boxToolbar: ".box-editor-table",
        oldRowEdit: null
    };
    $.widget("if.editable", {
        options: {
            columns: {}
        },
        _create: function () {
            var self = this;
            self._initSettings();
            self._initEditor();
            self._onResize();
        },
        _initSettings: function () {
            var self = this;
            var element = this.element;
            $.editableSetup();
            $(element).addClass('box-form-content');
            self.options = $.extend({}, $.opc_default_editable, self.options);
            self.options.contentToolbar = $('<div></div>').addClass('box-editor-table');
            if (self.options.sClassButtons && self.options.sClassButtons.length) {
                self.options.contentToolbar.addClass('ui-state-default');
            }
            self.options.cellToolbar = $(element).find('td').last()
                    .append(self.options.contentToolbar);
        },
        _initEditor: function () {
            var self = this, element = self.element;
            self._createToolbars();

            if (self.options.bSubmit) {
                $(self.options.boxToolbar, self.element).hide();
            } else {
                $(self.options.boxToolbar, self.element).show();
                $(self.options.optionMenu, self.element).hide();
                self._changeToolbar(false);
            }

            $(element).dblclick(function (event) {
                if (event.target.nodeName === 'TD' || event.target.nodeName === "TR") {
                    self._edicion(this);
                }
            });
        },
        _onResize: function () {
            var self = this, element = this.element;
            $(window).resize(function () {
                if ($(element).hasClass('editable')) {
                    self._cancelar(element);
                }
            });
        },
        _edicion: function (row) {
            var self = this,
                opc = self.options,
                element = self.element;
            opc.table = $(row).closest('table');

            var editRow = function () {
                opc.dataTable = $(row).closest('table').DataTable();
                opc.cells = opc.dataTable.columns().visible();
                opc.oldRowEdit = opc.content != null && !opc.content.isEmpty() ? $(row).closest(opc.content).find('tr.editable') : $(row).closest('table').find('tr.editable');
                self._cancelar(opc.oldRowEdit);

                $(row).addClass('editable');
                var cells = $(row).find('td');
                $(opc.optionMenu, row).hide();
                $(opc.boxToolbar, row).show();
                self._changeToolbar(true);

                var rowIndex = $(row).index();
                $.each(cells, function (index, value) {
                    var settingCell = self._getCellSettings(index);
                    var cell = $(value);
                    if (settingCell != null) {
                        cell.addClass('edit')
                            .data('dataCeldaOriginal', cell.clone())
                            .empty()
                            .data('dataEditorTemporal', self._crearEditor(settingCell, cell));
                        self._enter(cell);
                    }
                });
                if (opc.validate != null) {
                    if (opc.validate.settings != null) {
                        opc.validator = $(row).validate(opc.validate.settings);
                    } else {
                        opc.validator = $(row).validate();
                    }
                }
            }
            if (opc.fnEdit != null) {
                opc.fnEdit(opc.table.find('tr.editable'), editRow);
            } else {
                editRow();
            }
        },
        _guardar: function (row) {
            var self = this;
            var opc = self.options;
            var oldaData = $(row).data('data');
            var newDataRow = self._getNewDataRow(row);
            var prepareSave = function () {
                var fnSave = function (data, errors) {
                    var fnRender = function () {
                        row.data('data', data);
                        $(opc.optionMenu, row).show();
                        $(opc.boxToolbar, row).hide();
                        self._renderDataRow(data, row);
                        row.removeClass('editable');
                    }
                    if (opc.fnSave != null) {
                        opc.fnSave(oldaData, newDataRow, fnRender, errors);
                    } else {
                        fnRender();
                    }
                }
                if (!opc.bSubmit) {
                    if (opc.fnSave != null) {
                        opc.fnSave(oldaData, newDataRow, function (data, succes) {

                            data != null ? $(row).data('data', data) : $(row).data('data', newDataRow);
                            if (succes) {

                                self._renderDataRow($(row).data('data'), row);
                                self._changeToolbar(false);
                                row.removeClass('editable');
                            }
                        });
                    } else {
                        $(row).data('data', newDataRow);
                        self._renderDataRow($(row).data('data'), row);
                        self._changeToolbar(false);
                        row.removeClass('editable');
                    }
                }
                if (opc.bSubmit) {
                    self.fnSave(oldaData, newDataRow, fnSave);
                }

            }
            var resultValidate = opc.fnValidate != null ? opc.fnValidate(newDataRow) : true;
            if (resultValidate) {
                var resultBeforeSave = opc.fnBeforeSave != null ? opc.fnBeforeSave(newDataRow) : true;
                if (resultBeforeSave) {
                    prepareSave();
                }
            }
        },
        _cancelar: function (row) {
            var self = this, opc = self.options;
            var cells = $(row).find('td.edit:visible');
            $.each(cells, function (index, value) {
                var cell = $(value);
                cell.data('dataEditorTemporal').remove();
                cell.append(cell.data('dataCeldaOriginal').html());
                cell.removeData('dataEditorTemporal').removeData('dataCeldaOriginal');
            });
            $(row).removeClass('editable');
            if (opc.bSubmit) {
                $(opc.optionMenu, row).show();
                $(opc.boxToolbar, row).hide();
            } else {
                this._changeToolbar(false);
            }
            self._changeToolbarAll();
        },
        _createToolbars: function () {

            var self = this;
            var opc = self.options;

            //Creando botones
            if (self.btnCancel == null || self.btnCancel == undefined) {
                self.btnCancel = self._createCancelButton();
                self.btnCancel.insertBefore(self.btnSave);
            }
            if (self.btnDelete == null || self.btnDelete == undefined) {
                if (opc.toolbar != null && opc.toolbar.reset) {
                    self.btnDelete = self._createDeleteButton();
                    self.btnDelete.insertBefore(self.btnCancel);
                }
            }
            if (self.btnEdit == null || self.btnEdit == undefined) {
                self.btnEdit = self._createEditButton();
                self.btnEdit.insertAfter(self.btnDelete);
            }
            if (self.btnSave == null || self.btnSave == undefined) {
                self.btnSave = self._createSaveButton();
                self.btnSave.insertBefore(self.btnCancel);
            }
            if (self.btnShow == null || self.btnShow == undefined) {
                self.btnShow = self._createShowButton();
                self.btnShow.insertBefore(self.btnEdit);
            }
            //Añadiendo botones
            if (opc.bSubmit) {
                if (!opc.btnShow) {
                    opc.contentToolbar.append(self.btnSave, self.btnDelete, self.btnCancel);
                } else {
                    opc.contentToolbar.append(self.btnShow,self.btnSave, self.btnDelete, self.btnCancel);
                }
            } else {
                if (!opc.btnShow) {
                    opc.contentToolbar.append(self.btnSave, self.btnEdit, self.btnDelete, self.btnCancel);
                } else {
                    opc.contentToolbar.append( self.btnShow,self.btnSave, self.btnEdit, self.btnDelete, self.btnCancel);
                }
            }
        },
        _changeToolbarAll: function () {

            if (!this.options.bSubmit) {
                $('.btn-succes').hide();
                $('.btn-cancelar').hide();
                $('.btn-show').show();
                $('.btn-eliminar').show();
                $('.btn-editar').show();
            }
        },
        _changeToolbar: function (edicion) {
            var self = this;
            if (!self.options.bSubmit) {
                if (edicion) {
                    self.btnDelete.hide();
                    self.btnEdit.hide();
                    self.btnShow.hide();
                    self.btnSave.show();
                    self.btnCancel.show();
                } else {
                    self.btnSave.hide();
                    self.btnCancel.hide();
                    self.btnDelete.show();
                    self.btnEdit.show();
                    self.btnShow.show();
                }
            }
        },
        _hideToolBar: function (row) {

            var opc = this.options;

            if (opc.bSubmit) {
                $(row)
                        .find(opc.optionMenu).show();
                $(row).find(opc.boxToolbar).hide();
            } else {
                $(row)
                        .find(opc.optionMenu).show();
                $(row).find(opc.boxToolbar).remove();
            }
        },
        _getCellSettings: function (position) {

            var self = this;
            var opc = self.options;
            var setting = null;

            if (!isNull(position) && position >= 0) {
                $.each(opc.columns, function (index, value) {
                    if (value.position == position) {
                        setting = value;
                    }
                });
            }
            return setting;
        },
        getCellName: function (position) {

            var self = this;
            var opc = self.options;
            var setting = null;

            if (!isNull(position) && position >= 0) {
                $.each(opc.columns, function (index, value) {
                    if (value.position == position) {
                        setting = index;
                    }
                });
            }
            return setting;
        },
        _getNewDataRow: function (row) {

            var self = this;
            var opc = self.options;
            var params = [];
            var oldaData = $(row).data('data');
            var newDataRow = $.extend({}, oldaData);
            var table = $(row).closest('table').DataTable();
            var colVis = $(row).find('td');
            var rowIndex = $(row).index();
            $.each(colVis, function (index, value) {
                var settingCell = self._getCellSettings(index);
                var cellName = self.getCellName(index);
                if (settingCell != null && value) {
                    var cell = $(value);
                    var param = settingCell;
                    var newData = {};
                    switch (settingCell.type) {
                        case 'text':
                            var inputText = $(':text', cell.data('dataEditorTemporal'));
                            params.newValue = inputText.val();
                            newData[cellName] = inputText.val();
                            break;
                        case 'checkbox':
                            var inputCheck = $(':checkbox', cell.data('dataEditorTemporal'));
                            params.newValue = inputCheck.is(':checked');
                            newData[cellName] = inputCheck.is(':checked');
                            break;
                        case 'radio':
                            var inputRadio = $(':radio', cell.data('dataEditorTemporal'));
                            params.newValue = inputRadio.is(':checked');
                            newData[cellName] = inputRadio.is(':checked');
                            break;
                        case 'number':
                            var inputSpinner = $(':text', cell.data('dataEditorTemporal'));
                            opc.autoNumeric != null ? inputSpinner.autoNumeric(opc.autoNumeric) : inputSpinner.autoNumeric();
                            params.newValue = inputSpinner.autoNumeric('get');
                            newData[cellName] = params.newValue;
                            break;
                        case 'select':
                            var inputCombobox = $('select', cell.data('dataEditorTemporal'));
                            params.newData = inputCombobox.combobox('getData');
                            params.newValue = {
                                Id: inputCombobox.combobox('getId'),
                                Description: inputCombobox.combobox('getValue'),
                                DisplayName: inputCombobox.combobox('getValue'),
                                data: inputCombobox.combobox('getData')
                            };
                            newData[cellName] = {
                                Id: inputCombobox.combobox('getId'),
                                Nombre: inputCombobox.combobox('getValue'),
                                Description: inputCombobox.combobox('getValue'),
                                DisplayName: inputCombobox.combobox('getValue')
                            }
                            break;
                        case 'date':
                            var inputCalendar = $(':text', cell.data('dataEditorTemporal'));
                            params.newValue = inputCalendar.datepicker('getDate') != null ? inputCalendar.datepicker('getDate').serialize() : '';
                            newData[cellName] = params.newValue;
                            break;
                        case 'file':
                            var inputFile = $('form.file', cell.data('dataEditorTemporal'));
                            params.newValue = !isNull(inputFile.compFileupload('getData')) ? inputFile.compFileupload('getData').filename : '';
                            params.newData = !isNull(inputFile.compFileupload('getData')) ? inputFile.compFileupload('getData').data : '';
                            newData[cellName] = inputFile.compFileupload('hasFile');
                            newData[param.path] = params.newValue;
                            break;
                    }
                    newDataRow = $.extend(newDataRow, newData);
                }
            });
            return newDataRow;
        },
        _renderDataRow: function (data, row) {
            var self = this, element = self.element;
            var table = $(row).closest('table').DataTable();
            var opc = self.options;
            var colVis = table.columns().visible();
            var rowIndex = $(row).index();
            var cells = $(row).find('td');
            $.each(cells, function (index, value) {
                var cell = value;
                var settingCell = self._getCellSettings(index);
                var cellName = self.getCellName(index);
                if (settingCell != null) {
                    var newDataCell = data[settingCell.path];
                    $(cell)
                            .removeClass('editable')
                            .removeData('dataEditorTemporal')
                            .removeData('dataCeldaOriginal');
                    if (settingCell.type == 'select') {
                        var dataCell = !isEmpty(newDataCell.Nombre) ? newDataCell.Nombre.toString() : '';
                        $(cell).html(dataCell);
                    }

                    if (settingCell.type == 'date') {
                        var dataCell = newDataCell != null ? newDataCell.toString().deserializeDate().toString('dd/MM/yyyy') : '';
                        $(cell).html(dataCell);
                    }
                    if (settingCell.type == 'file') {
                        newDataCell = data[settingCell.path];
                        var nodeFile = self.getNode(settingCell.position, cellName);
                        var filename = !isNull($(nodeFile).compFileupload('getData')) ? $(nodeFile).compFileupload('getData').filename : '';
                        var pathDownload = settingCell.options.download + $(row).data('data').Id;
                        var pathDownloadTemp = settingCell.options.downloadTemp;
                        var download;
                        if (opc.bSubmit) {
                            download = $('<a class="btn-show-foto-thumb" href="' + pathDownload + '"></a>');
                        } else {
                            download = $('<a class="btn-show-foto-thumb" href="' + pathDownloadTemp + '"></a>');
                        }
                        download.text(filename);
                        $(cell).html(download);
                    }
                    if (settingCell.type == 'checkbox' || settingCell.type == 'radio') {
                        $(cell).html((newDataCell) ? settingCell.lbTrue : settingCell.lbFalse);
                    }
                    if (settingCell.type == 'text' || settingCell.type == 'numerico' || settingCell.type == 'number') {
                        $(cell).html(!isNull(newDataCell) ? newDataCell.toString() : null);
                    }
                }
            });
        },
        _crearEditor: function (conf, cell) {
            var self = this;
            conf.options = $.extend({}, conf.options);
            var dataFila = this.element.data('data');
            var valorCelda = null;
            if (conf.type == 'select') {
                valorCelda = {};
                if (!isNull(dataFila[conf.path])) {
                    valorCelda = {
                        Id: dataFila[conf.path].Id,
                        Description:
                                (!isEmpty(dataFila[conf.path].Description)) ?
                                dataFila[conf.path].Description :
                                dataFila[conf.path].DisplayName,
                        DisplayName: (!isEmpty(dataFila[conf.path].Description)) ?
                                dataFila[conf.path].Description :
                                dataFila[conf.path].DisplayName,
                        data: dataFila[conf.path]
                    }
                }
            } else {
                if (conf.type == 'File') {

                } else {
                    valorCelda = dataFila[conf.path];
                }
            }

            var editor = $('<div class="comp-editor-tabla-celda"/>').appendTo(cell);
            switch (conf.type) {
                case 'date':
                    var inputCalendar =
                            $('<input type="text" class="grid-100 editor-cell-datepicker datepicker cell-editor" />');
                    editor.append(inputCalendar);
                    conf.options.buttonImage = appData.resourcesUrl + "Images/calendar.gif";
                    inputCalendar.addClass(conf.sClass);
                    inputCalendar.attr('name', conf.name);
                    self._setAttributes(inputCalendar, conf.aAttr);
                    inputCalendar.compDatepicker(conf.options);
                    inputCalendar.datepicker('setDate', valorCelda != null ? valorCelda.toString().deserializeDate() : '');
                    break;
                case 'text':
                    var inputText = $('<input  type="text" class="grid-100 editor-cell-text cell-editor" />');
                    inputText.val(valorCelda).addClass(conf.sClass);
                    inputText.attr('name', conf.name);
                    self._setAttributes(inputText, conf.aAttr);
                    editor.append(inputText);

                    break;
                case 'checkbox':
                    var inputCheckbox = $('<input  type="checkbox" class="grid-10 editor-cell-checkbox cell-editor" />');
                    inputCheckbox.prop('checked', valorCelda)
                                 .attr('name', conf.name);

                    editor.append(inputCheckbox);
                    break;
                case 'radio':
                    editor
                            .append(
                                    $('<input  type="radio" class="grid-10 editor-cell-checkbox cell-editor" />')
                                    .attr('checked', valorCelda));
                    break;
                case 'number':
                    var inputSpinner = $('<input type="text" class="grid-100 cell-editor" />');
                    inputSpinner.addClass(conf.sClass);
                    inputSpinner.attr('name', conf.name);
                    self._setAttributes(inputSpinner, conf.aAttr);
                    editor.append(inputSpinner);
                    if (conf.spinner != null && conf.spinner) {
                        inputSpinner.spinner(conf.options);
                    }
                    conf.options.autoNumeric != null ? inputSpinner.autoNumeric(conf.options.autoNumeric) : inputSpinner.autoNumeric();
                    inputSpinner.autoNumeric('set', valorCelda);
                    break;
                case 'numerico':
                    var inputNumerico = $('<input  type="text" class="grid-100 editor-cell-text cell-editor" />')
                            .val(valorCelda)
                            .addClass(conf.sClass);
                    self._setAttributes(inputSpinner, conf.aAttr);
                    editor.append(inputNumerico);
                    break;
                case 'select':
                    var inputCombobox = $('<select class="grid-90 combobox cell-editor" />');
                    self._setAttributes(inputCombobox, conf.aAttr);
                    editor.append(inputCombobox);
                    conf.options.textOverlabel = "";
                    inputCombobox.addClass(conf.sClass);
                    inputCombobox.attr('name', conf.name);
                    if (!isNull(conf.api) && conf.api) {
                        inputCombobox.combobox(defaultApiCombobox(conf.options));
                    } else {
                        inputCombobox.combobox(DefaultCombobox(conf.options));
                    }
                    if (isNull(valorCelda) || isNull(valorCelda.Id)) {
                        inputCombobox
                                .combobox('setId', null)
                                .combobox('setValue', "")
                                .combobox('setData', null);
                    } else {
                        inputCombobox
                                .combobox('setId', valorCelda.Id)
                                .combobox('setValue', valorCelda.DisplayName)
                                .combobox('setData', valorCelda.data);
                    }
                    break;
                case 'file':
                    var inputFileUpload =
                            $('<div class="box-fileupload left grid-100"> </div>');
                    var file = $('<form action="#" class="file" ></form>');
                    file.addClass(conf.sClass);
                    file.attr('name', conf.name);
                    conf.options.bEditable = true;
                    file.compFileupload(conf.options);
                    file.attr('action', conf.options.upload);
                    if (!isNull(dataFila[conf.path]) && !dataFila[conf.path].isEmpty()) {
                        file.compFileupload('setFile',
                                {
                                    filename: !isEmpty(dataFila[conf.path]) ? dataFila[conf.path] : '',
                                    title: 'download',
                                    url: conf.options.download + dataFila.Id,
                                });
                    }
                    inputFileUpload.append(file);
                    editor.append(inputFileUpload);
                    break;
            }
            return editor;
        },
        _createEditButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return $('<span />')
                    .addClass('btn-editar btn-editor ui-icon ui-icon-pencil ')
                .addClass(opc.sClassButtons)
                    .css('display', 'inline-block')
                    .attr('title', 'Editar')
                    .click(function () {
                        self._edicion(_this);
                    });
        },
        _setAttributes: function (element, attributes) {
            if (attributes != null) {
                $.each(attributes, function (index, value) {
                    var val = value;
                    if (val instanceof RegExp) {
                        val = val.source;
                    }
                    $(element).attr(index, val);
                });
            }
        },
        _createSaveButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var cellsEdit = $(this).find('td.edit');
            return $('<span />')
                    .addClass(' btn-succes btn-editor ui-icon ui-icon-check submit')
                    .addClass(opc.sClassButtons)
                    .css('display', 'inline-block')
                    .attr('title', 'Guardar')
                    .click(function (event) {
                        if (opc.validate != null) {
                            var valid = $(self.element).valid();
                            if (!opc.validator.errorList.length && valid) {
                                self._guardar(_this);
                            }
                        } else {
                            self._guardar(_this);
                        }
                    });
        },
        _createCancelButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;

            return $('<span />')
                    .addClass('btn-cancelar btn-editor ui-icon ui-icon-close ')
                    .addClass(opc.sClassButtons)
                    .attr('title', 'Cancelar')
                    .css('display', 'inline-block')
                    .click(function () {
                        var dataRow = _this.data('data');
                        var result = opc.fnCancel != null ? opc.fnCancel(dataRow) : true;
                        if (result) {
                            if (opc.bSubmit) {
                                self._hideToolBar($(_this).find('td'));
                            } else {
                                var toolbar = $(_this).find('.box-editor-table');
                                toolbar.find('.btn-editar').show();
                                toolbar.find('.btn-eliminar').show();
                                toolbar.find('.btn-show').show();
                                toolbar.find('.btn-succes').hide();
                                toolbar.find('.btn-cancelar').hide();
                            }
                            self._cancelar(_this);
                        }
                    });

        },
        _createDeleteButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return $('<span />')
                    .addClass('btn-eliminar btn-editor ui-icon 	ui-icon-trash')
                    .addClass(opc.sClassButtons)
                    .css('display', 'inline-block')
                    .attr('title', 'Eliminar')
                    .click(function () {
                        var dataRow = $(_this).data('data');
                        var result = opc.fnBeforeDelete != null ? opc.fnBeforeDelete($(_this)) : true;

                        if (result) {
                            self.fnDelete(dataRow.Id);
                        }
                    });
        },
        _createShowButton: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            return $('<span />')
                    .addClass('btn-show btn-editor  ui-icon ui-icon-newwin')
                    .addClass(opc.sClassButtons)
                    .attr('title', 'Cancelar')
                    .css('display', 'inline-block')
                    .click(function () {
                        if (opc.fnShow != null) {
                            opc.fnShow();
                        }
                    });
        },
        _enter: function (cell) {
            var self = this;
            $(cell).find('input.cell-editor:visible , .ui-spinner-input:visible, .editor-cell-datepicker, .fileupload-buttonbar')
                    .on('keypress', function (e) {
                        if (e.which == '13') {
                            self.btnSave.click();
                            e.preventDefault();
                        }
                    });
        },
        _merge: function (newdata) {
            var self = this, element = self.element, opc = self.options;
            var merge = {};
            $.extend(merge, newdata);
            $.each(merge, function (index, value) {
                var key = opc.columns[index];
                if (key != undefined && key.path != undefined && key.path.lenght) {
                    delete merge[index];
                }
            });
            return merge;
        },
        getNode: function (col, keyName) {

            var self = this,
                    opc = self.options;
            var type = opc.columns[keyName].type;

            var celda = $(self.element).find('td').eq(col);

            var element = null;
            switch (type) {
                case 'text':
                    break;
                case 'checkbox':
                    break;
                case 'number':
                    element = celda.find('input.ui-spinner-input');
                    break;
                case 'numerico':
                    break;
                case 'select':
                    element = celda.find('select.combobox');
                    if (!element.length) {
                        element = celda.find('input.combobox');
                    }
                    break;
                case 'date':
                    element = celda.find('input.datepicker');
                    break;
                case 'file':
                    element = celda.find('form');
                    break;
            }
            return element;
        },
        reset: function () {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            if (self.btnCancelar != null) {
                self.btnCancelar.click();
            }
        },
        fnDelete: function (id) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var buttons = {};
            var popup = null;
            var rowRemove = $(_this);
            var table = $($(_this).closest('table')).DataTable();
            buttons[Globalize.localize('TextYes')] = function () {
                var popup = $(this);
                if (self.options.bSubmit) {
                    popup.block();
                    $.ajax({
                        url: opc.onDelete,
                        data: $.toJSON({
                            Ids: id
                        }),
                        success: function (data) {
                            popup.unblock();
                            if (data.HasErrors) {
                                showErrors(data.Errors);
                                popup.dialog('close');
                            } else {
                                popup.dialog('close');
                                opc.table.table('update');
                                showMessage(Globalize.localize("MessageRemovedOK"), true);
                                if (opc.fnDelete != null) {
                                    opc.fnDelete(rowRemove);
                                }
                            }
                        }
                    });
                } else {
                    var callback = function (result) {
                        popup.dialog('close');
                        if (result) {
                            table.row(_this).remove().draw();
                        }
                    }
                    if (opc.fnDelete != null) {
                        opc.fnDelete(rowRemove, true, callback);
                    }
                }
            };
            buttons[Globalize.localize('TextNo')] = function () {
                _thisbutton = $(this);
                var callbackclose = function () {
                    _thisbutton.dialog('close');
                }
                if (opc.fnDelete != null) {
                    opc.fnDelete(rowRemove, false, callbackclose);
                }
            };
            showCustomMessage({
                message: Globalize.localize('MessageConfirmRemoveEntry'),
                buttons: buttons,
                open: function () {
                    popup = $(this);
                }
            });

        },
        fnSave: function (olddata, newdata, callback) {
            var self = this,
                    _this = self.element,
                    opc = self.options;
            var newDataRow = self._merge(newdata);
            var oldaDataRow = self._merge(olddata);
            opc.table.block();
            $.ajax({
                cache: false,
                type: "POST",
                contentType: "application/json",
                url: opc.onSave,
                data: $.toJSON(newDataRow),
                success: function (data) {
                    opc.table.unblock();

                    if (data.HasErrors) {
                        showErrors(data.Errors);
                        callback(oldaDataRow, data.Errors);
                    } else {
                        showMessage(Globalize.localize("MessageSavedOK"), true);
                        opc = self.options;
                        callback(newDataRow, null);
                    }
                }
            }).fail(function () {
                callback(oldaDataRow);
            });
        }
    });
})(jQuery);
/******************************************************************************/


$.showErrorsSetup = function (opc_user) {
    $.extend($.showErrorsSetup.defaults, opc_user);
};
$.showErrorsSetup.defaults = {
    title: 'Error',
    width: 400,
    modal: true,
    autoResize: true,
    fluid: true,
    resizable: true,
    autoReposition: true,
    minWidth: 300,
    maxWidth: 400,
    maxHeight: scriptData.windowHeight,
    position: {
        my: "center center",
        at: "center center",
        of: window,
        collision: "fit"
    },
    create: function (event, ui) {
        $(event.target).parent().css('position', 'fixed');
        $(event.target).parent().draggable({ containment: "window", cursor: "move" });
    }
};
/**
 * Muestra una lista de errores o una lista advertencias dentro de un popup
 * @param {array} errors Lista de errores
 * @param {array} warnings Lista de advertencias
 * @param {function} fnClose Funcion que se ejecutara cuando cierre el POPUP
 */
function showErrors(errors, warnings, fnClose) {
    var contenido = $('<ul class="list-errors" />');

    contenido.append(errors != null ? $.map(errors, function (error) {
        return '<li class="item-error">' + error + '</li>';
    }) : null);
    contenido.append(warnings != null ? $.map(warnings, function (warning) {
        return '<li class="item-warning">' + warning + '</li>';
    }) : null);

    var opc = {
        buttons: {
            'Cerrar': function () {
                $(this).dialog('close');
            }
        },
        close: fnClose
    };
    opc = $.extend({}, $.showErrorsSetup.defaults, opc);
    var _popup = $('<div id="dialog-errors" />')
            .append(contenido)
            .dialog(opc);
    _popup.data('dialog', opc);
    _popup.dialog("option", "position", opc.position);
    _popup.dialog('open');

    responsiveDialog();
    _popup.on("dialogclose", function (event, ui) {
        if (_popup.length) {
            _popup.dialog('destroy');
            _popup.remove();
        }
    });
    //fixDialogZIndex(_popup);
}

$.showMessagesSetup = function (opc_user) {
    $.extend($.showMessagesSetup.defaults, opc_user);
};
$.showMessagesSetup.defaults = {
    title: 'Error',
    width: 400,
    modal: true,
    autoResize: true,
    fluid: true,
    resizable: true,
    autoReposition: true,
    minWidth: 300,
    maxWidth: 400,
    maxHeight: scriptData.windowHeight,
    position: {
        my: "center center",
        at: "center center",
        of: window,
        collision: "fit"
    },
    create: function (event, ui) {
        $(event.target).parent().css('position', 'fixed');
        $(event.target).parent().draggable({ containment: "window", cursor: "move" });
    }
};
/**
 * Muestra una lista de mensajes de informacion dentro de un popup
 * @param {array} messages Lista de mensajes
 * @param {function} fnClose Funcion que se ejecutara cuando cierre el POPUP
 */
function showMessages(messages, fnClose) {
    var contenido = $('<ul class="list-errors" />');

    contenido.append(messages != null ? $.map(messages, function (message) {
        return '<li class="item-message">' + message + '</li>';
    }) : null);

    var opc = {
        buttons: {
            'Cerrar': function () {
                $(this).dialog('close');
            }
        },
        close: fnClose
    };

    opc = $.extend({}, $.showMessagesSetup.defaults, opc);
    var _popup = $('<div id="dialog-errors" />')
            .append(contenido)
            .dialog(opc);
    _popup.data('dialog', opc);
    _popup.dialog("option", "position", opc.position);
    responsiveDialog();
    _popup.on("dialogclose", function (event, ui) {
        if (_popup.length) {
            _popup.dialog('destroy');
            _popup.remove();
        }
    });
    //fixDialogZIndex(_popup);
    _popup.dialog('open');
}

function showCustomErrors(params) {
    var contenido = $('<ul class="list-errors" />');

    contenido.append(params.errors != null ? $.map(params.errors, function (error) {
        return '<li class="item-error">' + error + '</li>';
    }) : null);
    contenido.append(params.warnings != null ? $.map(params.warnings, function (warning) {
        return '<li class="item-warning">' + warning + '</li>';
    }) : null);
    contenido.append(params.informations != null ? $.map(params.informations, function (information) {
        return '<li class="item-message">' + information + '</li>';
    }) : null);
    var opc = {
        buttons: {
            'Cerrar': function () {
                $(this).dialog('close');
            }
        }
    };
    opc = $.extend({}, $.showErrorsSetup.defaults, opc, params);

    var _popup = $('<div id="dialog-errors" />')
            .append(contenido)
            .dialog(opc);
    _popup.data('dialog', opc);
    _popup.dialog("option", "position", opc.position);
    _popup.dialog('open');
    responsiveDialog();
    //fixDialogZIndex(_popup);
    _popup.on("dialogclose", function (event, ui) {
        if (_popup.length) {
            _popup.dialog('destroy');
            _popup.remove();
        }
    });
}

$.showMessageSetup = function (opc_user) {
    $.extend($.showMessageSetup.defaults, opc_user);
};
$.showMessageSetup.defaults = {
    title: 'Mensaje',
    modal: true,
    timeOut: 2000,
    autoResize: true,
    fluid: true,
    resizable: true,
    autoReposition: true,
    maxHeight: scriptData.windowHeight,
    minWidth: 300,
    maxWidth: 400,
    position: {
        my: "center center",
        at: "center center",
        of: window,
        collision: "fit"
    },
    create: function (event, ui) {
        $(event.target).parent().css('position', 'fixed');
        $(event.target).parent().draggable({ containment: "window", cursor: "move" });
    }
};

function closeShowMessage() {
    $('#dialog-mensaje').dialog('close');
}

function showMessage(text, autoClose, fnClose) {
    var popup = $('<div id="dialog-mensaje" />').append('<div class="mensaje" />');

    autoClose = isNull(autoClose) ? false : autoClose;
    var opc = {
        open: function (event, ui) {
            $('.mensaje', popup).html(isNull(text) ? '' : trim(text));
            if (autoClose) {
                setTimeout(function () {
                    popup.dialog("close");
                }, $.showMessageSetup.defaults.timeOut);
            }
            $(popup).on('dialogclose', function () {
                if (fnClose != null) {
                    fnClose();
                }
            });
        },
        close: function (event, ui) {
            $('.mensaje', popup).empty();
        }
    };
    opc = $.extend($.showMessageSetup.defaults, opc);

    popup.dialog(opc);
    popup.data('dialog', opc);
    popup.dialog("option", "position", opc.position);
    popup.dialog('open');
    responsiveDialog();
    //fixDialogZIndex(popup);
    popup.on("dialogclose", function (event, ui) {
        if (popup.length) {
            popup.dialog('destroy');
            popup.remove();
        }
    });
}

$.showCustomMessageSetup = function (opc_user) {
    $.extend($.showCustomMessageSetup.defaults, opc_user);
};
$.showCustomMessageSetup.defaults = {
    message: 'Mensaje',
    title: 'Mensaje personalizado',
    modal: true,
    buttons: null,
    autoResize: true,
    fluid: true,
    resizable: true,
    autoReposition: true,
    minWidth: 300,
    maxWidth: 400,
    maxHeight: scriptData.windowHeight,
    position: {
        my: "center center",
        at: "center center",
        of: window,
        collision: "fit"
    },
    create: function (event, ui) {
        $(event.target).parent().css('position', 'fixed');
        $(event.target).parent().draggable({ containment: "window", cursor: "move" });
    }
};
/**
 * Muestra un popup con un mensaje, los parametros son los mismos que se utilizan para crear un
 *  popup tipo dialog de jqueryui
 *
 * @param    {Object} params Parametros comundes de un jquery.dialog
 * @param    {String} params.text Mensaje que se mostrara dentro del POPUP
 */
function showCustomMessage(params) {
    var popup = $('<div class="dialog" />');
    var opc = $.extend({}, $.showCustomMessageSetup.defaults, params);

    popup.dialog(opc);
    popup.data('dialog', opc);
    popup.append('<div class="text-message">' + opc.message + '</div>');
    popup.dialog('option', 'position', opc.position);
    popup.dialog('open');
    responsiveDialog();
    //fixDialogZIndex(popup);
    popup.on("dialogclose", function (event, ui) {
        if (popup.length) {
            popup.dialog('destroy');
            popup.remove();
        }
    });
}

$.showConfirmationSetup = function (opc_user) {
    $.extend($.showConfirmationSetup.defaults, opc_user);
};
$.showConfirmationSetup.defaults = {
    message: 'MENSAJE',
    title: 'TITULO CONFIRMACION',
    buttonNameYes: 'SI',
    buttonNameNo: 'NO',
    buttonFunctionYes: function () {
    },
    buttonFunctionNo: function () {
        $(this).dialog('close');
    },
    modal: true,
    buttons: null,
    autoResize: true,
    fluid: true,
    resizable: true,
    autoReposition: true,
    minWidth: 300,
    maxWidth: 400,
    maxHeight: scriptData.windowHeight,
    position: {
        my: "center",
        at: "center center",
        of: window,
        collision: "fit"
    },
    create: function (event, ui) {
        $(event.target).parent().css('position', 'fixed');
        $(event.target).parent().draggable({ containment: "window", cursor: "move" });
    }
};
/**
 * Muestra un popup de confirmacion,
 * los parametros son los mismos que se utilizan
 * para crear un popup tipo dialog de jqueryui
 *
 * @param {Object} params Parametros comundes de un jquery.dialog
 * @param {String} params.message Texto a mostrar dentro del POPUP
 * @param {String} params.title Titulo del POPUP
 * @param {String} params.buttonNameYes texto del nombre del boton YES del POPUP
 * @param {String} params.buttonNameNo texto del nombre del boton NO del POPUP
 * @param {function} params.buttonFunctionYes funcion del boton YES del POPUP
 * @param {function} params.buttonFunctionNo funcion del boton NO del POPUP
 */
function showConfirmation(params) {
    var opc = $.extend({}, $.showConfirmationSetup.defaults, params);
    var popup = $('<div class="dialog" />');

    if (isNull(opc.buttons)) {
        opc.buttons = {};
        opc.buttons[opc.buttonNameYes] = opc.buttonFunctionYes;
        opc.buttons[opc.buttonNameNo] = opc.buttonFunctionNo;
    }
    popup.dialog(opc);
    popup.data('dialog', opc);
    popup.append('<div class="text-message">' + opc.message + '</div>');
    popup.dialog('option', 'position', opc.position);
    popup.dialog('open');
    responsiveDialog();
    //fixDialogZIndex(popup);
    popup.on("dialogclose", function (event, ui) {
        if (popup.length) {
            popup.dialog('destroy');
            popup.remove();
        }
    });
}

$.closePopup = function () {
    $(".ui-dialog-content").dialog("close");
};
$.showPopupPageSetup = function (opc_user) {
    $.extend($.showPopupPageSetup.defaults, opc_user);
};
$.showPopupPageSetup.defaults = {
    title: 'Mensaje personalizado',
    modal: true,
    buttons: null,
    url: null,
    scroll: 'no',
    open: function (event, ui) {
        responsiveDialog();
    },
    position: {
        my: "center",
        at: "center",
        of: window,
        collision: "fit"
    },
    height: 'auto',
    maxHeight: scriptData.windowHeight,
    autoResize: true,
    fluid: true,
    resizable: true,
    autoReposition: true,
    minWidth: 320,
    maxWidth: 1000,
    draggable: true,
    closeOnEscape: false,
    create: function (event, ui) {
        $(event.target).parent().css('position', 'fixed');
        $(event.target).parent().draggable({ containment: "window", cursor: "move" });
    }
};
/**
 * Muestra una pagina html dentro de un popup,
 * los parametros son los mismos que se utilizan
 * para crear un popup tipo dialog de jqueryui
 *
 * @param {Object} params Parametros comundes de un jquery.dialog
 * @param {string} params.title Titulo del popup
 * @param {Object} params.buttons Lista de acciones por boton dentro del popup
 * @param {string} params.url Direccion url fuente de la pagina html
 */
function showPopupPage(params, isIFrame, success) {
    isIFrame = isNull(isIFrame) ? false : isIFrame;
    var opc = $.extend({}, $.showPopupPageSetup.defaults, params);

    var popup = $('<div class="dialog" />');
    popup.data('dialog', opc);
    popup.empty();
    if (isIFrame) {
        var frame = $('<iframe frameborder="0" scrolling="no" width="100%" height="100%" />');
        frame.attr('src', opc.url);
        frame.attr('scrolling', opc.scroll);
        var heightPopup = popup.dialog('widget').outerHeight() - popup.outerHeight();
        popup.append(frame);
        if ($.isFunction($.blockUI)) {
            popup.block();
        }
        frame.load(function () {
            if ($.isFunction($.blockUI)) {
                popup.unblock();
            }
            if (!isNull(success) && $.isFunction(success)) {
                success();
            }
            try {
                heightPopup += this.contentWindow.document.body.offsetHeight;
            } catch (e) {
            }

            if (isNull(opc.height)) {
                popup.dialog('option', 'height', heightPopup);
            }
        });
        // fixDialogZIndex(popup);
        responsiveDialog();

    } else {
        if ($.isFunction($.blockUI)) {
            popup.block();
        }
        $.ajax({
            url: opc.url,
            success: function (data) {
                if ($.isFunction($.blockUI)) {
                    popup.unblock();
                }
                if (!isNull(data)) {
                    popup.html(data);
                    popup.dialog(opc);
                    if (!isNull(success) && $.isFunction(success)) {
                        success();
                    }
                    //fixDialogZIndex(popup);
                    responsiveDialog();
                    popup.dialog("option", "position", opc.position);
                    popup.on("dialogclose", function (event, ui) {
                        if (popup.length) {
                            popup.dialog('destroy');
                            popup.remove();
                        }
                    });
                }
            }
        });
    }
}
function responsiveDialog() {
    var $visible = $(".ui-dialog:visible");
    $visible.each(function () {
        var $this = $(this);
        var dialog = $this.find(".ui-dialog-content");
        var options = $this.find(".ui-dialog-content").data("dialog");
        dialog.dialog("option", "resizable", false);
        if (!isNull(options) && options != undefined) {
            if (options.fluid) {
                var wWidth = $(window).width();
                if ((wWidth < (parseInt(options.maxWidth)))) {
                    $this.css("max-width", "90%");
                    dialog.find('.grid-container').addClass('mobile').removeClass('screen');
                } else {
                    $this.css("width", options.width + "px");
                    $this.css("max-width", options.maxWidth + "px");
                    //$this.css("max-height", options.maxHeight + "px");
                    dialog.find('.grid-container').removeClass('mobile');
                }
            }
            dialog.dialog("option", "position", options.position);
        }
        dialog.dialog("option", "position", {
            my: "center",
            at: "center",
            of: window,
            collision: "fit"
        });
        dialog.dialog("option", "maxHeight", $(window).height());
    });
}
function showImage(params) {
    var paramsDefault = {
        title: 'Mensaje Media',
        buttons: null,
        modal: true,
        url: '',
        open: function () {
        }
    };
    var opc = $.extend([], paramsDefault, params);
    var popup = $('<div id="dialog-media" />');

    popup
            .empty()
            .addClass('dialog-media')
            .dialog(opc);

    var image = $('<img src="" />');
    image.attr('src', opc.url);
    $.blockUI();
    if ($.browser.msie) {
        image.ready(function () {
            imageSuccess();
        });
    } else {
        image.load(function () {
            imageSuccess();
        });
    }

    function imageSuccess() {
        $.unblockUI();
        popup.html(image);
        var pddHorizontal = popup.innerWidth() - popup.width();
        var pddVertical = popup.innerHeight() - popup.height();
        var width = image.width() + pddHorizontal;
        var height = image.height() + pddVertical;

        popup.dialog('option', 'width', width);
        popup.dialog('option', 'height', 'auto');
        popup.dialog('option', 'position', 'center');
        popup.dialog('open');
        //fixDialogZIndex(popup);
        responsiveDialog();
    }

}

/**
 * Muestra un mensaje posicionado en la parte superior de la pagina
 *
 */
function showSimpleMessage(params) {
    var contenedorExistente = $('body').find('box-simple-message'),
            contenedor = null;

    if (contenedorExistente.length == 0)
        contenedor = $('<div class="box-simple-message"></div>');
    else
        contenedor = contenedorExistente;

    contenedor.html(params.message).appendTo('body');

    var mayorIndex = 0;
    $.each(contenedor.siblings(':visible'), function (item, value) {
        if ($(value).zIndex() > mayorIndex) {
            mayorIndex = $(value).zIndex();
        }
    });
    contenedor.zIndex(mayorIndex);

    setTimeout(function () {
        contenedor.fadeOut('slow', function () {
            contenedor.remove();
        });
    }, 1000);
}


/**
 * Adiciona los popups necesarios para el uso de las funciones que utilizan popups
 */
function initPopups() {
    //ANTES ESTABAN LOS DIVs DE LOS POPUPs
    //YA NO EXISTEN PORQUE CAUSABAN PROBLEMAS
}

/**
 * Adiciona los popups necesarios para el uso de las funciones que utilizan popups
 */
function initPopups() {
    //ANTES ESTABAN LOS DIVs DE LOS POPUPs
    //YA NO EXISTEN PORQUE CAUSABAN PROBLEMAS
}

/**
 * Creacion basica de un combobox
 */
function DefaultCombobox(conf) {
    var params = {};

    if (isNull(conf)) {
        return {};
    }

    if (!$.isFunction(conf.fnParams)) {
        conf.fnParams = function () {
            return {};
        };
    } else {
        if (!$.isPlainObject(conf.fnParams())) {
            conf.fnParams = function () {
                return {};
            };
        }
    }

    if (!$.isFunction(conf.fnPrecondition)) {
        conf.fnPrecondition = function () {
            return true;
        };
    }

    conf.changeParams = isNull(conf.changeParams) ? {} : conf.changeParams;
    conf.changeParams.SearchText = isNullOrEmpty(conf.changeParams.SearchText) ? 'Descripcion,Description' : conf.changeParams.SearchText;
    conf.changeParams.PageIndex = isNullOrEmpty(conf.changeParams.PageIndex) ? 'Pagina,PageIndex' : conf.changeParams.PageIndex;
    conf.successData = isNull(conf.successData) ? {} : conf.successData;
    conf.successData.Id = isNullOrEmpty(conf.successData.Id) ? 'Id' : conf.successData.Id;
    conf.successData.Description = isNullOrEmpty(conf.successData.Description) ? 'Description,Descripcion' : conf.successData.Description;

    conf = $.extend({}, {
        fnLoadServerData: function (elem, request, response) {
            if (conf.fnPrecondition()) {
                if (elem.options.messageLoading) {
                    elem.box.append(elem.options.messageLoading);
                }

                var dataParams = conf.fnParams();
                $.each(conf.changeParams.SearchText.split(','), function (i, v) {
                    dataParams[v] = request.term;
                });
                $.each(conf.changeParams.PageIndex.split(','), function (i, v) {
                    dataParams[v] = elem.getCurrentPage();
                });

                var urlAjax =
                $.ajax({
                    url: $.isFunction(conf.url) ? conf.url() : conf.url,
                    data: $.toJSON(dataParams),
                    success: function (data) {
                        if (elem.options.messageLoading) {
                            elem.options.messageLoading.remove();
                        }
                        if (data.IsError || data.HasErrors) {
                            showErrors(data.Errors);
                        } else {

                            var totalPages = 0;
                            if(conf.fnloadPagination){
                                totalPages = conf.fnloadPagination(data);
                            }else{
                                totalPages = data.Pagination.TotalPages;
                            }
                            elem.loadPagination({
                                totalPages: totalPages
                            });

                            var fnValueProperty = function (obj, propertyes, index) {
                              if (index > propertyes.length) return '';
                              if (!isNull(obj[propertyes[index]]) && obj[propertyes[index]].toString() != '') return obj[propertyes[index]];
                              return fnValueProperty(obj, propertyes, index + 1);
                            };

                            var textMappings = conf.successData.Description.split(',');
                            var idMappings = conf.successData.Id.split(',');

                            var responseData = null;
                            if(conf.response){
                                responseData = conf.response(data);
                            }else{
                                responseData = data.Data;
                            }
                            response($.map(responseData, function (item) {
                                var text = fnValueProperty(item, textMappings, 0);
                                var id = fnValueProperty(item, idMappings, 0);
                                item.Description = text;

                                var itemLabel = highlightText(isNull(item.Descripcion) ?
                                                  (!isNull(conf.itemLength) ? summary(item.Description, conf.itemLength, '...') : item.Description) :
                                                  (!isNull(conf.itemLength) ? summary(item.Descripcion, conf.itemLength, '...') : item.Descripcion),
                                                   request.term);
                                var itemValue = isNull(item.Descripcion) ?
                                        item.Description :
                                        item.Descripcion;

                                if (!isNull(conf.fnPreloadLabel)) {
                                    itemLabel = conf.fnPreloadLabel(item);
                                }

                                if (!isNull(conf.fnPreloadValue)) {
                                    itemValue = conf.fnPreloadValue(item);
                                }
                                return {
                                    label: itemLabel,
                                    value: itemValue,
                                    id: id,
                                    option: this,
                                    data: item
                                };
                            }));
                        }
                    }
                });
            }
        }
    }, conf);

    return conf;
}

/**
 * Configuración resumida para los Comboboxs que utilicen servicios WebAPI
 */
function defaultApiCombobox(conf) {
    var params = {};

    if (isNull(conf)) {
        return {};
    }

    if (!$.isFunction(conf.fnParams)) {
        conf.fnParams = function () {
            return {};
        };
    } else {
        if (!$.isPlainObject(conf.fnParams())) {
            conf.fnParams = function () {
                return {};
            };
        }
    }

    if (!$.isFunction(conf.fnPrecondition)) {
        conf.fnPrecondition = function () {
            return true;
        };
    }

    conf.changeParams = isNull(conf.changeParams) ? {} : conf.changeParams;
    conf.changeParams.SearchText = isNullOrEmpty(conf.changeParams.SearchText) ? 'searchText' : conf.changeParams.SearchText;
    conf.changeParams.PageIndex = isNullOrEmpty(conf.changeParams.PageIndex) ? 'pageIndex' : conf.changeParams.PageIndex;
    conf.successData = isNull(conf.successData) ? {} : conf.successData;
    conf.successData.Id = isNullOrEmpty(conf.successData.Id) ? 'Id' : conf.successData.Id;
    conf.successData.Description = isNullOrEmpty(conf.successData.Description) ? 'Description,Descripcion' : conf.successData.Description;
    
    conf = $.extend({}, {
        fnLoadServerData: function (elem, request, response) {
            if (conf.fnPrecondition()) {
                if (elem.options.messageLoading) {
                    elem.box.append(elem.options.messageLoading);
                }

                var dataParams = conf.fnParams();
                var tempParams = [];
                $.each(dataParams, function(i, v) {
                    tempParams.push(i + '=' + v);
                });
                var urlExtraParams = tempParams.join('&');

                var urlSearch = conf.changeParams.SearchText.split(',').map(function (value) {
                    return value + '=' + request.term;
                }).join('&');

                var urlPageIndex = conf.changeParams.PageIndex.split(',').map(function (value) {
                    return value + '=' + elem.getCurrentPage();
                }).join('&');

                var urlComplete = '';
                if (!isNullOrEmpty(urlSearch)) urlComplete = urlSearch;
                if (!isNullOrEmpty(urlPageIndex)) urlComplete += '&' + urlPageIndex;
                if (!isNullOrEmpty(urlExtraParams)) urlComplete += '&' + urlExtraParams;

                $.ajax({
                    url: ($.isFunction(conf.url) ? conf.url() : conf.url) + (!isNullOrEmpty(urlComplete) ? '?' + urlComplete : ''),
                    type: 'GET',
                    success: function (data, status, xhr) {
                        if (elem.options.messageLoading) {
                            elem.options.messageLoading.remove();
                        }

                        var totalPages = xhr.getResponseHeader("X-TotalPages")
                        if(conf.fnloadPagination){
                            totalPages = conf.fnloadPagination(data, status, xhr);
                        }
                        elem.loadPagination({
                            totalPages: totalPages
                        });

                        var fnValueProperty = function (obj, propertyes, index) {
                          if (index > propertyes.length) return '';
                          if (!isNull(obj[propertyes[index]]) && obj[propertyes[index]].toString() != '') return obj[propertyes[index]];
                          return fnValueProperty(obj, propertyes, index + 1);
                        };

                        var textMappings = conf.successData.Description.split(',');
                        var idMappings = conf.successData.Id.split(',');

                        var responseData = data;
                        if(conf.response){
                            responseData = conf.response(data);
                        }
                        
                        response($.map(responseData, function (item) {
                            var text = fnValueProperty(item, textMappings, 0);
                            var id = fnValueProperty(item, idMappings, 0);
                            item.Description = text;

                            var itemLabel = highlightText(isNull(item.Descripcion) ?
                                              (!isNull(conf.itemLength) ? summary(item.Description, conf.itemLength, '...') : item.Description) :
                                              (!isNull(conf.itemLength) ? summary(item.Descripcion, conf.itemLength, '...') : item.Descripcion),
                                               request.term);
                            var itemValue = isNull(item.Descripcion) ?
                                    item.Description :
                                    item.Descripcion;

                            if (!isNull(conf.fnPreloadLabel)) {
                                itemLabel = conf.fnPreloadLabel(item);
                            }
                            if (!isNull(conf.fnPreloadValue)) {
                                itemValue = conf.fnPreloadValue(item);
                            }
                            return {
                                label: itemLabel,
                                value: itemValue,
                                id: id,
                                option: this,
                                data: item
                            };
                        }));
                    }
                });
            }
        }
    }, conf);

    return conf;
}

/**
 * Devuelve los milisegundos que representa la fecha de un Datetime
 */
function convertTimestampToDate(ms) {
    convertDateServerToClient(ms);
}

function convertDateServerToClient(ms) {
    if (isNull(ms)) {
        return null;
    } else {
        if (typeof ms === 'string') {
            ms = parseInt(ms);
        }
    }

    var date = new Date(ms);
    var gmt = date.getTimezoneOffset() * (60 * 1000);
    date.setTime(date.getTime() + gmt);
    return date;
}
/**
 * Devuelve una fecha que representa los milisegundos de un Timestamp
 */
function convertDateToTimestamp(date) {
    convertDateClientToServer(date);
}

function convertDateClientToServer(date) {
    if (isNull(date)) {
        return null;
    }
    var gmt = date.getTimezoneOffset() * (60 * 1000);
    var newDate = new Date(date);
    newDate.setTime(date.getTime() - gmt);
    return newDate.getTime();
}
/**
 * Limpia las entidades generados en los mensajes de Globalizacion
 */
function CleanGlobalize() {
    var ta = $("<textarea />");
    $.each(Globalize.culture().messages, function (item, value) {
        Globalize.culture().messages[item] = ta.html(value).val();
    });
}
var ADAPT_CONFIG = null;

function loadAdaptConfig(url) {
    ADAPT_CONFIG = {
        path: url,
        dynamic: true,
        range: [
            '0px    to 760px  = mobile.min.css',
            '760px  to 980px  = 720.min.css',
            '980px  to 1280px = 960.min.css',
            '1280px to 1600px = 1200.min.css',
            '1600px to 1940px = 1560.min.css',
            '1940px to 2540px = 1920.min.css',
            '2540px           = 2520.min.css'
        ]
    };
}
/**
 * Verifica si un año es biciesto
 * @param {integer} year
 * @returns {Boolean}
 */
function isLeapYear(year) {
    return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? true : false;
}
/* end functions */
/******************************************************************************/
/* begin plugins */
jQuery.parseQuery = function (qs, options) {
    var q = (typeof qs === 'string' ? qs : window.location.search),
            o = {
                'f': function (v) {
                    return unescape(v).replace(/\+/g, ' ');
                }
            },
    options = (typeof qs === 'object' && typeof options === 'undefined') ? qs : options,
            o = jQuery.extend({}, o, options),
            params = {};
    jQuery.each(q.match(/^\??(.*)$/)[1].split('&'), function (i, p) {
        p = p.split('=');
        p[1] = o.f(p[1]);
        params[p[0]] = params[p[0]] ? ((params[p[0]] instanceof Array) ? (params[p[0]].push(p[1]), params[p[0]]) : [params[p[0]], p[1]]) : p[1];
    });
    return params;
};

/**
 * equalizes the heights of all elements in a jQuery collection
 * thanks to John Resig for optimizing this!
 * usage: $("#col1, #col2, #col3").equalizeCols();
 */

$.fn.equalizeCols = function () {
    var height = 0,
            reset = $.browser.msie && $.browser.version < 7 ? "1%" : "auto";
    return this
            .css("height", reset)
            .each(function () {
                height = Math.max(height, this.offsetHeight);
            })
            .css("height", height)
            .each(function () {
                var h = this.offsetHeight;
                if (h > height) {
                    $(this).css("height", height - (h - height));
                }
            });

};

/**
 * Deshabilita un elemento HTML
 */
$.fn.disable = function () {
    return this.each(function () {
        if (typeof this.disabled != undefined) {
            this.disabled = true;
            $(this).addClass('disabled');
        }
    });
};
/**
 * Habilita un elemento HTML
 */
$.fn.enable = function () {
    return this.each(function () {
        if (typeof this.disabled != undefined) {
            this.disabled = false;
            $(this).removeClass('disabled');
        }
    });
};
jQuery.fn.overlabel = function () {
    this.each(function (index) {
        var label = $(this);
        var field;
        var id = this.htmlFor || label.attr('for');
        if (id && (field = document.getElementById(id))) {
            var control = $(field);
            label.addClass("overlabel-apply");
            if (field.value !== '') {
                label.hide();
                //label.css("text-indent", "-1000px");
            }
            control.focus(function () {
                label.hide(); /*label.css("text-indent", "-1000px");*/
            }).blur(function () {
                if (this.value === '') {
                    label.show();
                    //label.css("text-indent", "0px");
                }
            });
            label.click(function () {
                var label = $(this);
                var field;
                var id = this.htmlFor || label.attr('for');
                if (id && (field = document.getElementById(id))) {
                    field.focus();
                }
            });
            if (!$(field).val().isEmpty()) {
                label.hide();
            }
        }
    });
};
/**
 * Corrige el index de un elemento HTML, haciendo que este sobresalga ante el resto
 */
jQuery.fn.fixindex = function () {
    var zIndexNumber = 1000;
    this.each(function (index) {
        $(this).css('zIndex', zIndexNumber);
        zIndexNumber -= 10;
    });
};

jQuery.fn.fixindexBySiblings = function () {
    var zIndexNew = 0;
    $.each(this.siblings(), function (item, value) {
        var zIndex = $(value).css('zIndex');
        if (!isNaN(zIndex) && parseInt(zIndex) > zIndexNew) {
            zIndexNew = parseInt(zIndex) + 1;
        }
    });
    this.css('zIndex', zIndexNew);
};
/**
 * Convierte una instancia jQuery en simple HTML dentro de una cadena de caracteres
 *
 * @return {string}
 */
jQuery.fn.outerHtml = function () {
    return $($('<div></div>').html(this.clone())).html();
};
/* end plugins */
/******************************************************************************/
//SOBRECARGAS
/**
 * Verifica la cadena tiene formato de URL válida
 *
 * @returns {Boolean}
 */
String.prototype.isUrl = function () {
    var s = this;
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    return urlregex.test(s);
};
/**
 * Verifica la cadena tiene formato de URL FTP válida
 *
 * @returns {Boolean}
 */
String.prototype.isUrlFtp = function () {
    var s = this;
    var urlregex = new RegExp("^(ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    return urlregex.test(s);
};
/**
 * Verifica si la cadena esta o no vacia
 *
 * @return {Boolean}
 */
String.prototype.isEmpty = function () {
    var cadena = this;
    if (cadena !== null && cadena !== undefined) {
        if (cadena.length) {
            return false;
        }
        return true;
    }
    return true;
};
/**
 * Verifica si la cadena tiene formato de dirección electronica
 *
 * @returns {Boolean}
 */
String.prototype.isEmail = function () {
    var s = this;
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(s);
};
/**
 * Trabaja de la misma manera que el String.format() de C#
 *
 */
String.prototype.format = function () {
    var s = this,
            i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};
/**
 * Elimina todos los espacios vacios de una cadena de caracteres
 *
 */
String.prototype.allTrim = function () {
    return isNull(this) ? this : this.toString().replace(/\s/g, '');
};
/**
 * Elimina los espacios vacios del inicio y final de una cadena de caracteres
 *
 * @returns {Boolean}
 */
String.prototype.trim = function () {
    return isNull(this) ? this : this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
/**
 * Elimina los espacios vacios del inicio una cadena de caracteres
 *
 * @returns {Boolean}
 */
String.prototype.lTrim = function () {
    return this.replace(/^\s+/, '');
};
/**
 * Elimina los espacios vacios del final de una cadena de caracteres
 *
 * @returns {Boolean}
 */
String.prototype.rTrim = function () {
    return this.replace(/\s+$/, '');
};

Date.prototype.addDays = function (days) {
    days = isNull(days) ? 1 : days;
    var date = this;
    date.setDate(date.getDate() + days);
    return date;
};
/**
 * Verifica si una fecha es mayor a si mismo
 * @param {Date} date
 * @returns {Boolean}
 */
Date.prototype.isBiggerThan = function (date) {
    if (date == null)
        return false;

    if (this.getFullYear() < date.getFullYear()) {
        return false;
    } else {
        if (this.getMonth() < date.getMonth()) {
            return false;
        } else {
            if (this.getMonth() == date.getMonth() && this.getDate() <= date.getDate()) {
                return false;
            }
        }
    }
    return true;
};

if (isNull($.browser)) {
    var rwebkit = /(webkit)[ \/]([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

    var ua = navigator.userAgent.toLowerCase();
    var match = rwebkit.exec(ua) ||
            ropera.exec(ua) ||
            rmsie.exec(ua) ||
            ua.indexOf("compatible") < 0 && rmozilla.exec(ua) ||
            [];

    //$.browser = {};
    $.browser = {
        browser: match[1] || "",
        version: match[2] || "0"
    };
    $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase())
            && !/webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
}
/**
 * verifica si usamos responsiv design
 */
function isResponsiveDesign() {
    return $('.grid-container').length > 0;
}
/******************************************************************************/

$(document).ready(function () {
    responsiveTabs();
    $(window).resize(function () {
        scriptData.windowHeight = $(window).height();
        responsiveDialog();
        responsiveTabs();
    });
    $('.tabs').tabs({
        create: function () {
            $('.tabs').show();
            tabResize();
        },
        activate: function (event, ui) {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
            $($.fn.dataTable.tables(true)).DataTable().responsive.recalc();
        }
    });
    initMenuHorizontalResponsive();
});
/*
 *Menu Horizontal Responsive
 */
function initMenuHorizontalResponsive() {

    $('#main-menu > ul').addClass('active');
    var menu = $('#main-menu > ul').children();
    if (menu.length > 0) {
        $('#main-menu li').find('> span').append($('<label class="right ui-icon ui-icon-triangle-1-e"></label'));
        $('<a class="toggle-menu" href="#">&#9776;</a>')
                .appendTo('#main-menu')
                .click(function (e) {
                    $('#main-menu > ul').toggleClass('active');
                    e.preventDefault();
                });

        $('#main-menu ul li > span').on("click.menu", function () {
            if ($('a.toggle-menu:visible').length > 0) {
                $(this).parent().find('> ul').toggleClass('block');
                $(this).find('> label').toggleClass('ui-icon-triangle-1-s');
            }
        });

        $(window).on("resize", function () {
            if ($('a.toggle-menu:visible').length == 0) {
                $('#main-menu  ul li').find('> ul')
                        .removeClass('block');
                $('#main-menu  li span')
                        .find('> label')
                        .removeClass('ui-icon-triangle-1-s')
                        .addClass('ui-icon-triangle-1-e');
            }
        });
    }
}

$.fn.autoNumericSet = function (argument) {
    return this.autoNumeric('set', argument);
};
$.fn.autoNumericGet = function () {
    return this.autoNumeric('get');
};
//Por defecto deberá estar deshabilitado la opcion responsive de los datatables.
$.extend($.fn.dataTable.defaults, {
    responsive: false
});
//*********************************************************************************/
/*Responsive Tabs*/
function responsiveTabs() {
    if ($(window).width() <= 776)
        tabResize();
    else
        destroyTabsResponsive();
}

function tabResize() {
    if ($(window).width() <= 776) {
        var tabs = $('div.ui-tabs');
        $.each(tabs, function (index, value) {
            if (!($(value).hasClass('ui-accordion'))) {

                var panels = $(value).find('>div.ui-tabs-panel');
                var headers = $(value).find('>ul.ui-tabs-nav')
                        .hide();
                $(value).addClass('ui-accordion');
                panels.each(function (ipanel, vPanel) {

                    var tabsHeder =
                            $('<h3 class="ui-accordion-header ui-corner-all ui-accordion-icons">' +
                                    '<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e">' +
                                    '</span>' + headers.find('li a.ui-tabs-anchor').eq(ipanel).text() +
                                    '</h3>')
                            .on('click', function () {
                                if (!$(this).hasClass('active')) {
                                    $(value)
                                            .find('>h3.ui-accordion-header')
                                            .removeClass('active ui-state-default')
                                            .find('span.ui-accordion-header-icon')
                                            .addClass('ui-icon-triangle-1-e')
                                            .removeClass('ui-icon-triangle-1-s');
                                    $(this).addClass('active ui-state-default');
                                    $(this).find('span.ui-accordion-header-icon')
                                            .addClass('ui-icon-triangle-1-s')
                                            .removeClass('ui-icon-triangle-1-e');
                                    $(vPanel).css('display', 'block');
                                    $(value).tabs("option", "show", { effect: "slideDown" });
                                    $(value).tabs('option', 'active', headers.find('li').eq(ipanel).index());
                                } else {
                                    $(value)
                                            .find('>h3.ui-accordion-header')
                                    .removeClass('active ui-state-default')
									.find('span.ui-accordion-header-icon')
                                    .addClass('ui-icon-triangle-1-e')
                                    .removeClass('ui-icon-triangle-1-s');
                                    $(vPanel).css('display', 'none');
                                }
                            });

                    $(vPanel).before(tabsHeder);
                    if ($(vPanel).is(':visible')) {
                        tabsHeder.addClass('active ui-state-default ui-icon-triangle-1-e')
                                .removeClass('ui-icon-triangle-1-s');
                        tabsHeder.find('span.ui-accordion-header-icon')
                                .addClass('ui-icon-triangle-1-s')
                                .removeClass('ui-icon-triangle-1-e');
                        var iActive = headers.find('li').eq(ipanel).index();
                        if (iActive <= -1) {
                            $(value).find('>h3.ui-accordion-header').first()
                                    .addClass('active ui-state-default');
                            $(value).tabs('option', 'active', 0);
                        } else
                            $(value).tabs('option', 'active', iActive);
                    }

                });
                if ($(value).is(':hidden')) {
                    $(value)
                            .find('>h3.ui-accordion-header')
                            .first().addClass('active ui-state-default');
                    $(value).tabs('option', 'active', 0);
                }
            }
        });
    }
}

function destroyTabsResponsive() {
    var tabs = $('div.ui-tabs');
    $.each(tabs, function (index, value) {

        if (($(value).hasClass('ui-accordion'))) {
            $(value).find('>ul.ui-tabs-nav').show();
            $(value).removeClass('ui-accordion');
            var active = $(value).find('>h3.active').next().attr('id');
            $(value).find('>h3.ui-accordion-header').remove();
            var iActive = $(value)
                    .find('>ul.ui-tabs-nav a[href$="' + active + '"]')
                    .parent().index();
            $(value).tabs("option", "show", { effect: "none" });
            if (iActive <= -1)
                $(value).tabs('option', 'active', 0);
            else
                $(value).tabs('option', 'active', iActive);
        }
    });
}

function inprogressFiles(content) {
    var files = $(content).find('.fileupload-container:visible');
    var pendientes = 0;
    $.each(files, function (index, value) {
        var content = $(value).closest('form');
        if (content.length) {
            pendientes = pendientes + $(content).compFileupload('inproFiles');
        }
    });
    return pendientes;
}