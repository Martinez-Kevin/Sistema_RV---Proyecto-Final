using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace Sistema_RV.Models
{
    public class Aeropuerto_BD
    {
        string cs = ConfigurationManager.ConnectionStrings["DatabaseString"].ConnectionString;

        

        //Para mostrar combobox de ciudad
        public DataSet Obtener_Ciudad(string id_pais)
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Select * from Ciudad where id_pais=@id_pais", con);
                cmd.Parameters.AddWithValue("@id_pais", id_pais);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                return ds;
            }
        }

        //Mostrar Aeropuerto
        public List<Aeropuerto> Mostrar_Aeropuerto()
        {
            List<Aeropuerto> lst = new List<Aeropuerto>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_aeropuerto", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Aeropuerto
                    {
                        Aeropuerto_ID = Convert.ToInt32(dr["id_aeropuerto"]),
                        Nombre_Aer = dr["nombre_aeropuerto"].ToString(),
                        Pais_ID = Convert.ToInt32(dr["id_pais"]),
                        Pais_N = dr["nombre_pais"].ToString(),
                        Ciudad_ID = Convert.ToInt32(dr["id_ciudad"]),
                        Ciudad_N = dr["nombre_ciudad"].ToString(),
                        Direccion_Aer = dr["direccion_aer"].ToString()
                    });
                }
                return lst;
            }

        }

        //Insert Aeropuerto
        public int Insert_Aeropuerto(Aeropuerto aer)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_insert_aeropuerto", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre_aer", aer.Nombre_Aer);
                cmd.Parameters.AddWithValue("@ciudad", aer.Ciudad_ID);
                cmd.Parameters.AddWithValue("@direccion", aer.Direccion_Aer);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Update Aeropuerto
        public int Update_Aeropuerto(Aeropuerto aer)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_update_aeropuerto", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", aer.Aeropuerto_ID);
                cmd.Parameters.AddWithValue("@nombre_aer", aer.Nombre_Aer);
                cmd.Parameters.AddWithValue("@ciudad", aer.Ciudad_ID);
                cmd.Parameters.AddWithValue("@direccion", aer.Direccion_Aer);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Delete Aeropuerto
        public int Delete_Aeropuerto(int Id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_delete_aeropuerto", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", Id);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

    }
}