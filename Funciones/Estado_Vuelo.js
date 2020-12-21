$(document).ready(function () {
    Mostrar_Estados();
});

//Funcion para mostrar tabla
function Mostrar_Estados() {
    $.ajax({
        url: "/Admin/List_Estado_Vuelo/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Estado_ID + '</td>';
                html += '<td>' + item.Estado + '</td>';
                html += '<td>' + item.Descripcion + '</td>';
                html += '<td><a href="#" onclick="return MostrarPorID(' + item.Estado_ID + ');" class="btn  bg-info"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Editar</a> | <a href="#" onclick="return Delete_Estado_Vuelo(' + item.Estado_ID + ')" class="btn bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Eliminar</a></td>';
                html += '</tr>';
            });
            $('tbody').html(html);
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para ingresar estados
function Add_Estado_Vuelo() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Estado_ID: $('#EstadoID').val(),
        Estado: $("#Estado").val(),
        Descripcion: $("#Descrip").val(),
    };
    $.ajax({
        url: "/Admin/Add_Estado_Vuelo",
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
                title: 'Estado agregado correctamente'
            })
            $("#modalEstadoVuelo").modal('hide');
            Mostrar_Estados();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para traer los datos al modal
function MostrarPorID(EstID) {
    $('#EstadoID').css('border-color', 'lightgrey');
    $('#Estado').css('border-color', 'lightgrey');
    $('#Descrip').css('border-color', 'lightgrey');
    
    $.ajax({
        url: "/Admin/MostrarPorID_EV/" + EstID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#EstadoID').val(result.Estado_ID);
            $('#Estado').val(result.Estado);
            $('#Descrip').val(result.Descripcion);
            $('#modalEstadoVuelo').modal('show');
            $('#btnUpdate_EV').show();
            $('#btnAdd_EV').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Funcion para actualizar
function Update_Estado_Vuelo() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Estado_ID: $('#EstadoID').val(),
        Estado: $("#Estado").val(),
        Descripcion: $("#Descrip").val(),
    };
    $.ajax({
        url: "/Admin/Update_Estado_Vuelo",
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
                title: 'Estado actualizado correctamente'
            })
            $("#modalEstadoVuelo").modal('hide');
            Mostrar_Estados();
            clearTextBox_EST();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para eliminar estados
function Delete_Estado_Vuelo(ID) {
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
                url: "/Admin/Delete_Estado_Vuelo/" + ID,
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
                        title: 'Estado eliminado correctamente'
                    })
                    Mostrar_Estados();
                }, function(errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}

//Funcion para limpiar txt
function clearTextBox_EST() {
    $("#EstadoID").val("");
    $("#Estado").val("");
    $("#Descrip").val("");
    $("#btnUpdate_EV").hide();
    $("#btnAdd_EV").show();
    $('#Estado').css('border-color', 'lightgrey');
    $('#Descrip').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#Estado').val().trim() == "") {
        $('#Estado').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Estado').css('border-color', 'lightgrey');
    }
    if ($('#Descrip').val().trim() == "") {
        $('#Descrip').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Descrip').css('border-color', 'lightgrey');
    }
    
    return isValid;
}
