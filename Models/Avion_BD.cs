using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;


namespace Sistema_RV.Models
{
    public class Avion_BD
    {
        string cs = ConfigurationManager.ConnectionStrings["DatabaseString"].ConnectionString;

        //Mostrar Avion
        public List<Avion> Mostrar_Avion()
        {
            List<Avion> lst = new List<Avion>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_avion", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Avion
                    {                       
                        AvionID = Convert.ToInt32(dr["id_avion"]),
                        Nombre_Avion = dr["nombre_avion"].ToString(),
                        Velocidad_C = dr["velocidad_crucero"].ToString(),
                        Altura_M = dr ["altura_maxima"].ToString(),
                        Capacidad_C = dr["capacidad_carga"].ToString(),
                        Cantidad_Ejecutiva = Convert.ToInt32(dr["cant_silla_ejecutiva"]),
                        Cantidad_Economica = Convert.ToInt32(dr["cant_silla_economica"]),
                        Asientos_Total = Convert.ToInt32(dr["Cant_Asientos_Total"]),
                    });
                }
                return lst;
            }

        }

        //Insertar Avion
        public int Insert_Avion(Avion av)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_insert_avion", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre", av.Nombre_Avion);
                cmd.Parameters.AddWithValue("@velocidad_c", av.Velocidad_C);
                cmd.Parameters.AddWithValue("@altura_m", av.Altura_M);
                cmd.Parameters.AddWithValue("@capacidad_c", av.Capacidad_C);
                cmd.Parameters.AddWithValue("@cant_ejecutiva", av.Cantidad_Ejecutiva);
                cmd.Parameters.AddWithValue("@cant_economica", av.Cantidad_Economica);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Update Avion
        public int Update_Avion(Avion av)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_update_avion", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", av.AvionID);
                cmd.Parameters.AddWithValue("@nombre", av.Nombre_Avion);
                cmd.Parameters.AddWithValue("@velocidad_c", av.Velocidad_C);
                cmd.Parameters.AddWithValue("@altura_m", av.Altura_M);
                cmd.Parameters.AddWithValue("@capacidad_c", av.Capacidad_C);
                cmd.Parameters.AddWithValue("@cant_ejecutiva", av.Cantidad_Ejecutiva);
                cmd.Parameters.AddWithValue("@cant_economica", av.Cantidad_Economica);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Delete Avion
        public int Delete_Avion(int Id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_delete_avion", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", Id);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
    }
}