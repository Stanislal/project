require.config({
    paths: {
        baseUrl: "app/js",
        knockout: "lib/knockout.debug",
        'knockout.validation': "lib/knockout.validation",
        'knockout.rules': "lib/knockout.rules",
        jquery: "lib/jquery",
        bootstrap: "lib/bootstrap.js"
    },
    shim: {
        "knockout.validation": ["knockout"]
        // "ko.validation": {
        //     "deps": ["knockout"]
        // }
    }
});

// require(['knockout', 'jquery', 'page/main'], function (ko, $, appViewModel) {
//     // ko.applyBindings = function (object) {
//     //     ko.validation.init();
//     //     origApplyBindings.apply(object, arguments);
//     // };
//     ko.applyBindings(appViewModel);
//     // ko.validation.init();
//     // ko.extends();
//     appViewModel.onLoad();
// });


require(['knockout'], function (ko) {
    window.ko = ko;
    require(["knockout.validation", 'knockout.rules'], function(koValidate, rules) {
       require(['page/main'], function (ViewModel) {
           ko.applyBindings(ViewModel, document.body);
           ViewModel.onLoad();
       });
    });
});