/**
 * @multiselectcombo 
 *
 * @author Jhonny Fanor Garcia Laime
 * @version 2.0
 * 
$('#cbx-multiselect').multiselectcombo(DefaultComboMultiSelect({
    url: siteUrl + 'Example/ExampleAction',
    textOverLabelMultiSelect: 'Seleccionados',
    fnParams: function () {
        return { IdParametroX: 1 }
    }
}));
$('#cbx-multiselect').multiselectcombo(DefaultApiComboMultiSelect({
    url: siteUrl + 'api/v1/personas',
    fnParams: function () {
        return { IdParametroX: 1 }
    }
}));
 * 
 * @example "getChecked"
 * $('#example').multiselectcombo('getChecked') 
 * retorna una lista de objectos Id, Value [{Id:1,Value:'value1'},{Id:2,Value:'value2'}]
 * 
 * @example "getCheckedId"
 * $('#example').multiselectcombo('getCheckedId') 
 * retorna una lista de id  [1,2,4,5,6]
 * 
  * @example "uncheckAll"
 * $('#example').multiselectcombo('uncheckAll') 
 * quita todos los elementos seleccionados
 * 
 * @example "setChecked"
 * $('#example').multiselectcombo('setChecked', [{Id:1,Value:'value1'},{Id:2,Value:'value2'}]) 
 * inserta elementos por defecto seleccionados con elementos iguales en estructura al ejemplo
 * 
 * @example "getCheckedCount"
 * $('#example').multiselectcombo('getCheckedCount') 
 * retorna la cantidad de elementos seleccionados
 *
 * @example "removeItem"
 * $('#example').multiselectcombo('removeItem') 
 * Quita un elemento de los seleccionados pasando el "id"
 */
