using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sistema_RV.Models
{
    public class Vuelos
    {
        public int Vuelo_ID { get; set; }

        public string Cod_Vuelo { get; set; }

        public int Avion_ID { get; set; }
        public string Avion { get; set; }
        public int Aerolinea_ID { get; set; }
        public string Aerolinea { get; set; }

        public int Tipo_Vuelo_ID { get; set; }
        public string Tipo_Vuelo { get; set; }

        public int Asientos_D { get; set; }

        public string  Fec_Vuelo { get; set; }

        public string  Hora_S { get; set; }

        public string  Lugar_S { get; set; }

        public string  Hora_L { get; set; }

        public string Fec_Vuelo_L { get; set; }

        public int Lugar_L { get; set; }
        public string Lugar_Llegada { get; set; }

        public string Duracion_Vuelo { get; set; }

        public int Estado_Vuelo_ID { get; set; }
        public string Estado_Vuelo { get; set; }

        public int Login_ID { get; set; }
        public string Usuario { get; set; }

        public string Precio_Vuelo_V { get; set; }

        public decimal Precio_Vuelo { get; set; }

        public string Pais { get; set; }

    }
}