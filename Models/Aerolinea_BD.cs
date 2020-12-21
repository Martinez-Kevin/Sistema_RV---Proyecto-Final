using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;

namespace Sistema_RV.Models
{
    public class Aerolinea_BD
    {
        string cs = ConfigurationManager.ConnectionStrings["DatabaseString"].ConnectionString;

        //Mostrar aerolineas
        public List<Aerolineas> Mostrar_Aerolinea()
        {
            List<Aerolineas> lst = new List<Aerolineas>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_aerolineas", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Aerolineas
                    {
                        Aerolinea_ID = Convert.ToInt32(dr["id_aerolinea"]),
                        Nombre_Aerolinea = dr["nombre_aerolinea"].ToString(),
                        p = dr["puntualidad"].ToString(),
                        cs = dr["calidad_servicio"].ToString(),
                        g = dr["gestion_reclamaciones"].ToString()
                    });
                }
                return lst;
            }

        }

        //Insertar aerolineas
        public int Insert_Aerolinea(Aerolineas aer)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_insert_aerolinea", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre", aer.Nombre_Aerolinea);
                cmd.Parameters.AddWithValue("@puntualidad", aer.Puntualidad);
                cmd.Parameters.AddWithValue("@calidad", aer.Calidad_Servicio);
                cmd.Parameters.AddWithValue("@gestion", aer.Gestion_Reclamo);

                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Actualizar aerolineas
        public int Update_Aerolinea(Aerolineas aer)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_update_aerolinea", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", aer.Aerolinea_ID);
                cmd.Parameters.AddWithValue("@nombre", aer.Nombre_Aerolinea);
                cmd.Parameters.AddWithValue("@puntualidad", aer.Puntualidad);
                cmd.Parameters.AddWithValue("@calidad", aer.Calidad_Servicio);
                cmd.Parameters.AddWithValue("@gestion", aer.Gestion_Reclamo);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Eliminar aerolinea
        public int Delete_Aerolinea(int Id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_delete_aerolinea", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", Id);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

    }
}