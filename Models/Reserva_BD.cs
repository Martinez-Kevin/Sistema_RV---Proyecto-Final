using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace Sistema_RV.Models
{
    public class Reserva_BD
    {
        string cs = ConfigurationManager.ConnectionStrings["DatabaseString"].ConnectionString;

        //Obtener el pais
        public DataSet Obtener_Pais_R()
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


        //Obtener ciudad
        public DataSet Obtener_Ciudad_R(string id_pais)
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

        //Obtener la clase del vuelo
        public DataSet Obtener_Tip_Vuelo()
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Select id_tip_vuelo,tipo_vuelo from Tipo_Vuelo order by tipo_vuelo asc", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                return ds;
            }
        }

        public List<Reserva> Mostrar_Vuelos_R(Reserva r)
        {
            List<Reserva> lst = new List<Reserva>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_busqueda_vuelo", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@fec_vuelo", r.Fec_Vuelo_E);
                cmd.Parameters.AddWithValue("@ciudad", r.Ciudad_ID);
                cmd.Parameters.AddWithValue("@tipo_vuelo", r.Tipo_Vuelo_ID);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Reserva
                    {
                        ID_Vuelo = Convert.ToInt32(dr["id_vuelo"]),
                        Vuelo_COD = dr["cod_vuelo"].ToString(),
                        Aerolinea = dr["nombre_aerolinea"].ToString(),
                        Tip_Vuelo = dr["tipo_vuelo"].ToString(),
                        Fec_Vuelo = dr["fec_vuelo"].ToString(),
                        H_Salida = dr["hora_salida"].ToString(),
                        L_Salida = dr["lugar_salida"].ToString(),
                        Fec_Llegada = dr["fec_llegada"].ToString(),
                        L_Llegada = dr["nombre_aeropuerto"].ToString(),
                        H_Llegada = dr["hora_llegada"].ToString(),
                        Duracion = dr["duracion_vuelo"].ToString(),
                        Precio = dr["precio_vuelo"].ToString(),
                    });
                }
                return lst;
            }

        }

        //Para mostrar por ID
        public List<Reserva> Mostrar_Vuelos_R_T()
        {
            List<Reserva> lst = new List<Reserva>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_v_r", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Reserva
                    {
                        ID_Vuelo = Convert.ToInt32(dr["id_vuelo"]),
                        Vuelo_COD = dr["cod_vuelo"].ToString(),
                        Aerolinea = dr["nombre_aerolinea"].ToString(),
                        Tip_Vuelo = dr["tipo_vuelo"].ToString(),
                        Fec_Vuelo = dr["fec_vuelo"].ToString(),
                        H_Salida = dr["hora_salida"].ToString(),
                        L_Salida = dr["lugar_salida"].ToString(),
                        Fec_Llegada = dr["fec_llegada"].ToString(),
                        L_Llegada = dr["nombre_aeropuerto"].ToString(),
                        H_Llegada = dr["hora_llegada"].ToString(),
                        Duracion = dr["duracion_vuelo"].ToString(),
                        Precio = dr["precio_vuelo"].ToString(),
                        Price = Convert.ToDecimal(dr["precio_vuelo"]),
                    });
                }
                return lst;
            }

        }

        //Ingresar reserva
        public int Insert_Reserva(Reserva r)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_insert_reserva", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id_vuelo", r.ID_Vuelo);
                cmd.Parameters.AddWithValue("@login_id", r.Login_ID);
                cmd.Parameters.AddWithValue("@contacto", r.Contacto);
                cmd.Parameters.AddWithValue("@tel", r.Tel_Contacto);
                cmd.Parameters.AddWithValue("@cant", r.Cantidad_P);
                cmd.Parameters.AddWithValue("@precio_total", r.Price_Total);
                cmd.Parameters.AddWithValue("@estado_r", 1);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public List<Reserva> Mostrar_Reservas()
        {
            List<Reserva> lst = new List<Reserva>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_reservas_user", con);
                cmd.Parameters.AddWithValue("@login_id", Convert.ToInt32(@HttpContext.Current.Session["LoginID"].ToString()));
                cmd.CommandType = System.Data.CommandType.StoredProcedure;            
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Reserva
                    {
                        ID_Reserva = Convert.ToInt32(dr["id_reserva"]),
                        Vuelo_COD = dr["cod_vuelo"].ToString(),
                        Fec_Vuelo = dr["fec_vuelo"].ToString(),
                        H_Salida = dr["hora_salida"].ToString(),
                        L_Salida = dr["lugar_salida"].ToString(),
                        Fec_Reserva = dr["fec_reserva"].ToString(),
                        Price_R = dr["precio_total"].ToString(),
                        Estado_Reserva = dr["estado_reserva"].ToString(),
                    });
                }
                return lst;
            }

        }


       








    }
}