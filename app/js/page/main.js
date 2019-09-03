define(

    //-------------------------------------------------------------------
    // DEPENDENCIES
    //-------------------------------------------------------------------
    ['knockout'],

    //-------------------------------------------------------------------
    // MODULE DEFINITION
    //-------------------------------------------------------------------
    function (ko) {

        "use strict";
        return {

            firstName: ko.observable(),
            lastName: ko.observable(),

            onLoad: function () {
                window.widget = this;
                this.applyConditionInForm();
                widget.extenders = ko.extenders;
                widget.bindingHandlers = ko.bindingHandlers;
                widget.utils = ko.utils;
            },

            applyConditionInForm: function () {
                this.firstName.extend({
                    required: true,
                });
                this.lastName.extend({
                    required: {
                        params: true,
                        // message: 'Campo Requerido!'
                    }
                });
            },



        };
    }
);