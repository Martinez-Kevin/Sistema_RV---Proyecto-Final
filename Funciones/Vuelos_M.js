$(document).ready(function () {
    Mostrar_Vuelos();
    Asientos();
    Cbo_CascadaV();
    Cbo_CascadaV2();
});

//Funciones para esconder los botones
function Btn_Show_I() {
    $('#v-pills-messages-tab').click(function () {
        $('#btnAdd_V').show();
        $('#btnUpdate_V').hide();
    });
    $('#v-pills-profile-tab').click(function () {
        $('#btnAdd_V').hide();
    });
    $('#v-pills-home-tab').click(function () {
        $('#btnAdd_V').hide();
    });
}

function Btn_Show_U() {
    $('#v-pills-messages-tab').click(function () {
        $('#btnAdd_V').hide();
        $('#btnUpdate_V').show();
    });
    $('#v-pills-profile-tab').click(function () {
        $('#btnAdd_V').hide();
        $('#btnUpdate_V').hide();
    });
    $('#v-pills-home-tab').click(function () {
        $('#btnAdd_V').hide();
        $('#btnUpdate_V').hide();
    });
}
//Funcion para verificar el numero de asientos disponibles
function Asientos() {
    $("#AvionV").change(function () {
        var id = $(this).val();
        $.ajax({
            url: "/Admin/MostrarPorID_AV/" + id,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#AsientosDisp').val(result.Asientos_Total);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
        return false;
    });
}

//ComboBox Cascada
function Cbo_CascadaV() {
    $("#Pais_V").change(function () {
        var id = $(this).val();
        $("#cboCiudadV").empty();
        $.get("Enlazar_Ciudad_V", { id_pais: id }, function (data) {
            var v = "<option>---Seleccione la ciudad---</option>";
            $.each(data, function (i, v1) {
                v += "<option value=" + v1.Value + ">" + v1.Text + "</option>";
            });
            $("#cboCiudadV").html(v);
        });
    });

    $("#cboCiudadV").change(function () {
        var id = $(this).val();
        $("#cboAeropuertoV").empty();
        $.get("Enlazar_Aeropuerto_V", { id_ciudad: id }, function (data) {
            var v = "<option>---Seleccione el aeropuerto---</option>";
            $.each(data, function (i, v1) {
                v += "<option value=" + v1.Value + ">" + v1.Text + "</option>";
            });
            $("#cboAeropuertoV").html(v);
        });
    });
}

function Cbo_CascadaV2() {
    $("#Pais_V2").change(function () {
        var id = $(this).val();
        $("#cboCiudadV2").empty();
        $.get("Enlazar_Ciudad_V", { id_pais: id }, function (data) {
            var v = "<option>---Seleccione la ciudad---</option>";
            $.each(data, function (i, v1) {
                v += "<option value=" + v1.Value + ">" + v1.Text + "</option>";
            });
            $("#cboCiudadV2").html(v);
        });
    });

    $("#cboCiudadV2").change(function () {
        var id = $(this).val();
        $("#cboAeropuertoV2").empty();
        $.get("Enlazar_Aeropuerto_V", { id_ciudad: id }, function (data) {
            var v = "<option>---Seleccione el aeropuerto---</option>";
            $.each(data, function (i, v1) {
                v += "<option value=" + v1.Value + ">" + v1.Text + "</option>";
            });
            $("#cboAeropuertoV2").html(v);
        });
    });
}

//Funcion para compiar el texto de un cbo

function ShowSelected() {
    /* Para obtener el texto */
    var combo = document.getElementById("cboAeropuertoV2");
    var selected = combo.options[combo.selectedIndex].text;
    document.getElementById("l_salida").value = selected;
}

//Funcion para restar diferencias de hora
function Diferencia_Horas() {
    var fecha1 = moment($("#fec_vuelo").val());
    var fecha2 = moment($("#fec_vuelo_llegada").val());

    var diferencia_d = (fecha2.diff(fecha1, 'days'));

    if (diferencia_d == 0) {
        var h_inicial = parseFloat($("#h_salida").val());
        var h_final = parseFloat($("#h_llegada").val());
        var resultado = '';
        if (h_final >= 1 && h_final <= 12) {
            resultado = (h_final + 24) - h_inicial + ' h';
        } else {
            resultado = h_final - h_inicial + ' h';
        }

        $("#duracionVuelo").val(resultado);
    }
    else {
        var h_inicial = parseFloat($("#h_salida").val());
        var h_final = parseFloat($("#h_llegada").val());
        var resultado = '';
        if (h_final >= 1 && h_final <= 12) {
            resultado = (((h_final + 24) - h_inicial) * diferencia_d) + ' h';
        } else {
            resultado = ((h_final - h_inicial) + 24 * diferencia_d) + ' h';
        }
        $("#duracionVuelo").val(resultado);
    }
}

//Funciones para validar y limpiar los controles
function validate() {
    var isValid = true;
    if ($('#ID_Vuelo').val().trim() == "") {
        $('#ID_Vuelo').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#ID_Vuelo').css('border-color', 'lightgrey');
    }
    if ($('#AerolineaV').val().trim() == "") {
        $('#AerolineaV').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#AerolineaV').css('border-color', 'lightgrey');
    }
    if ($('#AvionV').val().trim() == "") {
        $('#AvionV').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#AvionV').css('border-color', 'lightgrey');
    }
    if ($('#TipoV').val().trim() == "") {
        $('#TipoV').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#TipoV').css('border-color', 'lightgrey');
    }
    if ($('#AsientosDisp').val().trim() == "") {
        $('#AsientosDisp').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#AsientosDisp').css('border-color', 'lightgrey');
    }
    if ($('#fec_vuelo').val().trim() == "") {
        $('#fec_vuelo').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#fec_vuelo').css('border-color', 'lightgrey');
    }
    if ($('#h_salida').val().trim() == "") {
        $('#h_salida').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#h_salida').css('border-color', 'lightgrey');
    }
    
    if ($('#l_salida').val().trim() == "") {
        $('#l_salida').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#l_salida').css('border-color', 'lightgrey');
    }
    if ($('#duracionVuelo').val().trim() == "") {
        $('#duracionVuelo').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#duracionVuelo').css('border-color', 'lightgrey');
    }
    if ($('#precioVuelo').val().trim() == "") {
        $('#precioVuelo').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#precioVuelo').css('border-color', 'lightgrey');
    }
    if ($('#Estado_V').val().trim() == "") {
        $('#Estado_V').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Estado_V').css('border-color', 'lightgrey');
    }
    return isValid;
}

function clearTextBox_V() {
    Btn_Show_I();
    $("#ID_Vuelo").val("");
    $("#COD_Vuelo").val("");
    $("#AerolineaV").val("");
    $("#AvionV").val("");
    $("#TipoV").val("");
    $("#AsientosDisp").val("");
    $("#fec_vuelo").val("");
    $("#h_salida").val("");
    $("#Pais_V2").val("");
    $("#cboCiudadV2").val("");
    $("#cboAeropuertoV2").val("");
    $("#l_salida").val("");
    $("#fec_vuelo_llegada").val("");
    $("#h_llegada").val("");
    $("#Pais_V").val("");
    $("#cboCiudadV").val("");
    $("#cboAeropuertoV").val("");
    $("#duracionVuelo").val("");
    $("#precioVuelo").val("");
    $("#Estado_V").val("");
    $("#btnUpdate_V").hide();
    $("#v-pills-home-tab").trigger("click");
    $("#btnAdd_V").hide();
    $('#ID_Vuelo').css('border-color', 'lightgrey');
    $("#AerolineaV").css('border-color', 'lightgrey');
    $("#AvionV").css('border-color', 'lightgrey');
    $("#TipoV").css('border-color', 'lightgrey');
    $("#AsientosDisp").css('border-color', 'lightgrey');
    $("#fec_vuelo").css('border-color', 'lightgrey');
    $("#h_salida").css('border-color', 'lightgrey');
    $("#Pais_V2").css('border-color', 'lightgrey');
    $("#cboCiudadV2").css('border-color', 'lightgrey');
    $("#cboAeropuertoV2").css('border-color', 'lightgrey');
    $("#l_salida").css('border-color', 'lightgrey');
    $("#h_llegada").css('border-color', 'lightgrey');
    $("#Pais_V").css('border-color', 'lightgrey');
    $("#cboCiudadV").css('border-color', 'lightgrey');
    $("#cboAeropuertoV").css('border-color', 'lightgrey');
    $("#duracionVuelo").css('border-color', 'lightgrey');
    $("#precioVuelo").css('border-color', 'lightgrey');
    $("#Estado_V").css('border-color', 'lightgrey');
}

//Funcion para mostrar los datos
function Mostrar_Vuelos() {
    $.ajax({
        url: "/Admin/List_Vuelo/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Vuelo_ID + '</td>';
                html += '<td>' + item.Cod_Vuelo + '</td>';
                html += '<td>' + item.Avion + '</td>';
                html += '<td>' + item.Aerolinea + '</td>';
                html += '<td>' + item.Tipo_Vuelo + '</td>';
                html += '<td>' + item.Asientos_D + '</td>';
                html += '<td>' + item.Fec_Vuelo + '</td>';
                html += '<td>' + item.Hora_S + '</td>';
                html += '<td>' + item.Lugar_S + '</td>';
                html += '<td>' + item.Fec_Vuelo_L + '</td>';
                html += '<td>' + item.Hora_L + '</td>';
                html += '<td>' + item.Pais + '</td>';
                html += '<td>' + item.Lugar_Llegada + '</td>';
                html += '<td>' + item.Duracion_Vuelo + '</td>';
                html += '<td>' + item.Precio_Vuelo_V + '</td>';
                if (item.Estado_Vuelo == "Disponible") {
                    html += '<td><p class="badge-pill badge-success">' + item.Estado_Vuelo + '</td>';
                }
                else {
                    html += '<td><p class="badge-pill badge-danger">' + item.Estado_Vuelo + '</td>';
                }

                //html += '<td>' + item.Usuario + '</td>';

                html += '<td><a href="#" onclick="return MostrarPorID_VL(' + item.Vuelo_ID + ');" class="btn  bg-info"><i class="fa fa-pencil" aria-hidden="true"></i></a> | <a href="#" onclick="return Delete_Vuelo(' + item.Vuelo_ID + ')" class="btn bg-danger"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                html += '</tr>';
            });
            $('tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para ingresar los vuelos
function Add_Vuelo() {
    var vObj = {
        Cod_Vuelo: $("#COD_Vuelo").val(),
        Aerolinea_ID: $('#AerolineaV').val(),
        Avion_ID: $('#AvionV').val(),
        Tipo_Vuelo_ID: $('#TipoV').val(),
        Asientos_D: $('#AsientosDisp').val(),
        Fec_Vuelo: $("#fec_vuelo").val(),
        Hora_S: $("#h_salida").val(),
        Lugar_S: $("#l_salida").val(),
        Fec_Vuelo_L: $("#fec_vuelo_llegada").val(),
        Hora_L: $("#h_llegada").val(),
        Lugar_L: $('#cboAeropuertoV').val(),
        Duracion_Vuelo: $("#duracionVuelo").val(),
        Precio_Vuelo: $("#precioVuelo").val(),
        Estado_Vuelo_ID: $('#Estado_V').val(),
        Login_ID: $('#Login_ID').val(),
    };
    $.ajax({
        url: "/Admin/Add_Vuelo",
        data: JSON.stringify(vObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Vuelo agregado correctamente'
            })
            $("#modalVuelos").modal('hide');
            Mostrar_Vuelos();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para mostrar los datos por ID en modal

function MostrarPorID_VL(vID) {
    $.ajax({
        url: "/Admin/MostrarPorID_V/" + vID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            $('#ID_Vuelo').val(result.Vuelo_ID);
            $('#COD_Vuelo').val(result.Cod_Vuelo);
            $('#AerolineaV').val(result.Aerolinea_ID);
            $('#AvionV').val(result.Avion_ID);
            $('#TipoV').val(result.Tipo_Vuelo_ID);
            $('#AsientosDisp').val(result.Asientos_D);
            $('#fec_vuelo').val(result.Fec_Vuelo);
            $('#h_salida').val(result.Hora_S);
            $('#l_salida').val(result.Lugar_S);
            $('#fec_vuelo_llegada').val(result.Fec_Vuelo_L);
            $('#h_llegada').val(result.Hora_L);
            $('#id_aeropuerto').val(result.Lugar_L);
            $('#duracionVuelo').val(result.Duracion_Vuelo);
            $('#precioVuelo').val(result.Precio_Vuelo_V);
            $('#Estado_V').val(result.Estado_Vuelo_ID);
            $('#btnAdd_V').hide();
            $('#btnUpdate_V').hide();
            $('#modalVuelos').modal('show');
            Btn_Show_U();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Funcion para actualizar los vuelos
function Update_Vuelo() {
    if (!$('#cboAeropuertoV').val()) {
        var empObj = {
            Vuelo_ID: $('#ID_Vuelo').val(),
            Cod_Vuelo: $("#COD_Vuelo").val(),
            Aerolinea_ID: $('#AerolineaV').val(),
            Avion_ID: $('#AvionV').val(),
            Tipo_Vuelo_ID: $('#TipoV').val(),
            Asientos_D: $('#AsientosDisp').val(),
            Fec_Vuelo: $("#fec_vuelo").val(),
            Hora_S: $("#h_salida").val(),
            Lugar_S: $("#l_salida").val(),
            Fec_Vuelo_L: $("#fec_vuelo_llegada").val(),
            Hora_L: $("#h_llegada").val(),
            Lugar_L: $('#id_aeropuerto').val(),
            Duracion_Vuelo: $("#duracionVuelo").val(),
            Precio_Vuelo: $("#precioVuelo").val(),
            Estado_Vuelo_ID: $('#Estado_V').val(),
            Login_ID: $('#Login_ID').val(),
        };
    } else {
        var empObj = {
            Vuelo_ID: $('#ID_Vuelo').val(),
            Cod_Vuelo: $("#COD_Vuelo").val(),
            Aerolinea_ID: $('#AerolineaV').val(),
            Avion_ID: $('#AvionV').val(),
            Tipo_Vuelo_ID: $('#TipoV').val(),
            Asientos_D: $('#AsientosDisp').val(),
            Fec_Vuelo: $("#fec_vuelo").val(),
            Hora_S: $("#h_salida").val(),
            Lugar_S: $("#l_salida").val(),
            Fec_Vuelo_L: $("#fec_vuelo_llegada").val(),
            Hora_L: $("#h_llegada").val(),
            Lugar_L: $('#cboAeropuertoV').val(),
            Duracion_Vuelo: $("#duracionVuelo").val(),
            Precio_Vuelo: $("#precioVuelo").val(),
            Estado_Vuelo_ID: $('#Estado_V').val(),
            Login_ID: $('#Login_ID').val(),
        };
    }

    $.ajax({
        url: "/Admin/Update_Vuelo",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Vuelo actualizado correctamente'
            })
            $("#modalVuelos").modal('hide');
            Mostrar_Vuelos();
            clearTextBox_V();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para eliminar los vuelos
function Delete_Vuelo(ID) {
    Swal.fire({
        title: '¿Esta seguro de eliminar el registro?',
        text: "Todo elemento borrado no se podra recuperar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "/Admin/Delete_Vuelo/" + ID,
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Vuelo eliminado correctamente'
                    })
                    Mostrar_Vuelos();
                }, function(errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}
