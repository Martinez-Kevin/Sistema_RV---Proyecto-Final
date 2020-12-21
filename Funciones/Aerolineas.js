$(document).ready(function () {
    Mostrar_Aerolineas();
    $("input").val($("input").val().replace(",", "."));
});

//Funcion para mostrar tabla
function Mostrar_Aerolineas() {
    $.ajax({
        url: "/Admin/List_Aerolinea/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Aerolinea_ID + '</td>';
                html += '<td>' + item.Nombre_Aerolinea + '</td>';
                html += '<td>' + item.p + '</td>';
                html += '<td>' + item.cs + '</td>';
                html += '<td>' + item.g + '</td>';
                html += '<td><a href="#" onclick="return MostrarPorID_AE(' + item.Aerolinea_ID + ');" class="btn  bg-info"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Editar</a> | <a href="#" onclick="return Delete_Aerolinea(' + item.Aerolinea_ID + ')" class="btn bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Eliminar</a></td>';
                html += '</tr>';
            });
            $('tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Funcion para ingresar aerolineas
function Add_Aerolinea() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var aeObj = {
        Aerolinea_ID: $('#AerolineaID').val(),
        Nombre_Aerolinea: $("#Nombre").val(),
        Puntualidad: $("#Puntualidad").val(),
        Calidad_Servicio: $("#Calidad_S").val(),
        Gestion_Reclamo: $("#Gestion_R").val(),
    };
    $.ajax({
        url: "/Admin/Add_Aerolinea",
        data: JSON.stringify(aeObj),
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
                title: 'Aerolinea agregada correctamente'
            })
            $("#modalAerolinea").modal('hide');
            Mostrar_Aerolineas();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para traer los datos al modal
function MostrarPorID_AE(AE_ID) {
    $('#Nombre').css('border-color', 'lightgrey');
    $('#Puntualidad').css('border-color', 'lightgrey');
    $('#Calidad_S').css('border-color', 'lightgrey');
    $('#Gestion_R').css('border-color', 'lightgrey');


    $.ajax({
        url: "/Admin/MostrarPorID_AE/" + AE_ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#AerolineaID').val(result.Aerolinea_ID);
            $('#Nombre').val(result.Nombre_Aerolinea);
            $('#Puntualidad').val(result.p);
            $('#Calidad_S').val(result.cs);
            $('#Gestion_R').val(result.g);
            $('#modalAerolinea').modal('show');
            $('#btnUpdate_AE').show();
            $('#btnAdd_AE').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Funcion para actualizar
function Update_Aerolinea() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var aeObj = {
        Aerolinea_ID: $('#AerolineaID').val(),
        Nombre_Aerolinea: $("#Nombre").val(),
        Puntualidad: $("#Puntualidad").val(),
        Calidad_Servicio: $("#Calidad_S").val(),
        Gestion_Reclamo: $("#Gestion_R").val(),
    };
    $.ajax({
        url: "/Admin/Update_Aerolinea",
        data: JSON.stringify(aeObj),
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
                title: 'Aerolinea actualizada correctamente'
            })
            $("#modalAerolinea").modal('hide');
            Mostrar_Aerolineas();
            clearTextBox_AE();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para eliminar estados
function Delete_Aerolinea(ID) {
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
                url: "/Admin/Delete_Aerolinea/" + ID,
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
                    Mostrar_Aerolineas();
                }, function(errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}

//Funcion para limpiar txt
function clearTextBox_AE() {
    $("#AerolineaID").val("");
    $("#Nombre").val("");
    $("#Puntualidad").val("");
    $("#Calidad_S").val("");
    $("#Gestion_R").val("");
    $("#btnUpdate_AE").hide();
    $("#btnAdd_AE").show();
    $('#Nombre').css('border-color', 'lightgrey');
    $('#Puntualidad').css('border-color', 'lightgrey');
    $('#Calidad_S').css('border-color', 'lightgrey');
    $('#Gestion_R').css('border-color', 'lightgrey');
    
}

//Funcion para validar campos
function validate() {
    var isValid = true;
    if ($('#Nombre').val().trim() == "") {
        $('#Nombre').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Nombre').css('border-color', 'lightgrey');
    }
    if ($('#Puntualidad').val().trim() == "") {
        $('#Puntualidad').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Puntualidad').css('border-color', 'lightgrey');
    }
    if ($('#Calidad_S').val().trim() == "") {
        $('#Calidad_S').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Calidad_S').css('border-color', 'lightgrey');
    }
    if ($('#Gestion_R').val().trim() == "") {
        $('#Gestion_R').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Gestion_R').css('border-color', 'lightgrey');
    }

    return isValid;
}

