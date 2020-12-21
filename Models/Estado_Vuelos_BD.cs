using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;

namespace Sistema_RV.Models
{
    public class Estado_Vuelos_BD
    {
        string cs = ConfigurationManager.ConnectionStrings["DatabaseString"].ConnectionString;

        //Mostrar estados
        public List<Estado_Vuelo> Mostrar_Estado_Vuelos()
        {
            List<Estado_Vuelo> lst = new List<Estado_Vuelo>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_estados", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Estado_Vuelo
                    {
                        Estado_ID = Convert.ToInt32(dr["id_estado_vuelo"]),
                        Estado = dr["nombre_estado"].ToString(),
                        Descripcion = dr["descripcion"].ToString()
                    });
                }
                return lst;
            }

        }

        //Insertar estados
        public int Insert_Estado_Vuelo(Estado_Vuelo est)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_insert_estados", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre", est.Estado);
                cmd.Parameters.AddWithValue("@descrip", est.Descripcion);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Actualizar estados
        public int Update_Estado_Vuelo(Estado_Vuelo est)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_update_estados", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", est.Estado_ID);
                cmd.Parameters.AddWithValue("@nombre", est.Estado);
                cmd.Parameters.AddWithValue("@descrip", est.Descripcion);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Eliminar  estados
        public int Delete_Estado_Vuelo(int Id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_delete_estados", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", Id);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

    }
}