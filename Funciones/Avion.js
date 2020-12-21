$(document).ready(function () {
    Mostrar_Avion();
});
//Funcion para mostrar tabla
function Mostrar_Avion() {
    $.ajax({
        url: "/Admin/List_Avion/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';

            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.AvionID + '</td>';
                html += '<td>' + item.Nombre_Avion + '</td>';
                html += '<td>' + item.Velocidad_C + '</td>';
                html += '<td>' + item.Altura_M + '</td>';
                html += '<td>' + item.Capacidad_C + '</td>';
                html += '<td>' + item.Cantidad_Ejecutiva + '</td>';
                html += '<td>' + item.Cantidad_Economica + '</td>';
                html += '<td>' + item.Asientos_Total + '</td>';
                html += '<td><a href="#" onclick="return MostrarPorID_AV(' + item.AvionID + ');" class="btn  bg-info"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Editar</a> | <a href="#" onclick="return Delete_Avion(' + item.AvionID + ')" class="btn bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Eliminar</a></td>';
                html += '</tr>';
            });
            $('tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para ingresar avion
function Add_Avion() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var avObj = {
        Avion_ID: $('#AvionID').val(),
        Nombre_Avion: $("#Avion").val(),
        Velocidad_C: $("#velocidad_c").val(),
        Altura_M: $("#altura_m").val(),
        Capacidad_C: $("#capacidad_c").val(),
        Cantidad_Ejecutiva: $("#cant_eje").val(),
        Cantidad_Economica: $("#cant_eco").val(),
    };
    $.ajax({
        url: "/Admin/Add_Avion",
        data: JSON.stringify(avObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Avion agregado correctamente'
            })
            $("#modalAvion").modal('hide');
            Mostrar_Avion();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Traer los datos al modal

function MostrarPorID_AV(AV_ID) {
    $('#Avion').css('border-color', 'lightgrey');
    $('#velocidad_c').css('border-color', 'lightgrey');
    $('#altura_m').css('border-color', 'lightgrey');
    $('#capacidad_c').css('border-color', 'lightgrey');
    $('#cant_eje').css('border-color', 'lightgrey');
    $('#cant_eco').css('border-color', 'lightgrey');


    $.ajax({
        url: "/Admin/MostrarPorID_AV/" + AV_ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#AvionID').val(result.AvionID);
            $('#Avion').val(result.Nombre_Avion);
            $('#velocidad_c').val(result.Velocidad_C);
            $('#altura_m').val(result.Altura_M);
            $('#capacidad_c').val(result.Capacidad_C);
            $('#cant_eje').val(result.Cantidad_Ejecutiva);
            $('#cant_eco').val(result.Cantidad_Economica);

            $('#modalAvion').modal('show');
            $('#btnUpdate_AV').show();
            $('#btnAdd_AV').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Funcion para actualizar los datos
function Update_Avion() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var avObj = {
        AvionID: $('#AvionID').val(),
        Nombre_Avion: $("#Avion").val(),
        Velocidad_C: $("#velocidad_c").val(),
        Altura_M: $('#altura_m').val(),
        Capacidad_C: $("#capacidad_c").val(),
        Cantidad_Ejecutiva: $("#cant_eje").val(),
        Cantidad_Economica: $("#cant_eco").val(),
    };
    $.ajax({
        url: "/Admin/Update_Avion",
        data: JSON.stringify(avObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Avion actualizado correctamente'
            })
            $("#modalAvion").modal('hide');
            Mostrar_Avion();
            clearTextBox_AV();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para eliminar los datos
function Delete_Avion(ID) {
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
                url: "/Admin/Delete_Avion/" + ID,
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Aerolinea eliminada correctamente'
                    })
                    Mostrar_Avion();
                }, function(errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}

//Funcion para limpiar txt
function clearTextBox_AV() {
    $("#AvionID").val("");
    $("#Avion").val("");
    $("#velocidad_c").val("");
    $("#altura_m").val("");
    $("#capacidad_c").val("");
    $("#cant_eje").val("");
    $("#cant_eco").val("");
    $("#btnUpdate_AV").hide();
    $("#btnAdd_AV").show();
    $('#Avion').css('border-color', 'lightgrey');
    $('#velocidad_c').css('border-color', 'lightgrey');
    $('#altura_m').css('border-color', 'lightgrey');
    $('#capacidad_c').css('border-color', 'lightgrey');
    $('#cant_eje').css('border-color', 'lightgrey');
    $('#cant_eco').css('border-color', 'lightgrey');

}

//Funcion para validar campos
function validate() {
    var isValid = true;
    if ($('#Avion').val().trim() == "") {
        $('#Avion').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Avion').css('border-color', 'lightgrey');
    }
    if ($('#velocidad_c').val().trim() == "") {
        $('#velocidad_c').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#velocidad_c').css('border-color', 'lightgrey');
    }
    if ($('#altura_m').val().trim() == "") {
        $('#altura_m').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#altura_m').css('border-color', 'lightgrey');
    }
    if ($('#capacidad_c').val().trim() == "") {
        $('#capacidad_c').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#capacidad_c').css('border-color', 'lightgrey');
    }
    if ($('#cant_eje').val().trim() == "") {
        $('#cant_eje').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#cant_eje').css('border-color', 'lightgrey');
    }
    if ($('#cant_eco').val().trim() == "") {
        $('#cant_eco').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#cant_eco').css('border-color', 'lightgrey');
    }

    return isValid;
}