using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace Sistema_RV.Models
{
    public class Ciudad_BD
    {
        string cs = ConfigurationManager.ConnectionStrings["DatabaseString"].ConnectionString;

        //Mostrar Ciudad
        public List<Ciudad> Mostrar_Ciudad()
        {
            List<Ciudad> lst = new List<Ciudad>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_ciudad", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Ciudad
                    {
                        Ciudad_ID = Convert.ToInt32(dr["id_ciudad"]),
                        Nombre_Ciudad = dr["nombre_ciudad"].ToString(),
                        Nombre_Pais = dr["nombre_pais"].ToString(),
                        Pais_ID = Convert.ToInt32(dr["id_pais"]),
                    });
                }
                return lst;
            }

        }

        //Insertar ciudad
        public int Insert_Ciudad(Ciudad c)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_insert_ciudad", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre_c", c.Nombre_Ciudad);
                cmd.Parameters.AddWithValue("@id_pais", c.Pais_ID);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Update ciudad
        public int Update_Ciudad(Ciudad c)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_update_ciudad", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", c.Ciudad_ID);
                cmd.Parameters.AddWithValue("@id_pais", c.Pais_ID);
                cmd.Parameters.AddWithValue("@nombre_c", c.Nombre_Ciudad);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Delete ciudad

        public int Delete_Ciudad(int Id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_delete_ciudad", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", Id);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Obtener los datos en un combo box
        public DataSet Obtener_Pais()
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Select * from Pais order by nombre_pais asc ", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                return ds;
            }            
        }

    }
}