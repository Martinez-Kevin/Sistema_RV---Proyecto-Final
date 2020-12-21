using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;

namespace Sistema_RV.Models
{
    public class Pais_BD
    {
        string cs = ConfigurationManager.ConnectionStrings["DatabaseString"].ConnectionString;

        //Mostrar Pais 
        public List<Pais> Mostrar_Pais()
        {
            List<Pais> lst = new List<Pais>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_pais", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Pais
                    {
                        Pais_ID = Convert.ToInt32(dr["id_pais"]),
                        Nombre_Pais = dr["nombre_pais"].ToString()
                    });
                }
                return lst;
            }

        }

        //Insert Pais
        public int Insert_Pais(Pais p)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_insert_pais", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre", p.Nombre_Pais);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Update pais
        public int Update_Pais(Pais p)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_update_pais", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", p.Pais_ID);
                cmd.Parameters.AddWithValue("@nombre", p.Nombre_Pais);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Delete pais
        public int Delete_Pais(int Id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_delete_pais", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", Id);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

       

    }
}