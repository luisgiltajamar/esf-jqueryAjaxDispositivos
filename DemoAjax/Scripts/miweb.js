var url_base = "https://cursoesf.azure-mobile.net/tables";
function validarUSuario() {

    var log = $("#txLogin").val();
    var pwd = $("#txPassword").val();

    var url = url_base + "/usuarios";
    var query = "?$filter=login eq '" + log + "' and password eq '" + pwd + "'";

    $.getJSON(url + query, function(res) {
        if (res.length > 0) {
            listarDispositivos();
            $("#listadoDispositivos").show(1500);
            if (res[0].isAdmin) {
                $("#crearDispositivo").show(1500);
            }
            $("#login").hide(1500);

            //TODO: falta cargar los dispositivos actuales

        } else {
            alert("Datos incorrectos");
        }


    });
}


function crearDispositivo() {
    var txNom = $("#txtNombre").val();
    var txPre = $("#txtPrecio").val();

    var obj = {
        nombre: txNom,
        precio: parseFloat(txPre)

    };
    var objtx = JSON.stringify(obj);
    var url = url_base + "/dispositivos";

   /* $.post(url, objtx, function(res) {
        

    }, "application/json");
    */
    $.ajax({
        url: url,
        data: objtx,
        type: "post",
        contentType: "application/json",
        success: function(res) {
            listarDispositivos();
            alert("Dispositivo agregado");
        }

    });

}

function listarDispositivos() {

    var tabla = $("#tbDispositivos");
    tabla.empty();

    var url = url_base + "/dispositivos";

    $.getJSON(url, function(res) {
        for (var i = 0; i < res.length; i++) {

            var fila = "<tr>";
            fila += "<td>" + res[i].nombre + "</td>";
            fila += "<td>" + res[i].precio + "</td>";
            fila += "</tr>";
            tabla.append(fila);
        }


    });

}

$(document).ready(function() {
    $("#btnValidar").click(validarUSuario);
    $("#btnAdd").click(crearDispositivo);
});




