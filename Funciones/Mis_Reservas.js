$(document).ready(function () {
    Mostrar_Reserva();
});

function Mostrar_Reserva() {
    $.ajax({
        url: "/Usuario/List_Reservas/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ID_Reserva + '</td>';
                html += '<td>' + item.Vuelo_COD + '</td>';
                html += '<td>' + item.Fec_Vuelo + '</td>';
                html += '<td>' + item.H_Salida + '</td>';
                html += '<td>' + item.L_Salida + '</td>';
                html += '<td>' + item.Fec_Reserva + '</td>';
                html += '<td>' + item.Price_R + '</td>';
                html += '<td>' + item.Estado_Reserva + '</td>';
                html += '</tr>';
            });
            $('tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
