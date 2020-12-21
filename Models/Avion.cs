using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sistema_RV.Models
{
    public class Avion
    {
        public int AvionID { get; set; }

        public string Nombre_Avion { get; set; }

        public string Velocidad_C { get; set; }

        public string Altura_M { get; set; }

        public string Capacidad_C { get; set; }

        public int Cantidad_Ejecutiva { get; set; }

        public int Cantidad_Economica { get; set; }

        public int Asientos_Total { get; set; }

    }
}