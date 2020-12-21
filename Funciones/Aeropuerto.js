$(document).ready(function () {
    Cbo_Cascada();
    Mostrar_Aeropuerto();
});



//Combobox en cascada
function Cbo_Cascada() {
    $("#Pais").change(function () {
        var id = $(this).val();
        $("#cboCiudad").empty();
        $.get("Enlazar_Ciudad", { id_pais: id }, function (data) {
            var v = "<option>---Seleccione la ciudad---</option>";
            $.each(data, function (i, v1) {
                v += "<option value=" + v1.Value + ">" + v1.Text + "</option>";
            });
            $("#cboCiudad").html(v);
        });
    });
}

//Mostrar los datos
function Mostrar_Aeropuerto() {
    $.ajax({
        url: "/Admin/List_Aeropuerto/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Aeropuerto_ID + '</td>';
                html += '<td>' + item.Nombre_Aer + '</td>';
                html += '<td style="display:none;">' + item.Pais_ID + '</td>';
                html += '<td>' + item.Pais_N + '</td>';
                html += '<td style="display:none;">' + item.Ciudad_ID + '</td>';
                html += '<td>' + item.Ciudad_N + '</td>';
                html += '<td>' + item.Direccion_Aer + '</td>';
                html += '<td><a href="#" onclick="return MostrarPorID_AER(' + item.Aeropuerto_ID + ');" class="btn  bg-info"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Editar</a> | <a href="#" onclick="return Delete_Aeropuerto(' + item.Aeropuerto_ID + ')" class="btn bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Eliminar</a></td>';
                html += '</tr>';
            });
            $('tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para ingresar datos

function Add_Aeropuerto() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var aeroObj = {
        Aeropuerto_ID: $('#AeropuertoID').val(),
        Nombre_Aer: $("#Aeropuerto").val(),
        Ciudad_ID: $("#cboCiudad").val(),
        Direccion_Aer: $("#DireccAer").val(),
    };
    $.ajax({
        url: "/Admin/Add_Aeropuerto",
        data: JSON.stringify(aeroObj),
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
                title: 'Aeropuerto agregado correctamente'
            })
            $("#modalAeropuerto").modal('hide');
            Mostrar_Aeropuerto();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Funcion para traaer los datos al modal

function MostrarPorID_AER(aerID) {
    $('#Aeropuerto').css('border-color', 'lightgrey');
    $('#Pais').css('border-color', 'lightgrey');
    $('#cboCiudad').css('border-color', 'lightgrey');
    $('#DireccAer').css('border-color', 'lightgrey');
    

    $.ajax({
        url: "/Admin/MostrarPorID_AER/" + aerID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
           
            $('#AeropuertoID').val(result.Aeropuerto_ID);
            $('#Aeropuerto').val(result.Nombre_Aer);
            $('#Pais').val(result.Pais_ID);
            $('#id_ciudad').val(result.Ciudad_ID);
            $('#cboCiudad').val(result.Ciudad_ID);
            $('#DireccAer').val(result.Direccion_Aer);
            $('#modalAeropuerto').modal('show');
            $('#btnUpdate_AER').show();
            $('#btnAdd_AER').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Funcion para actualizar datos
function Update_Aeropuerto() {
    var res = validate();
    if (res == false) {
        return false;
    }
    
    if (!$('#cboCiudad').val()) {
        var empObj = {
            Aeropuerto_ID: $('#AeropuertoID').val(),
            Nombre_Aer: $("#Aeropuerto").val(),
            Ciudad_ID: $("#id_ciudad").val(),
            Direccion_Aer: $("#DireccAer").val(),
        };
    } else  {
        var empObj = {
            Aeropuerto_ID: $('#AeropuertoID').val(),
            Nombre_Aer: $("#Aeropuerto").val(),
            Ciudad_ID: $('#cboCiudad').val(),
            Direccion_Aer: $("#DireccAer").val(),
        };
    }
    
    $.ajax({
        url: "/Admin/Update_Aeropuerto",
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
                title: 'Aeropuerto actualizado correctamente'
            })
            $("#modalAeropuerto").modal('hide');
            Mostrar_Aeropuerto();
            clearTextBox_AER();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Funcion para eliminar aeropuerto
function Delete_Aeropuerto(ID) {
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
                url: "/Admin/Delete_Aeropuerto/" + ID,
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
                        title: 'Aeropuerto eliminado correctamente'
                    })
                    Mostrar_Aeropuerto();
                }, function(errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}

//Funcion para limpiar txt
function clearTextBox_AER() {
    $("#AeropuertoID").val("");
    $("#Aeropuerto").val("");
    $("#Pais").val("");
    $("#cboCiudad").val("");
    $("#DireccAer").val("");
    $("#btnUpdate_AER").hide();
    $("#btnAdd_AER").show();
    $('#Aeropuerto').css('border-color', 'lightgrey');
    $('#Pais').css('border-color', 'lightgrey');
    $('#cboCiudad').css('border-color', 'lightgrey');
    $('#DireccAer').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#Aeropuerto').val().trim() == "") {
        $('#Aeropuerto').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Aeropuerto').css('border-color', 'lightgrey');
    }
    if ($('#Pais').val().trim() == "") {
        $('#Pais').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Pais').css('border-color', 'lightgrey');
    }
    if ($('#DireccAer').val().trim() == "") {
        $('#DireccAer').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#DireccAer').css('border-color', 'lightgrey');
    }

    return isValid;
}