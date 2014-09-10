$(document).bind("mobileinit", function () {
    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;

    $.ajaxSetup({
        timeout: 10000 //Time in milliseconds
    });

});

$(document).ajaxStart(function () {

    $.mobile.loading('show', {
        text: 'Espere por favor...',
        textVisible: true,
        theme: 'z',
        html: ""
    });
});

$(document).ajaxStop(function () {
    $.mobile.loading('hide');
});


