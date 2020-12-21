$(document).ready(function () {
    Mostrar_Pais();
});


//Funcion para mostrar tabla
function Mostrar_Pais() {
    $.ajax({
        url: "/Admin/List_Pais/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Pais_ID + '</td>';
                html += '<td>' + item.Nombre_Pais + '</td>';
                html += '<td><a href="#" onclick="return MostrarPorID_P(' + item.Pais_ID + ');" class="btn  bg-info"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Editar</a> | <a href="#" onclick="return Delete_Pais(' + item.Pais_ID + ')" class="btn bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Eliminar</a></td>';
                html += '</tr>';
            });
            $('tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para ingresar pais
function Add_Pais() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Pais_ID: $('#paisID').val(),
        Nombre_Pais: $("#nombrePais").val(),
    };
    $.ajax({
        url: "/Admin/Add_Pais",
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
                title: 'Pais agregado correctamente'
            })
            $("#modalPais").modal('hide');
            Mostrar_Pais();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para traer los datos al modal
function MostrarPorID_P(pID) {
    $('#nombrePais').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Admin/MostrarPorID_P/" + pID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#paisID').val(result.Pais_ID);
            $('#nombrePais').val(result.Nombre_Pais);
            $('#modalPais').modal('show');
            $('#btnUpdate_P').show();
            $('#btnAdd_P').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
var pais = $("#nombrePais").val();

function PaisUnico(pais) {
    $('#nombrePais').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Admin/PaisUnico/" + pais,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pais ya registrado!'
            })    
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Funcion para actualizar
function Update_Pais() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Pais_ID: $('#paisID').val(),
        Nombre_Pais: $("#nombrePais").val(),
    };
    $.ajax({
        url: "/Admin/Update_Pais",
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
                title: 'Pais actualizado correctamente'
            })
            $("#modalPais").modal('hide');
            Mostrar_Pais();
            clearTextBox_P();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para eliminar estados
function Delete_Pais(ID) {
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
                url: "/Admin/Delete_Pais/" + ID,
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
                        title: 'Pais eliminado correctamente'
                    })
                    Mostrar_Pais();
                }, function(errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}




//Funcion para limpiar txt
function clearTextBox_P() {
    $("#paisID").val("");
    $("#nombrePais").val("");
    $("#btnUpdate_P").hide();
    $("#btnAdd_P").show();
    $('#nombrePais').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#nombrePais').val().trim() == "") {
        $('#nombrePais').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#nombrePais').css('border-color', 'lightgrey');
    }
    return isValid;
}