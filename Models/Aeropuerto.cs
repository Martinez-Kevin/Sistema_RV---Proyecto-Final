using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sistema_RV.Models
{
    public class Aeropuerto
    {
        public int Aeropuerto_ID { get; set; }

        public string Nombre_Aer { get; set; }

        public int Ciudad_ID { get; set; }

        public string Ciudad_N { get; set; }

        public int Pais_ID { get; set; }

        public string Pais_N { get; set; }

        public string Direccion_Aer { get; set; }

    }
}