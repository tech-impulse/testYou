function register() {
    var pushNotification = window.plugins.pushNotification;

    if (isAndroidDevice()) {
        var element = "<script type='text/javascript' src='cordova.js'></script>";
        $('head').append(element);
        pushNotification.register(function (result) {
            console.log('Status: ' + result);
        }, function (result) {
            console.log('Error handler ' + result);
        }, {
            "senderID": "744065802164",
            /* Google developers project number */
                "ecb": "onNotificationGCM" /* Function name to handle notifications */
        });
    } else {
        console.log('Your device platform is not Android!!!');
    }
}

function onNotificationGCM(e) {
    switch (e.event) {
    case 'registered':
        if (e.regid.length > 0) {
            var registrationId = e.regid; //GCM Registration ID
            registerOn3rdPartyServer(registrationId);
        }
        break;

    case 'message':
        console.log("MEssage");
        // handle notification message
        break;

    case 'error':
        console.log("Error");
        // handle error
        break;

    default:
        // handle default
        break;
    }
}

function registerOn3rdPartyServer(registrationId) {
    $.ajax({
        type: "POST",
        url: "http://admin.youtter.com/webservices/notificaciones/register.php",
        /* Your gcm-rest registration endpoint */
        data: {
            "name": idSesion,
            "email": $("#lbmiCuentaEmail").text(),
            "regId": registrationId
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function () {
            console.log('READY FOR NOTIFICATIONS');
        },
        error: function (e) {
            console.log("Unable to register " + JSON.stringify(e));
        }
    });
}

function isAndroidDevice() {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if (isAndroid) {
        return true;
    } else {
        return false;
    }
}

// API KEY AIzaSyDf89dKEjDfR0P3wHJs3DSqlfuVobbMB6Y