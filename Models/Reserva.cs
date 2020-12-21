using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sistema_RV.Models
{
    public class Reserva
    {
        //Para la busqueda
        public string Fec_Vuelo { get; set; }

        public string Fec_Vuelo_E { get; set; }
        public int Ciudad_ID { get; set; }

        public int Tipo_Vuelo_ID { get; set; }

        //Para mostrar
        public int ID_Vuelo { get; set; }

        public string Vuelo_COD { get; set; }

        public string Aerolinea { get; set; }

        public string Tip_Vuelo { get; set; }

        public string H_Salida { get; set; }

        public  string L_Salida { get; set; }

        public string Ciudad { get; set; }

        public string Fec_Llegada { get; set; }

        public string L_Llegada { get; set; }

        public string H_Llegada { get; set; }

        public string Duracion { get; set; }

        public string Precio { get; set; }
        public decimal Price { get; set; }

        public int Login_ID { get; set; }

        public string Contacto { get; set; }

        public string Tel_Contacto { get; set; }

        public int Cantidad_P { get; set; }

        public decimal  Price_Total { get; set; }

        public int Estado_Reserva_V { get; set; }

        public string Estado_Reserva { get; set; }

        public string Fec_Reserva{ get; set; }

        public  string Price_R{ get; set; }

        public int ID_Reserva { get; set; }

    }
}