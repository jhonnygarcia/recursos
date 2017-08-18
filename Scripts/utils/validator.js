(function (global) {
    global(jQuery);
}(function ($) {
    $.extend($.fn, {
        valid: function () {
            var valid, validator;
            validator = $(this).validate();
            valid = validator.form();
            validator.showErrors();
            if (validator.errorList.length) {
                $(validator.findFirtActive()).focus();
            }
            return valid;
        },
        validate: function (options) {
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.");
                }
                return;
            }
            var validator = $(this[0]).data('validator');
            if (validator) {
                return validator;
            }
            validator = new $.validator(options, this);
            $(this[0]).data('validator', validator);
            if (validator.settings.onsubmit) {;
                validator.form();
            }
            return validator;
        },
        rules: function (command, argument) {
            var element = this[0], data, param;
            data = $.validator.normalizeRules(
                $.extend(
                    {},
                    $.validator.classRules(element),
                    $.validator.attributeRules(element),
                    $.validator.dataRules(element),
                     $.validator.staticRules(element)
                ), element);
            return data;
        }
    });
    $.validator = function (options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.submit = form.find('.submit');
        this.init();
    };
    $.validator.format = function (source, params) {

        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            }; al
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return n;
            });
        });
        return source;
    };
    $.extend($.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "span",
            errorClassElement: 'grid-75 prefix-15 red',
            focusCleanup: true,
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            labelErrors: true,
            tooltipErrors: false,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function (element) {
                this.lastActive = element;
                var message = this.errorList;
                if (this.settings.focusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                }
                //   var val = this.elementValue(element);
                // return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";

                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
                if ($(element).data('uiTooltip') != undefined) {
                    $(element).tooltip("open");
                }
            },
            onfocusout: function (element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
                if ($(element).data('uiTooltip') != undefined) {
                    $(element).tooltip("close");
                }
            },
            onkeyup: function (element, event) {

                if (event.which === 9 && this.elementValue(element) === "") {
                    return;
                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                    // $(element).focus();
                }
            },
            onmouseover: function (element) {
            },
            onmouseenter: function (element) {

            },
            highlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {

                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    var type = this.settings.typeElement(element);
                    element = this.settings.contentElement(element, type);
                    $(element).addClass(errorClass).removeClass(validClass);
                }

            },
            unhighlight: function (element, errorClass, validClass) {

                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {

                    var type = this.settings.typeElement(element);
                    element = this.settings.contentElement(element, type);
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            },
            addErrorLabel: function (error) {

                var errorElement = '<' + this.settings.errorElement + '>';
                var element = error.element;
                var type = this.settings.typeElement(error.element);
                element = this.settings.contentElement(element, type);
                if (!$(element).next(this.settings.errorElement).length) {
                    $(errorElement)
                        .addClass(this.settings.errorClassElement)
                        .addClass('msg-error')
                        .text(error.message)
                        .insertAfter(element);
                } else {
                    $(element).next(this.settings.errorElement).text(error.message);
                }
            },
            removeErrorLabel: function (element) {
                var type = this.settings.typeElement(element);
                element = this.settings.contentElement(element, type);
                $(element).next('span.msg-error').remove();
            },
            typeElement: function (element) {
                var type;
                if ($(element).is('input')) {
                    type = 'input';
                }
                if ($(element).is('form')) {
                    type = 'file';
                }
                if ($(element).is('select')) {
                    type = 'select';
                }
                if ($(element).is('textarea')) {
                    type = 'textarea';
                }
                if ($(element).hasClass('ui-buttonset')) {
                    type = 'buttonset';
                }
                if (type == 'input') {
                    if ($(element).hasClass('ui-spinner-input')) {
                        type = 'spinner';
                    }
                    if ($(element).hasClass('ui-autocomplete-input')) {
                        type = 'combobox';
                    }
                    if ($(element).hasClass('hasDatepicker')) {
                        type = "datepicker";
                    }
                }
                return type;
            },
            contentElement: function (ele, type) {
                var element = ele;
                switch (type) {
                    case 'combobox':
                        element = $(element).closest('div.box-combobox');
                        break;

                    case 'buttonset':
                        element = $(element);
                        break;
                    case 'spinner':
                        element = $(element).spinner('widget');
                        break;
                    case 'datepicker':
                        var content = $(element).closest('div.box-datepicker');
                        element = element;
                        if (content.length) {
                            element = content;
                        }
                        break;
                    case 'file':
                        var content = $(element).closest('div.box-fileupload');
                        element = element;
                        if (content.length) {
                            element = content;
                        }
                        break;
                }
                return element;
            },
            content: $.validator.currentForm
        },
        setDefaults: function (settings) {
            $.extend($.validator.defaults, settings);
        },
        setMessages: function (messages) {
            $.extend($.validator.messages, messages);
        },
        messages: {
            required: "Requerido.",
            remote: "",
            email: "Email no valido.",
            url: "Url no valido.",
            date: "Fecha no valido.",
            dateISO: "Fecha ( ISO ) no valido.",
            number: "Numero no valido.",
            digits: "Digitos no valido.",
            creditcard: "Tarjeta de Credito no valido",
            equalTo: "Vuelva a escribir el mismo valor.",
            maxlength: $.validator.format("Maximo {0} c�racteres."),
            minlength: $.validator.format("Minimo {0} c�racteres."),
            rangelength: $.validator.format("Introduza un texto de longitud {0} y {1}."),
            range: $.validator.format("Introduzca un valor entre {0} y {1}."),
            max: $.validator.format("El valor maximo {0}."),
            min: $.validator.format("El valor minimo {0}."),
            rule: "Formato no valido.",
            alphabetic: "Ingrese salo caracteres A-Z.",
            alphanumeric: "Ingrese solo caracteres o numeros."
        },
        //autoCreateRanges: false,
        content: this,
        prototype: {
            init: function () {

                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var currentContent = this.currentForm;
                var rules;
                rules = this.settings.rules;

                $.each(rules, function (key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });
                function delegate(event) {
                    var validator = $(currentContent).data('validator'),
                        eventType = "on" + event.type,//.replace(/^validate/, ""),
                        settings = validator.settings;
                    if (settings[eventType] && !this.is(settings.ignore)) {
                        settings[eventType].call(validator, this[0], event);
                    }
                }

                $(this.currentForm)
                    .validateDelegate(":text, [type='password'], [type='file'], select, textarea," +
                        "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                        "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                        "[type='week'], [type='time'], [type='datetime-local'], " +
                        "[type='range'], [type='color'], [type='radio'], [type='checkbox']",
                        "focusin focusout keyup ", delegate)
                    .validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);

                if (this.settings.invalidHandler) {
                    $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                }
                $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },
            form: function () {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                // this.showErrors();
                return this.valid();
            },
            checkForm: function () {
                this.prepareForm();
                for (var i = 0, elements = (this.currentElements = this.elements()) ; elements[i]; i++) {
                    this.check(elements[i]);
                }
                return this.valid();
            },
            element: function (element) {

                var cleanElement = this.clean(element),
                    checkElement = this.validationTargetFor(cleanElement),
                    result = true;
                this.lastElement = checkElement;
                if (checkElement === undefined) {
                    delete this.invalid[cleanElement.name];
                } else {
                    this.prepareElement(checkElement);
                    this.currentElements = $(checkElement);

                    result = this.check(checkElement) !== false;
                    if (result) {
                        delete this.invalid[checkElement.name];
                    } else {
                        this.invalid[checkElement.name] = true;
                    }
                }

                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers);
                }
                this.showErrors();
                return result;
            },
            showErrors: function (errors) {
                if (errors) {
                    $.extend(this.errorMap, errors);
                    this.errorList = [];
                    for (var name in errors) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        });
                    }
                    this.successList = $.grep(this.successList, function (element) {
                        return !(element.name in errors);
                    });
                }
                if (this.settings.showErrors) {

                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    if (this.settings.labelErrors) {
                        this.labelShowErrors();
                    }
                    if (this.settings.tooltipErrors) {
                        this.toolTipShowErrors();
                    }
                }
            },
            resetForm: function () {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements()
                    .removeClass(this.settings.errorClass)
                    .removeData("previousValue")
                    .removeAttr("aria-invalid");
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid);
            },
            objectLength: function (obj) {
                /* jshint unused: false */
                var count = 0,
                    i;
                for (i in obj) {
                    count++;
                }
                return count;
            },
            valid: function () {
                return this.size() === 0;
            },
            size: function () {
                return this.errorList.length;
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                            .filter(":visible")
                            .focus();
                    } catch (e) {
                    }
                }

            },
            findLastActive: function () {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function (n) {
                    return n.element.name === lastActive.name;
                }).length === 1 && lastActive;
            },
            findFirtActive: function () {
                return this.errorList[0].element;
            },
            elements: function () {
                var validator = this,
                    rulesCache = {};

                var eles = $(this.currentForm)
                    .find("input, select, textarea, .box-fileupload form, .ui-buttonset")
                    .not(":submit, :reset, :image,:hidden, [disabled], [readonly]")
                    .not(this.submit)
                    .not(this.settings.ignore);
                return eles;
            },
            clean: function (selector) {
                return $(selector)[0];
            },
            errors: function () {
                var errorClass = this.settings.errorClass.split(" ").join(".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },
            reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            },
            prepareForm: function () {

                this.reset();
                this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function (element) {
                this.reset();
            },
            elementValue: function (element) {
                var val,
                    $element = $(element),
                    type = element.type;

                if (type === "radio" || type === "checkbox") {
                    return $("input[name='" + element.name + "']:checked").val();
                } else if (type === "number" && typeof element.validity !== "undefined") {
                    return element.validity.badInput ? false : $element.val();
                }
                if ($(element).hasClass('ui-spinner-input')) {
                    return parseInt($(element).autoNumeric('get'));
                }
                val = $element.val();
                if (typeof val === "string") {
                    return val.replace(/\r/g, "");
                }
                return val;
            },
            check: function (element) {
                element = this.validationTargetFor(this.clean(element));
                var _this = this;
                if ($(element) != $(this.currentForm) && element != undefined) {
                    var rules = $(element).rules(),
                        rulesCount = $.map(rules, function (n, i) {
                            return i;
                        }).length,
                        dependencyMismatch = false,
                        val = this.elementValue(element),
                        result,
                        method,
                        rule;
                    if ($(element).hasClass('ui-spinner-input')) {///OPTIMIZAR
                        var ele = $(element).spinner('widget');
                        rules = $(element).rules();
                        val = $(element).autoNumeric('get');
                    }
                    if ($(element).hasClass('hasDatepicker')) {
                        val = $(element).datepicker('getDate');
                        rules = $(element).rules();
                    }
                    if ($(element).hasClass('ui-autocomplete-input')) {
                        //$(element).on("autocompleteselect", function(event, ui) {
                        //});
                    }
                    if ($(element).is('form')) {
                        val = $(element).compFileupload('hasFile') ? 'Foto' : '';
                    }
                    if ($(element).hasClass('ui-buttonset')) {
                        val = $(element).find('input:radio').filter(':checked').length ? $(element).find('input:radio').filter(':checked').length : '';
                    }
                    for (method in rules) {
                        rule = { method: method, parameters: rules[method] };
                        try {
                            result = $.validator.methods[method].call(this, val, element, rule.parameters);
                            if (result === "dependency-mismatch" && rulesCount === 1) {
                                dependencyMismatch = true;
                                continue;
                            }
                            dependencyMismatch = false;

                            if (result === "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(element));
                                return;
                            }

                            if (!result) {
                                this.formatAndAdd(element, rule);
                                return false;
                            }
                        } catch (e) {
                            if (this.settings.debug && window.console) {
                                console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                            }
                            throw e;
                        }
                    }
                    if (dependencyMismatch) {
                        return;
                    }
                    if (this.objectLength(rules)) {
                        this.successList.push(element);
                    }
                    return true;
                }
                return true;
            },
            customDataMessage: function (element, method) {
                return $(element).data("msg" + method.charAt(0).toUpperCase() +
                    method.substring(1).toLowerCase()) || $(element).data("msg");
            },
            customMessage: function (name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            },
            findDefined: function () {

                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            },
            defaultMessage: function (element, method) {

                return this.findDefined(
                    this.customMessage(element.name, method),
                    this.customDataMessage(element, method),
                    !this.settings.ignoreTitle && element.title || undefined,
                    $.validator.messages[method],
                    "<strong>Advertencia: Mensaje no definido para " + element.name + "</strong>"
                );
            },
            formatAndAdd: function (element, rule) {
                var message = this.defaultMessage(element, rule.method),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                }
                this.errorList.push({
                    message: message,
                    element: element,
                    method: rule.method
                });
                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },
            toolTipShowErrors: function () {
                var i, elements, error;
                var _this = this;
                $.each(_this.errorList, function (index, value) {
                    error = value;
                    $(error.element).attr('title', '');
                    $(error.element).tooltip({
                        content: error.message,
                        track: true,
                        tooltipClass: 'rigth',
                        position: { my: 'left bottom', at: 'left top-5', collision: 'flipfit flipfit' }
                    });
                    _this.settings.highlight.call(_this, error.element, _this.settings.errorClass, _this.settings.validClass);

                });

                if (!_this.errorList.length) {
                    $.each(_this.validElements(), function (index, value) {
                        if ($(value).data('uiTooltip') != undefined) {
                            $(value).tooltip("destroy");
                        }
                        _this.settings.unhighlight.call(_this, value, _this.settings.errorClass, _this.settings.validClass);
                    });
                }
            },
            labelShowErrors: function () {
                var i, elements, error;
                var _this = this;
                $.each(_this.errorList, function (index, value) {
                    error = value;
                    _this.settings.addErrorLabel.call(_this, error);
                    _this.settings.highlight.call(_this, error.element, _this.settings.errorClass, _this.settings.validClass);
                });

                //if (!_this.errorList.length) {
                //    $.each(_this.validElements(), function (index, value) {
                //        _this.settings.removeErrorLabel.call(_this, value);
                //        _this.settings.unhighlight.call(_this, value, _this.settings.errorClass, _this.settings.validClass);
                //    });
                //}
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements() ; elements[i]; i++) {
                        // this.settings.unhighlight.call(this, elements[ i ], this.settings.errorClass, this.settings.validClass);
                        _this.settings.removeErrorLabel.call(_this, elements[i]);
                        _this.settings.unhighlight.call(_this, elements[i], _this.settings.errorClass, _this.settings.validClass);
                    }
                }
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function () {
                return $(this.errorList).map(function () {
                    return this.element;
                });
            },
            validationTargetFor: function (element) {

                if (this.checkable(element)) {
                    element = this.findByName(element.name);
                }
                return $(element).not(this.settings.ignore)[0];
            },
            checkable: function (element) {
                return (/radio|checkbox/i).test(element.type);
            },
            findByName: function (name) {
                return $(this.currentForm).find("[name='" + name + "']");
            },
            getLength: function (value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },
            depend: function (param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },
            dependTypes: {
                "boolean": function (param) {
                    return param;
                },
                "string": function (param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function (param, element) {
                    return param(element);
                }
            },
            optional: function (element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            }
        },
        classRuleSettings: {
            required: { required: true },
            email: { email: true },
            url: { url: true },
            date: { date: true },
            dateISO: { dateISO: true },
            number: { number: true },
            digits: { digits: true },
            creditcard: { creditcard: true },
            alphanumeric: { alphanumeric: true },
            alphabetic: { alphabetic: true }
        },
        addClassRules: function (className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },
        //Obtiene las array clases asociadas a un elemento y que pertenecen a una validacion
        classRules: function (element) {
            var rules = {},
                classes = $(element).attr("class");

            if (classes) {
                $.each(classes.split(" "), function () {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },
        //Obtienes los atributos de un elemento
        attributeRules: function (element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method,
                value;
            for (method in $.validator.methods) {
                // support for <input required> in both html5 and older browsers
                if (method === "required") {
                    value = element.getAttribute(method);
                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup
                    if (value === "") {
                        value = true;
                    }
                    // force non-HTML5 browsers to return bool
                    value = !!value;
                } else {
                    value = $element.attr(method);
                }

                // convert the value to a number for number inputs, and for text for backwards compability
                // allows type="date" and others to be compared as strings
                if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) {
                    value = Number(value);
                }
                if (value || value === 0) {
                    rules[method] = value;
                } else if (type === method && type !== "range") {
                    // exception: the jquery validate 'range' method
                    // does not test for the html5 'range' type
                    rules[method] = true;
                }
            }

            // maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }
            return rules;
        },
        //Obtiene arary de roles con data
        dataRules: function (element) {
            var method,
                value,
                rules = {},
                $element = $(element);
            for (method in $.validator.methods) {
                value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());

                if (value !== undefined) {
                    rules[method] = value;
                }
            }
            return rules;
        },
        staticRules: function (element, content) {
            var rules = {};
            var form = $(element).closest('.box-form-content');
            var validator = $(form).data("validator"); //$(this.currentForm).data('validator'); // $.data(('#page-asignatura-create'), "validator");
            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },
        normalizeRules: function (rules, element) {
            // handle dependency check
            $.each(rules, function (prop, val) {
                // ignore rule when param is explicitly false, eg. required:false
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });

            // evaluate parameters
            $.each(rules, function (rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });

            // clean number parameters
            $.each(["minlength", "maxlength"], function () {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(["rangelength", "range"], function () {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === "string") {
                        parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });

            if ($.validator.autoCreateRanges) {
                // auto-create ranges
                if (rules.min != null && rules.max != null) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength != null && rules.maxlength != null) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            return rules;
        },
        normalizeRule: function (data) {

            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function () {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },
        addMethod: function (name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },
        methods: {
            required: function (value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }

                return $.trim(value).length > 0;
            },
            rule: function (value, element, params) {
                var regex = "string" == typeof params ? new RegExp(params) : params;
                return this.optional(element) || regex.test(value);
            },
            alphabetic: function (value, element) {
                return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
            },
            alphanumeric: function (value, element) {
                return this.optional(element) || /^[a-zA-Z0-9]*$/.test(value);
            },
            integer: function (value, element) {
                return this.optional(element) || /^(?:-?(?:0|[1-9][0-9]*))$/.test(value);
            },
            email: function (value, element) {
                return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },
            url: function (value, element) {
                return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            },
            date: function (value, element) {

                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },
            dateISO: function (value, element) {
                return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
            },
            number: function (value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },
            digits: function (value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },
            creditcard: function (value, element) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                if (/[^0-9 \-]+/.test(value)) {
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false,
                    n,
                    cDigit;

                value = value.replace(/\D/g, "");
                if (value.length < 13 || value.length > 19) {
                    return false;
                }

                for (n = value.length - 1; n >= 0; n--) {
                    cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if ((nDigit *= 2) > 9) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }
                return (nCheck % 10) === 0;
            },
            minlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length >= param;
            },
            maxlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length <= param;
            },
            rangelength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || (length >= param[0] && length <= param[1]);
            },
            min: function (value, element, param) {
                return this.optional(element) || value >= param;
            },
            max: function (value, element, param) {
                return this.optional(element) || value <= param;
            },
            range: function (value, element, param) {
                return this.optional(element) || (value >= param[0] && value <= param[1]);
            },
            equalTo: function (value, element, param) {
                var target = $(param);
                if (this.settings.onfocusout) {
                    target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },
            remote: function (value, element, param) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }

                var previous = this.previousValue(element),
                    validator,
                    data;

                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;

                param = typeof param === "string" && { url: param } || param;

                if (previous.old === value) {
                    return previous.valid;
                }

                previous.old = value;
                validator = this;
                this.startRequest(element);
                data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    context: validator.currentForm,
                    success: function (response) {
                        var valid = response === true || response === "true",
                            errors,
                            message,
                            submitted;

                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        if (valid) {
                            submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        } else {
                            errors = {};
                            message = response || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }
        }
    });
    $.extend($.fn, {
        validateDelegate: function (delegate, type, handler) {
            return this.bind(type, function (event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments);
                }
            });
        }
    });
}));
