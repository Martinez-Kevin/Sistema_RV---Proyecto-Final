$(document).ready(function () {
    Mostrar_Ciudad();
});

//Funcion para mostrar tabla
function Mostrar_Ciudad() {
    $.ajax({
        url: "/Admin/List_Ciudad/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Ciudad_ID + '</td>';
                html += '<td>' + item.Nombre_Ciudad + '</td>';
                html += '<td style="display:none;">' + item.Pais_ID + '</td>';
                html += '<td>' + item.Nombre_Pais + '</td>';
                html += '<td><a href="#" onclick="return MostrarPorID_C(' + item.Ciudad_ID + ');" class="btn  bg-info"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Editar</a> | <a href="#" onclick="return Delete_Ciudad(' + item.Ciudad_ID + ')" class="btn bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Eliminar</a></td>';
                html += '</tr>';
            });
            $('tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para ingresar ciudades
function Add_Ciudad() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Ciudad_ID: $('#CiudadID').val(),
        Nombre_Ciudad: $("#Ciudad").val(),
        Pais_ID: $("#Pais").val(),
    };
    $.ajax({
        url: "/Admin/Add_Ciudad",
        data: JSON.stringify(empObj),
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
                title: 'Ciudad agregada correctamente'
            })
            $("#modalCiudad").modal('hide');
            Mostrar_Ciudad();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Funcion para traer los datos al modal
function MostrarPorID_C(cID) {
    $('#CiudadID').css('border-color', 'lightgrey');
    $('#Ciudad').css('border-color', 'lightgrey');
    $('#Pais').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Admin/MostrarPorID_C/" + cID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#CiudadID').val(result.Ciudad_ID);
            $('#Ciudad').val(result.Nombre_Ciudad);
            $('#Pais').val(result.Pais_ID);
            $('#modalCiudad').modal('show');
            $('#btnUpdate_C').show();
            $('#btnAdd_C').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


//Funcion para actualizar
function Update_Ciudad() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var cObj = {
        Ciudad_ID: $('#CiudadID').val(),
        Nombre_Ciudad: $("#Ciudad").val(),
        Pais_ID: $("#Pais").val(),
    };
    $.ajax({
        url: "/Admin/Update_Ciudad",
        data: JSON.stringify(cObj),
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
                title: 'Ciudad actualizada correctamente'
            })
            $("#modalCiudad").modal('hide');
            Mostrar_Ciudad();
            clearTextBox_C();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Funcion para eliminar estados
function Delete_Ciudad(ID) {
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
                url: "/Admin/Delete_Ciudad/" + ID,
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
                        title: 'Ciudad eliminada correctamente'
                    })
                    Mostrar_Ciudad();
                }, function(errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}


//Funcion para limpiar txt
function clearTextBox_C() {
    $("#CiudadID").val("");
    $("#Ciudad").val("");
    $("#Pais").val("");
    $("#btnUpdate_C").hide();
    $("#btnAdd_C").show();
    $('#Ciudad').css('border-color', 'lightgrey');
    $('#Pais').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#Ciudad').val().trim() == "") {
        $('#Ciudad').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Ciudad').css('border-color', 'lightgrey');
    }
    if ($('#Pais').val().trim() == "") {
        $('#Pais').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Pais').css('border-color', 'lightgrey');
    }

    return isValid;
}