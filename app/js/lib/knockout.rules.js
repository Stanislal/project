define(

    //-------------------------------------------------------------------
    // DEPENDENCIES
    //-------------------------------------------------------------------
    ['knockout', 'jquery', 'knockout.validation'],

    //-------------------------------------------------------------------
    // MODULE DEFINITION
    //-------------------------------------------------------------------
    function (ko, $, koValidate) {

        "use strict";


        /**
         *  The validatableValue binding wraps the standard value binding.
         *  It allows an observable to be marked as updated (or modified) when the element,
         *  which it provides the value for, loses focus.
         *  This is helpful for required form fields, where empty fields should be marked
         *  as an error as soon as they lose focus and not just when the value has been
         *  modified to be empty.
         *  we can ignore the default blur by passing the ignoreBlur as true.
         *  which will not show the error messages even if we focus out. for example in case of
         *  cancel scenarios, we can pass this true then it will not show the message before cancel.
         *
         *  @public
         *  @class ko.bindingHandlers.validatableValue
         *  @example &lt;input data-bind="validatableValue: inputValue" ...&gt;
         */
        ko.bindingHandlers.validatableValue = {
            /**
             * The logic run once to initialize the binding for this element.
             * Adds an event handler for onBlur
             * @private
             * @function
             * @param {object} element The DOM element attached to this binding
             * @param {function(): object} valueAccessor A function that returns all of the values associated with this binding
             * @param {function(): object} allBindingsAccessor Object containing information about other bindings on the same HTML element
             * @param {object} viewModel The viewModel that is the current context for this binding.
             * @param {object} bindingContext The binding hierarchy for the current context
             */
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var valueObservable = valueAccessor();
                var ignoreBlur = bindingContext.$parent.ignoreBlur;
                $(element).blur(function () {
                    if (ignoreBlur && ignoreBlur()) {
                        return true;
                    }
                    // Value must be set as modified for validation message to be shown
                    if (valueObservable.isModified && ko.isObservable(valueObservable.isModified)) {
                        valueObservable.isModified(true);
                    }
                });

                if (valueObservable.rules && ko.isObservable(valueObservable.rules)) {
                    // set the required attribute if the observable is required
                    var rulesLength = valueObservable.rules().length;

                    for (var i = 0; i < rulesLength; ++i) {
                        if (valueObservable.rules()[i].rule === "required") {
                            if (valueObservable.rules()[i].params === true) {
                                $(element).attr("required", "required");
                            }
                            break;
                        }
                    }
                }

                ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            },

            /**
             * Update is invoked whenever an observable in the binding's properties
             * changes.
             * @private
             * @function
             * @param {object} element The DOM element attached to this binding
             * @param {function(): object} valueAccessor A function that returns all of the values associated with this binding
             * @param {function(): object} allBindingsAccessor Object containing information about other bindings on the same HTML element
             * @param {object} viewModel The viewModel that is the current context for this binding.
             * @param {object} bindingContext The binding hierarchy for the current context
             */
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            }
        };


        /**
         * The validatableTarget binding is a variation on validatableValue.
         * It allows an observable to be marked as updated (or modified) when an element
         * loses focus, but where the observable in question does not provide the value.
         * This is helpful for select fields, where different observables may hold the
         * currently selected value (e.g. 'us') and the actual value (e.g. 'United States')
         * to be used for validation purposes.
         *
         * @public
         * @class ko.bindingHandlers.validatableTarget
         * @example &lt;select data-bind="value: optionObservable, validatableTarget: targetObservable" ...&gt;
         */
        ko.bindingHandlers.validatableTarget = {
            /**
             * The logic run once to initialize the binding for this element.
             * Adds an event handler for onBlur.
             * @private
             * @function
             * @param {object} element The DOM element attached to this binding
             * @param {function(): object} valueAccessor A function that returns all of the values associated with this binding
             * @param {function(): object} allBindingsAccessor Object containing information about other bindings on the same HTML element
             * @param {object} viewModel The viewModel that is the current context for this binding.
             * @param {object} bindingContext The binding hierarchy for the current context
             */
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var targetObservable = valueAccessor();

                $(element).blur(function () {
                    // Value must be set as modified for validation message to be shown
                    if (targetObservable.isModified && ko.isObservable(targetObservable.isModified)) {
                        targetObservable.isModified(true);
                    }
                });
            }
        };
    }
);