(function ($) {
    $.widget("if.multiselectcombo", {
        options: {
            textOverLabelMultiSelect: 'Seleccionados'
        },
        _create: function () {
            var self = this,
                opc = self.options;
            opc.tooltip = $.extend({}, $.opc_default_combobox.tooltip, opc.tooltip);
            self.options = opc = $.extend({}, $.opc_default_combobox, opc);
            self.box = $('<div class="box-combobox" />');
            self.enabled = true;
            self.seleccionados = [];

            var select = this.element.hide(),
                          selected = select.children(":selected"),
                          value = selected.val() ? selected.text() : "";
            this.id = random();
            /******************************************************/
            self.input = $('<input type="text" />');

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

            if (isResponsiveDesign()) {
                self.box.addClass(this.element.attr('class'));
            } else {
                self.input.addClass(this.element.attr('class'));
            }

            switch (opc.template) {
                case 'search':
                    {
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
                case 'autocomplete':
                default:
                    {
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
                                            if (this.value && (!request.term || matcher.test(text) || !opc.forceStrictWords))
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
                                        if (event.originalEvent.type == 'menuselected') {
                                            $(self.input).keyup();
                                        }
                                    }
                                },
                                change: function (event, ui) {                            
                                    if (!ui.item) {
                                        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
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
                                            return false;
                                        }
                                    }
                                }
                            });
                        self.input.focusout(function () {
                            $(this).val('');
                            self._refreshTextOverLabel();
                        });
                        //Validacion de texto requerido
                        if (opc.textRequired === false) {
                            self.input.attr('readonly', 'readonly');
                        }
                        /******************************************************/
                        self.input.data("uiAutocomplete")._renderMenu = function (ul, items) {
                            var _self = this;
                            ul.css('overflow-y', 'hidden');
                            var todosNinguno = $('<li></li>')
                                .addClass('item-todos-ninguno item-pageable ui-menu-item')
                                .data("ui-autocomplete-item", {})
                                .click(function (e) {
                                    self.input.focus();
                                    e.preventDefault();
                                    e.stopPropagation();
                                });
                            ul.addClass('ui-multiselect-checkboxes ui-helper-reset');

                            $('<button class="btn-multiselectcombo-todos">Todos</button>').button({
                            }).click(function () {
                                $('li > span', ul).removeClass('ui-icon-battery-1');
                                $('li > span', ul).addClass('ui-icon-check');
                                self._clickChecboxAll($('li.li-item-multiselectCombo', ul), true);
                            }).appendTo(todosNinguno);


                            $('<button class="btn-multiselectcombo-ninguno">Ninguno</button>').button({
                            }).click(function () {
                                $('li > span', ul).removeClass('ui-icon-check');
                                $('li > span', ul).addClass('ui-icon-battery-1');
                                self._clickChecboxAll($('li.li-item-multiselectCombo', ul), false);
                            }).appendTo(todosNinguno);
                            ul.append(todosNinguno);

                            /**************************************************/
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
                                    .click(function () {
                                        opc.pagination.nextPage = self.getPrevPage();
                                        _self.element.autocomplete("option", "minLength", 0);
                                        if (opc.textRequired) {
                                            self.input.autocomplete("search");
                                        } else {
                                            self.input.autocomplete("search", "");
                                        }
                                        _self.element.autocomplete("option", "minLength", opc.minlength);
                                        _self.element.focus();
                                        return false;
                                    });
                                opc.pagination.btnNext
                                    .appendTo(item_pageable)
                                    .click(function () {
                                        opc.pagination.nextPage = self.getNextPage();
                                        _self.element.autocomplete("option", "minLength", 0);
                                        if (opc.textRequired) {
                                            self.input.autocomplete("search");
                                        } else {
                                            self.input.autocomplete("search", "");
                                        }
                                        _self.element.autocomplete("option", "minLength", opc.minlength);
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
                            var tickeado = self._isContains(item);
                            var clase = tickeado ? 'ui-icon-check' : 'ui-icon-battery-1';
                            var itemli = $('<li></li>')
                                .addClass('li-item-multiselectCombo')
                                .data('ui-autocomplete-item', item)
                                .append('<span class="ui-icon ' + clase + '"></span>') //ui-icon ui-icon-check
                                .append('<a>' + item.label + '</a>')
                                .click(function(e) {
                                    self._clickCheckbox(this);
                                    self.input.focus();
                                    e.preventDefault();
                                    e.stopPropagation();
                                })
                                .appendTo(ul);

                            return itemli;
                        };
                    }
                    self._setTemplate();                   
            }
        },
        /*
         * Habilita y desabilita los botones de navegacion de acuerdo a la
         * pagina en la que se encuentra
         *
         */
        loadPagination: function (pagination) {
            var self = this,
                opc = self.options;
            if (opc.pageable === false) {
                return false;
            }
            if (pagination) {
                if (!isNull(pagination.totalPages)){
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
                opc = self.options;
            return opc.pagination.currentPage;
        },
        getNextPage: function () {
            var self = this,
                opc = self.options;
            opc.pagination.currentPage += 1;
            return opc.pagination.currentPage;
        },
        getPrevPage: function () {
            var self = this,
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

            if (opc.buttonPaginationOnlyIcon) { }

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
        _clickCheckbox: function (li) {
            var self = this;
            var span = $('span', li);
            var data = $(li).data('ui-autocomplete-item');
            if (span.prop('class') === 'ui-icon ui-icon-check') {
                span.removeClass('ui-icon-check');
                span.addClass('ui-icon-battery-1');
                self.seleccionados = self._listRemoveItem(data);
            } else {
                span.removeClass('ui-icon-battery-1');
                span.addClass('ui-icon-check');

                if (!self._isContains(data)) {
                    self.seleccionados.push({
                        Id: data.id,
                        Value: data.value
                    });
                }
            }
            self._fnChangeChecked();
        },
        _clickChecboxAll: function (items, checked) {
            var self = this;
            if (checked) {
                $.each(items, function (index, item) {
                    var data = $(item).data('ui-autocomplete-item');
                    if (!self._isContains(data)) {
                        self.seleccionados.push({
                            Id: data.id,
                            Value: data.value
                        });
                    }
                });
            } else {
                var templist = [];
                var existe = false;
                $.each(self.seleccionados, function (i, value) {
                    existe = false;
                    $.each(items, function (index2, item2) {
                        var data = $(item2).data('ui-autocomplete-item');
                        if (value.Id == data.id) {
                            existe = true;
                            return false;
                        }
                    });
                    if (!existe) {
                        templist.push(value);
                    }
                });
                self.seleccionados = templist;
            }
            self._fnChangeChecked();
        },
        getChecked: function () {
            var self = this;
            return self.seleccionados;
        },
        getCheckedId: function () {
            var self = this;
            var ids = $.map(self.seleccionados, function (value) {
                return value.Id;
            });
            return ids;
        },
        _refreshTextOverLabel: function () {
            var self = this;
            var label = $('label', self.box);
            label.text(self.options.textOverLabelMultiSelect + ' (' + self.seleccionados.length + ')');
        },
        uncheckAll: function () {
            var self = this;
            self.seleccionados = [];
            self._fnChangeChecked();
            self._refreshTextOverLabel();
        },
        setChecked: function (data) {
            var self = this;
            if ($.isArray(data) && data.length > 0) {
                var primero = data[0];
                if (typeof primero === 'object') {
                    self.seleccionados = data;
                    self._refreshTextOverLabel();
                    self._fnChangeChecked();
                }
            }
        },
        getCheckedCount: function () {
            var self = this;
            return self.seleccionados.length;
        },
        _fnChangeChecked: function () {
            var self = this;
            if (!isNull(self.options.fnChangeChecked) && $.isFunction(self.options.fnChangeChecked)) {
                self.options.fnChangeChecked();
            }
        },
        _isContains: function (elem) {
            var self = this;
            var existe = false;
            $.each(self.seleccionados, function (index, item) {
                if (item.Id == elem.id) {
                    existe = true;
                    return false;
                }
            });
            return existe;
        },
        _listRemoveItem: function (elem) {
            var self = this;
            var templist = [];
            $.each(self.seleccionados, function (index, item) {
                if (item.Id != elem.id)
                    templist.push(item);
            });
            return templist;
        },
        _setTemplate: function () {
            var self = this,
                opc = self.options;
            opc = $.extend({}, $.opc_default_combobox, opc);
            switch (opc.template) {
                case 'autocomplete':
                    self.box.addClass('box-combobox-searcher');
                    self.box.insertAfter(this.element);
                    self.box.append(self.input);
                    if (!isEmpty(opc.textOverLabelMultiSelect)) {
                        var overlabel = $('<label for="' + self.id + '">' + opc.textOverLabelMultiSelect + ' (' + self.seleccionados.length + ')</label>');
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
                    if (!isEmpty(opc.textOverLabelMultiSelect)) {
                        var overlabel = $('<label for="' + self.id + '">' + opc.textOverLabelMultiSelect + ' (' + self.seleccionados.length + ')</label>');
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
                        });

                    //self.box = $('<div class="box-combobox" />');
                    self.box.insertAfter(this.element);
                    self.box.append(self.input, self.button);
                    if (!isEmpty(opc.textOverLabelMultiSelect)) {
                        var overlabel = $('<label for="' + self.id + '">' + opc.textOverLabelMultiSelect + ' (' + self.seleccionados.length + ')</label>');
                        self.box.append(overlabel);
                        overlabel.overlabel();
                    }
                    /**********************************************************/
                    self._addToolbar();
            }
        },
        _addToolbar: function () {
            var self = this;
            self.toolbarWrapper = $('<div />')
                .addClass('box-combobox-toolbar')
                .hide()
                .appendTo(self.box);
            self._addButtonClear();
            self._addButtonInfo();
            self.box.hover(
                function () {
                    if (self.enabled && self.seleccionados.length > 0) {
                        self.toolbarWrapper.show();
                        self.toolbarWrapper.css('left', self.box.outerWidth() - 1);
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
                    $(this).stop(true);
                    if (self.enabled) {
                        self.toolbarWrapper.hide();
                    }
                });
        },
        _addButtonInfo: function () {
            var self = this;
            self.buttonInfo = $('<span />')
                .addClass('btn-combobox-info')
                .addClass('ui-icon ui-icon-info')
                .attr('title', '')
                .appendTo(self.toolbarWrapper)
                .tooltip({
                    content: function () {
                        var contenido = '';
                        if (self.seleccionados.length > 0) {
                            contenido += '<h4 class="tooltip-title">Elementos Seleccionados</h4>';
                            contenido += '<div style="max-height: 280px;width:250px; overflow-y: auto;overflow-x: hidden;">';
                            contenido += '<table class="multiselectCombo-tooltip-table">';
                            contenido += '<thead><tr><th>&nbsp;#</th><th>ID</th><th>DESCRIPCION</th></tr></thead>';
                            contenido += '<tbody>';
                            $.each(self.seleccionados, function (item, value) {
                                contenido += '<tr>'
                                    + '<td><span owner="' + $(self.element).prop('id') + '" ' +
                                    'key="' + value.Id + '" style="cursor:hand;cursor:pointer;" ' +
                                    'onclick="removeItemComboMultiSelect(this)"' +
                                    ' title="Quitar" class="ui-icon ui-icon-trash inline-block"></span></td>'
                                    + '<td>' + value.Id + '</td>'
                                    + '<td><div style="width: 170px; word-wrap: break-word;">'
                                    + value.Value + '</div></td></tr>';
                            });
                            contenido += '</tbody></table></div>';
                            return contenido;
                        }
                    },
                    open: function(event, ui) {
                        self.infoToolTip = ui.tooltip;
                    },
                    close: function (event, ui) {
                        ui.tooltip.hover(
                            function () {
                                $(this).stop(true).fadeTo(400, 1);
                            },
                            function () {
                                $(this).fadeOut('300', function () {
                                    $(this).remove();
                                });
                            });
                    },
                    position: {
                        my: 'bottom-20'
                    }
                });
        },
        _addButtonClear: function () {
            var self = this;
            self.buttonClear = $('<span />')
                .addClass('btn-combobox-clear')
                .addClass('ui-icon ui-icon-close')
                .attr('title', 'Limpiar')
                .appendTo(self.toolbarWrapper)
                .click(function () {
                    self.uncheckAll();
                    var label = $('label', self.box);
                    label.text(self.options.textOverLabelMultiSelect + ' (0)');
                    if($.isFunction(self.options.fnReset)){
                        self.options.fnReset();
                    }
                });
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
                .text(opc.textOverLabelMultiSelect + ' (' + self.seleccionados.length + ')')
                .attr('value', -1)
                .data('ui', {
                    item: null
                });
            _this.append(option);
        },
        removeItem: function (id) {
            var self = this;
            if (id) {
                var listRemoveItem = self._listRemoveItem({
                    id: id
                });
                self.seleccionados = listRemoveItem;
                self._refreshTextOverLabel();
            }
            if(self.seleccionados.length == 0 && !isNull(self.infoToolTip)) {
                self.infoToolTip.remove();
            }
        },
        hide: function () {
            var self = this;
            $(self.box).hide();
        },
        show: function () {
            var self = this;
            $(self.box).show();
        },
        readonly: function () {
            var self = this,
                _this = self.element,
                opc = self.options;
            var textReadonly = '<span class="combobox-text-readonly">' + self.getValue() + '</span>';

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
}(jQuery));

function removeItemComboMultiSelect(span) {
    var combo = $(span).attr('owner');
    var item = $(span).attr('key');
    var multiselectcombo = $('#' + combo);
    multiselectcombo.multiselectcombo('removeItem', item);
    $(span).parents('tr').remove();
}
/**
 * Creacion basica de un combo-multiselect
 */
function DefaultComboMultiSelect(conf) {
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

                $.ajax({
                    url: $.isFunction(conf.url) ? conf.url() : conf.url,
                    data: $.toJSON(
                        $.extend({}, {
                            Descripcion: request.term,
                            Description: request.term,
                            Pagina: elem.getCurrentPage(),
                            PageIndex: elem.getCurrentPage()
                        }, conf.fnParams())),
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
function DefaultApiComboMultiSelect(conf) {
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
                    },
                    error: function (xhr) {
                        if (xhr.status !== 500) {
                            var result = $.parseJSON(xhr.responseText);
                            showErrors(result.Errors);
                        } else {
                            showApplicationFatalErrorMessage();
                        }
                    }                    
                });
            }
        }
    }, conf);

    return conf;
}