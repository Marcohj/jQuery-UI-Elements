"use strict";
//######################################
// UI - TABLE
//######################################
$.widget("uie.table", {
    options: {},
    _create: function () {
        this.addclass = this.element.addClass('ui-table ui-widget ui-corner-all');

        this.findhead = this.element.find('th').addClass('ui-widget-header');
        this.findcell = this.element.find('td').addClass('ui-widget-content');
        this.findrow = this.element.children('tbody tr:odd').addClass('ui-table-odd').children('td').addClass('ui-state-default');

        this.rowhover = this.element.find('tbody tr').bind("mouseenter mouseleave", this._hover);
    },
    _hover: function (e) {
        $(this).children('td')[(e.type === "mouseenter" ? "add" : "remove") + "Class"]("ui-state-hover");
        this._trigger("hover", e, {
            hovered: $(e.target)
        });
    },
    destroy: function () {
        // TODO
        $.Widget.prototype.destroy.call(this);
    }
});
//######################################
// UI - PAGING
//######################################
$.widget("uie.paging", {
    options: {},
    _create: function () {
        // Setting up JQ UI Theme classes
        this.addclass = this.element.addClass('ui-paging ui-helper-clearfix');

        this.findchild = this.element.children('li').addClass("ui-paging-item");
        this.findlinks = this.findchild.children('a').addClass('ui-button ui-widget ui-state-default ui-button-text-only').bind("mouseenter mouseleave", this._hover).bind('click', this.click);
        this.element.children('li.active').children('a').addClass('ui-state-active');
        this.findchild.children('a:first').addClass('ui-corner-left');
        this.findchild.children('a:last').addClass('ui-corner-right');
    },
    _hover: function (e) {
        $(e.target)[(e.type === "mouseenter" ? "add" : "remove") + "Class"]("ui-state-hover");
        this._trigger("hover", e, {
            hovered: $(e.target)
        });
    },
    click: function (e) {
        var $target = $(e.target);
        $target.parents('.ui-paging').children('.active').removeClass('active').children('a').removeClass('ui-state-active');
        $target.addClass('ui-state-active').parent().addClass('active');
    },
    destroy: function () {
        // TODO
        $.Widget.prototype.destroy.call(this);
    }
});
//######################################
// UI - SEARCH
//######################################
$.widget("uie.search", {
    options: {
        txt: 'Bing it, please...'
    },
    _create: function () {
        var self = this;
        this.addclass = this.element.addClass('ui-search ui-helper-clearfix');

        this.getvalue = this.element.children('input:text').val();

        this.findinput = this.element.children('input:text').addClass('ui-search-input ui-widget ui-state-active ui-background-none ui-corner-left').bind('focusin focusout', function (e) {
            self._checkval(e);
        }).bind('keyup', function (e) {
            self.inputchanged(e);
        }).wrap('<div class="ui-position-wrapper" />');

        this.resetbutton = this.element.children('.ui-position-wrapper').append('<div class="ui-search-reset ui-state-active ui-style-none"><div class="ui-icon-closethick ui-button ui-helper-hidden"></div></div>');

        this.bindresetbutton = this.element.find('.ui-search-reset').children().bind('click', function (e) {
            self.resetinput(e);
        });

        this.submit = this.element.children('input:submit').addClass('ui-search-submit').button().removeClass('ui-corner-all').addClass('ui-corner-right');

        if (this.getvalue.length !== 0 && this.getvalue !== this.options.txt) {
            this.element.find('.ui-search-reset').children().addClass('ui-icon').removeClass('ui-helper-hidden');
        } else {
            this.element.find('input:text').val(this.options.txt);
        }

    },
    _checkval: function (e) {
        var $target = $(e.target);
        if (e.type === "focusin") {
            $target.removeClass('ui-state-active').addClass('ui-state-hover');
            $target.parent().children('.ui-search-reset').addClass('ui-state-hover').removeClass('ui-state-active');
            if (($target.val()) === this.options.txt) {
                $target.val('');
            }
        } else {
            $target.removeClass('ui-state-hover').addClass('ui-state-active');
            $target.parent().children('.ui-search-reset').addClass('ui-state-active').removeClass('ui-state-hover');
            if (($target.val()) === '') {
                $target.val(this.options.txt);
            }
        }
    },
    inputchanged: function (e) {
        var $target = $(e.target);
        if (($target.val()).length !== 0) {
            this.element.children().children('.ui-search-reset').children().addClass('ui-icon').removeClass('ui-helper-hidden');
        } else {
            this.element.children().children('.ui-search-reset').children().addClass('ui-helper-hidden').removeClass('ui-icon');
        }
    },
    resetinput: function (e) {
        var $target = $(e.target);
        $target.addClass('ui-helper-hidden').removeClass('ui-icon');
        this.element.children().children('input:text').val('').focus();
    },
    destroy: function () {
        // TODO 
        $.Widget.prototype.destroy.call(this);
    }
});
//######################################
// UI - FORM
//######################################
//********************
// UI - INPUT
//********************
$.widget("uie.forminput", {
    options: {},
    _create: function () {
        var self = this;

        this.addclass = this.element.addClass('ui-widget ui-form-input ui-state-default ui-corner-all ui-background-none').bind('focusin focusout', function (e) {
            self._inputfocus(e);
        });
        
        this.disable = (this.element.is(':disabled') ? ' ui-state-disabled' : '');
        this.gettype = (this.element.attr('type') ? this.element.attr('type') : this.element.get(0).tagName.toLowerCase());
        this.inputtype = this.element.addClass('ui-form-' + this.gettype + this.disable);
    },
    _inputfocus: function (e) {
        $(e.target)[(e.type === "focusin" ? "add" : "remove") + "Class"]("ui-state-active");
    },
    destroy: function () {
        // TODO
        $.Widget.prototype.destroy.call(this);
    }
});
//********************
// UI - RADIO
//********************
$.widget("uie.formradio", {
    options: {},
    _create: function () {
        var self = this;

        this.radiogroup = $('input[name=' + this.element.attr('name') + ']');
        this.findlabel = this.element.parent().children('label').bind('click', function (e) {
            self.click(e);
        }).bind("mouseenter mouseleave", function (e) {
            self._hover(e);
        });

        var checkstate;
        if (this.element.is(':checked')) {
            checkstate = 'ui-icon-bullet';
        } else {
            checkstate = 'ui-icon-radio-on';
        }

        this.buildradio = this.element.wrap('<div class="ui-form-radio ui-button" />').parent().append('<div class="ui-form-replace ui-state-default ui-corner-all"><span class="ui-icon ' + checkstate + '"></span></div>').bind('click', function (e) {
            self.click(e);
        }).bind("mouseenter mouseleave", function (e) {
            self._hover(e);
        });

    },
    _hover: function (e) {
        if (e.type === "mouseenter") {
            this.element.addClass('ui-state-active').parent().children('.ui-form-replace').addClass('ui-state-active');
        } else {
            this.element.removeClass('ui-state-active').parent().children('.ui-form-replace').removeClass('ui-state-active');
        }
        this._trigger("hover", e, {
            hovered: $(e.target)
        });
    },
    click: function (e) {
        var $target = $(e.target);
        this.radiogroup.each(function () {
            $(this).parent().find('.ui-icon').addClass('ui-icon-radio-on').removeClass('ui-icon-bullet');
            $(this).attr('checked', 'false');
        });
        this.element.parent().find('.ui-icon').addClass('ui-icon-bullet').removeClass('ui-icon-radio-on');
        this.element.attr('checked', 'checked');
    },
    destroy: function () {
        // TODO
        $.Widget.prototype.destroy.call(this);
    }
});
//********************
// UI - CHECKBOX
//********************
$.widget("uie.formcheckbox", {
    options: {},
    _create: function () {
        var self = this;
        
        this.buildradio = this.element.wrap('<div class="ui-form-checkbox ui-button" />').parent().append('<div class="ui-form-replace ui-state-default"><span class="ui-icon ui-icon-none"></span></div>');
        this.icon = this.element.parent().children('.ui-form-replace').children('span');
        this.label = $("label[for="+this.element.attr("id")+"]");
        
        //BINDS
        this.label.bind("mouseenter mouseleave", function (e) {
            self._hover(e);
        });       
		this.element.bind("click.checkbox mouseout.checkbox", function() {
			self._refresh();
		}).bind("mouseenter mouseleave", function (e) {
            self._hover(e);
        });
        this.icon.bind('click', function (e) {
            self.iconclick(e);
        }).bind("mouseenter mouseleave", function (e) {
            self._hover(e);
        });
        self._refresh();
    },
    iconclick: function (e) {
        if (this.element.is(':checked')) {
            this.icon.addClass('ui-icon-none').removeClass('ui-icon-check');
            this.element.attr('checked', false);
        } else {
            this.icon.addClass('ui-icon-check').removeClass('ui-icon-none');
            this.element.attr('checked', true);
        }
    },
    _refresh: function(e) {
		var checked = this.element.is(":checked");
        if (checked) {
            this.icon.addClass('ui-icon-check').removeClass('ui-icon-none').attr( "aria-checked", checked );
        } else {
            this.icon.addClass('ui-icon-none').removeClass('ui-icon-check').attr( "aria-checked", checked );
        }
    },
    _hover: function (e) {
        if (e.type === "mouseenter") {
            this.icon.parent().addClass('ui-state-active');
        } else {
            this.icon.parent().removeClass('ui-state-active');
        }
        this._trigger("hover", e, {
            hovered: $(e.target)
        });
    },
    destroy: function () {
        // TODO
        $.Widget.prototype.destroy.call(this);
    }
    
});