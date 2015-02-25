function validarUsuario (login, pwd) {
    //https://cursoesf.azure-mobile.net/tables/usuarios?$filter=login 
    //eq 'luis' and password eq 'yo'
    var request = new XMLHttpRequest();
    var url = "https://cursoesf.azure-mobile.net/tables/usuarios";
    var query = "?$filter=login eq '" + login + "' and password eq '" + pwd + "'";
    request.open("get", url + query);

    request.onreadystatechange = function () {

        if (request.readyState == 4) {

            if (request.status >= 200 && request.status < 300) {
                var respuesta = request.responseText;

                var respuestaObj = JSON.parse(respuesta);

                if (respuestaObj.length > 0) {
                    alert(respuestaObj[0].login);

                } else {
                    alert("Sin datos");
                }


            } else {
                alert(request.error);
            }


        }


    };


    request.send(null);


}
(function() {
    var bt = document.getElementById("btnValidar");

    bt.addEventListener("click", function() {

        var log = document.getElementById("txLogin").value;
        var pwd = document.getElementById("txPassword").value;

        validarUsuario(log, pwd);
    });


})();

