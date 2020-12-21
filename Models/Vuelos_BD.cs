using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace Sistema_RV.Models
{
    public class Vuelos_BD
    {
        string cs = ConfigurationManager.ConnectionStrings["DatabaseString"].ConnectionString;

        //Combobox enlazados con la base de datos
        public DataSet Obtener_Avion()
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Select id_avion,nombre_avion from Aviones order by nombre_avion asc", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                return ds;
            }
        }

        public DataSet Obtener_Aerolinea()
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Select id_aerolinea,nombre_aerolinea from Aerolinea order by nombre_aerolinea asc", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                return ds;
            }
        }

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

        public DataSet Obtener_Pais_V()
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

        public DataSet Obtener_Ciudad_V(string id_pais)
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


        public DataSet Obtener_Aeropuerto_V(string id_ciudad)
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Select * from Aeropuerto where id_ciudad=@id_ciudad", con);
                cmd.Parameters.AddWithValue("@id_ciudad", id_ciudad);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                return ds;
            }
        }

        public DataSet Obtener_Estado_Vuelo()
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Select id_estado_vuelo,nombre_estado from Estado_Vuelo order by nombre_estado asc", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                return ds;
            }
        }

        //Mantenimientos de la tabla de vuelos
        public List<Vuelos> Mostrar_Vuelos()
        {
            List<Vuelos> lst = new List<Vuelos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_vuelo_v", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Vuelos
                    {
                        Vuelo_ID = Convert.ToInt32(dr["id_vuelo"]),
                        Cod_Vuelo = dr["cod_vuelo"].ToString(),
                        Avion = dr["nombre_avion"].ToString(),
                        Aerolinea = dr["nombre_aerolinea"].ToString(),
                        Tipo_Vuelo = dr["tipo_vuelo"].ToString(),
                        Asientos_D = Convert.ToInt32(dr["asientos_disponibles"]),
                        Fec_Vuelo = dr["fec_vuelo"].ToString(),
                        Hora_S= dr["hora_salida"].ToString(),
                        Lugar_S = dr["lugar_salida"].ToString(),
                        Fec_Vuelo_L = dr["fec_llegada"].ToString(),
                        Hora_L = dr["hora_llegada"].ToString(),
                        Pais = dr["nombre_pais"].ToString(),
                        Lugar_Llegada = dr["lugar_llegada"].ToString(),
                        Duracion_Vuelo = dr["duracion_vuelo"].ToString(),
                        Precio_Vuelo_V = dr["precio_vuelo"].ToString(),
                        Estado_Vuelo = dr["nombre_estado"].ToString(),
                        Usuario = dr["Username"].ToString()
                    });
                }
                return lst;
            }

        }

        //Mostar vuelos para modificar
        public List<Vuelos> Mostrar_Vuelos_V()
        {
            List<Vuelos> lst = new List<Vuelos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_mostrar_vuelos", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    lst.Add(new Vuelos
                    {
                        Vuelo_ID = Convert.ToInt32(dr["id_vuelo"]),
                        Cod_Vuelo = dr["cod_vuelo"].ToString(),
                        Avion_ID = Convert.ToInt32(dr["id_avion"]),
                        Aerolinea_ID = Convert.ToInt32(dr["id_aerolinea"]),
                        Tipo_Vuelo_ID = Convert.ToInt32(dr["id_tip_vuelo"]),
                        Asientos_D = Convert.ToInt32(dr["asientos_disponibles"]),
                        Fec_Vuelo = dr["fec_vuelo"].ToString(),
                        Hora_S = dr["hora_salida"].ToString(),
                        Lugar_S = dr["lugar_salida"].ToString(),
                        Fec_Vuelo_L = dr["fec_llegada"].ToString(),
                        Hora_L = dr["hora_llegada"].ToString(),
                        Lugar_L = Convert.ToInt32(dr["lugar_llegada"]),
                        Duracion_Vuelo = dr["duracion_vuelo"].ToString(),
                        Precio_Vuelo_V = dr["precio_vuelo"].ToString(),
                        Estado_Vuelo_ID = Convert.ToInt32(dr["id_estado_vuelo"]),
                        Login_ID = Convert.ToInt32(dr["LoginID"])
                    });
                }
                return lst;
            }

        }
        //Insertar vuelos
        public int Insert_Vuelo(Vuelos v)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_insert_vuelo", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@cod", v.Cod_Vuelo);
                cmd.Parameters.AddWithValue("@avion", v.Avion_ID);
                cmd.Parameters.AddWithValue("@aerolinea", v.Aerolinea_ID);
                cmd.Parameters.AddWithValue("@tipo_vuelo", v.Tipo_Vuelo_ID);
                cmd.Parameters.AddWithValue("@asientos", v.Asientos_D);
                cmd.Parameters.AddWithValue("@fecha_vuelo", v.Fec_Vuelo);
                cmd.Parameters.AddWithValue("@hora_salida", v.Hora_S);
                cmd.Parameters.AddWithValue("@lugar_salida", v.Lugar_S);
                cmd.Parameters.AddWithValue("@fecha_llegada", v.Fec_Vuelo_L);
                cmd.Parameters.AddWithValue("@hora_llegada", v.Hora_L);
                cmd.Parameters.AddWithValue("@lugar_llegada", v.Lugar_L);
                cmd.Parameters.AddWithValue("@duracion_vuelo", v.Duracion_Vuelo);
                cmd.Parameters.AddWithValue("@estado_vuelo", v.Estado_Vuelo_ID);
                cmd.Parameters.AddWithValue("@precio", v.Precio_Vuelo);
                cmd.Parameters.AddWithValue("@login_id", v.Login_ID);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Actualizar vuelos
        public int Update_Vuelo(Vuelos v)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_update_vuelo", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", v.Vuelo_ID);
                cmd.Parameters.AddWithValue("@cod", v.Cod_Vuelo);
                cmd.Parameters.AddWithValue("@avion", v.Avion_ID);
                cmd.Parameters.AddWithValue("@aerolinea", v.Aerolinea_ID);
                cmd.Parameters.AddWithValue("@tipo_vuelo", v.Tipo_Vuelo_ID);
                cmd.Parameters.AddWithValue("@asientos", v.Asientos_D);
                cmd.Parameters.AddWithValue("@fecha_vuelo", v.Fec_Vuelo);
                cmd.Parameters.AddWithValue("@hora_salida", v.Hora_S);
                cmd.Parameters.AddWithValue("@lugar_salida", v.Lugar_S);
                cmd.Parameters.AddWithValue("@fecha_llegada", v.Fec_Vuelo_L);
                cmd.Parameters.AddWithValue("@hora_llegada", v.Hora_L);
                cmd.Parameters.AddWithValue("@lugar_llegada", v.Lugar_L);
                cmd.Parameters.AddWithValue("@duracion_vuelo", v.Duracion_Vuelo);
                cmd.Parameters.AddWithValue("@estado_vuelo", v.Estado_Vuelo_ID);
                cmd.Parameters.AddWithValue("@precio", v.Precio_Vuelo);
                cmd.Parameters.AddWithValue("@login_id", v.Login_ID);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        //Eliminar vuelos
        public int Delete_Vuelo(int Id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("sp_delete_vuelo", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", Id);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

    }
}