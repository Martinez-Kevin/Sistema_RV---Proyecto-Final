$(document).ready(function () {
    Cbo_CascadaR();
});

//Combobox en casacada
function Cbo_CascadaR() {
    $("#Pais_R").change(function () {
        var id = $(this).val();
        $("#cboCiudadR").empty();
        $.get("Enlazar_Ciudad_R", { id_pais: id }, function (data) {
            var v = "<option>---Seleccione la ciudad---</option>";
            $.each(data, function (i, v1) {
                v += "<option value=" + v1.Value + ">" + v1.Text + "</option>";
            });
            $("#cboCiudadR").html(v);
        });
    });
}

//Busqueda por filtro
function Busqueda_Filtros() {
    var rObj = {
        Fec_Vuelo_E: $("#fecha_vuelo_r").val(),
        Ciudad_ID: $('#cboCiudadR').val(),
        Tipo_Vuelo_ID: $('#TipoV_R').val(),
    };
    $.ajax({
        url: "/Usuario/List_Vuelos_B/",
        data: JSON.stringify(rObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ID_Vuelo + '</td>';
                html += '<td>' + item.Vuelo_COD + '</td>';
                html += '<td>' + item.Aerolinea + '</td>';
                html += '<td>' + item.Tip_Vuelo + '</td>';
                html += '<td>' + item.Fec_Vuelo + '</td>';
                html += '<td>' + item.H_Salida + '</td>';
                html += '<td>' + item.L_Salida + '</td>';
                html += '<td>' + item.Fec_Llegada + '</td>';
                html += '<td>' + item.L_Llegada + '</td>';
                html += '<td>' + item.H_Llegada + '</td>';
                html += '<td>' + item.Duracion + '</td>';
                html += '<td>' + item.Precio + '</td>';              
                html += '<td><a href="#" onclick="return MostrarPorID_R(' + item.ID_Vuelo + ');" class="btn  btn-primary"><i class="fa fa-calendar-check-o" aria-hidden="true"></i>&nbsp;Reservar</a>';
                html += '</tr>';
            });
            $('tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Modal para hacer la reserva
function MostrarPorID_R(vID) {
    $.ajax({
        url: "/Usuario/MostrarPorID_V_R/" + vID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            $('#ID_Vuelo_R').val(result.ID_Vuelo);
            $('#lbl_COD').text("Codigo: " + result.Vuelo_COD);
            $('#lbl_Price').text(result.Precio + " (Por persona)");
            $('#Clase_V').text("Clase: " + result.Tip_Vuelo);
            $('#Fec_V').text("Fecha salida: " + result.Fec_Vuelo);
            $('#H_S').text("Hora de salida: " + result.H_Salida);
            $('#L_S').text("Lugar de salida: " + result.L_Salida);
            $('#L_L').text("Lugar de llegada: " + result.L_Llegada);
            $('#H_L').text("Hora de llegada: " + result.H_Llegada);
            $('#Duracion').text("Duracion del vuelo: " + result.Duracion);

            $('#precio_u').val(result.Price);
            $('#modalReserva').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Calcular el precio
function Calcular_Precio() {
    var cant = $('#Cant_Per').val();
    var price = $('#precio_u').val();

    if (price % 1 == 0) {
        var resultado = cant * price;


        $('#price_total').val(resultado.toString().replace(/\./g, ',')+',00');
    } else {
        var resultado = (cant * price).toFixed(2);


        $('#price_total').val(resultado.toString().replace(/\./g, ',')) ;
    }

    
}

//Insertar reserva
function Add_Reserva() {
    var rvObj = {
        ID_Vuelo: $('#ID_Vuelo_R').val(),
        Login_ID: $('#LoginID').val(),
        Contacto: $("#contacto_e").val(),
        Tel_Contacto: $("#tel_contacto").val(),
        Cantidad_P: $('#Cant_Per').val(),
        Price_Total: $('#price_total').val(),
    };
    $.ajax({
        url: "/Usuario/Add_Reserva_V",
        data: JSON.stringify(rvObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            Swal.fire(
                'Excelente!',
                'Su reserva ha sido procesada!',
                'success'
            ).then(function () {
                window.location.href = 'Mis_Reservas';
            });
            $("#modalReserva").modal('hide');
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}




