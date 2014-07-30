host= "api.youtter.com";

/*
Se realiza la autenticación del usuario
*/
function authentication() {
	
    var uri = "/login";
	
	console.log("Envio WS : " + uri);
    
    $.ajax({    
            url:            host+uri,
            async:          true, 
            timeout:        maxtime,
            contentType:    'application/json',
            dataType:       "json",
            method :        'GET', 
            type:           "GET",
            success:        restLogin,
            error:          serviceComunicationError

    });
}


function restLogin(data) {
    
    if (data.status=="OK") {
    
        loginOk();
        
    } else {
        
        loginError(data.errorMessage);
        
    }
    
}
