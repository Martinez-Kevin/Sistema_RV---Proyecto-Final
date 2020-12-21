using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.Mvc;
using Sistema_RV.Models;


namespace Sistema_RV.Controllers
{
    [Authorize (Roles = "Administrador")]
    public class AdminController : Controller
    {
        // GET: Admin
        
        public ActionResult Admin()
        {
            return View();
        }

        Vuelos_BD bd_v = new Vuelos_BD();
        public ActionResult Vuelos()
        {
            Enlazar_Avion();
            Enlazar_Aerolinea();
            Enlazar_Tip_Vuelo();
            Enlazar_Pais_V();
            Enlazar_Pais_V2();
            Enlazar_Estado_Vuelo();
            return View();
        }


        public void Enlazar_Estado_Vuelo()
        {
            DataSet ds = bd_v.Obtener_Estado_Vuelo();
            List<SelectListItem> estado_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                estado_list.Add(new SelectListItem { Text = dr["nombre_estado"].ToString(), Value = dr["id_estado_vuelo"].ToString() });
            }
            ViewBag.Estado_V = estado_list;
        }

        public void Enlazar_Avion()
        {
            DataSet ds = bd_v.Obtener_Avion();
            List<SelectListItem> avion_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                avion_list.Add(new SelectListItem { Text = dr["nombre_avion"].ToString(), Value = dr["id_avion"].ToString() });
            }
            ViewBag.AvionV = avion_list;
        }

        public void Enlazar_Aerolinea()
        {
            DataSet ds = bd_v.Obtener_Aerolinea();
            List<SelectListItem> aerolinea_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                aerolinea_list.Add(new SelectListItem { Text = dr["nombre_aerolinea"].ToString(), Value = dr["id_aerolinea"].ToString() });
            }
            ViewBag.AerolineaV = aerolinea_list;
        }

        public void Enlazar_Tip_Vuelo()
        {
            DataSet ds = bd_v.Obtener_Tip_Vuelo();
            List<SelectListItem> t_vuelo_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                t_vuelo_list.Add(new SelectListItem { Text = dr["tipo_vuelo"].ToString(), Value = dr["id_tip_vuelo"].ToString() });
            }
            ViewBag.TipoV = t_vuelo_list;
        }

        public void Enlazar_Pais_V()
        {
            DataSet ds = bd_v.Obtener_Pais_V();
            List<SelectListItem> pais_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                pais_list.Add(new SelectListItem { Text = dr["nombre_pais"].ToString(), Value = dr["id_pais"].ToString() });
            }
            ViewBag.Pais_V = pais_list;
        }

        public void Enlazar_Pais_V2()
        {
            DataSet ds = bd_v.Obtener_Pais_V();
            List<SelectListItem> pais_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                pais_list.Add(new SelectListItem { Text = dr["nombre_pais"].ToString(), Value = dr["id_pais"].ToString() });
            }
            ViewBag.Pais_V2 = pais_list;
        }

        public JsonResult Enlazar_Ciudad_V(string id_pais)
        {
            DataSet ds = bd_v.Obtener_Ciudad_V(id_pais);
            List<SelectListItem> ciudad_list = new List<SelectListItem>();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                ciudad_list.Add(new SelectListItem { Text = dr["nombre_ciudad"].ToString(), Value = dr["id_ciudad"].ToString() });
            }
            return Json(ciudad_list, JsonRequestBehavior.AllowGet);
        }

       

        public JsonResult Enlazar_Aeropuerto_V(string id_ciudad)
        {
            DataSet ds = bd_v.Obtener_Aeropuerto_V(id_ciudad);
            List<SelectListItem> aer_list = new List<SelectListItem>();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                aer_list.Add(new SelectListItem { Text = dr["nombre_aeropuerto"].ToString(), Value = dr["id_aeropuerto"].ToString() });
            }
            return Json(aer_list, JsonRequestBehavior.AllowGet);
        }

        //Mantenimientos de vuelos

        //Mostrar la informacion
        public JsonResult List_Vuelo()
        {
            return Json(bd_v.Mostrar_Vuelos(), JsonRequestBehavior.AllowGet);
        }

        //Ingresar registros
        public JsonResult Add_Vuelo(Vuelos v)
        {
            return Json(bd_v.Insert_Vuelo(v), JsonRequestBehavior.AllowGet);
        }

        //Mostrar por ID
        public JsonResult MostrarPorID_V(int ID)
        {
            var Vuelos = bd_v.Mostrar_Vuelos_V().Find(x => x.Vuelo_ID.Equals(ID));
            return Json(Vuelos, JsonRequestBehavior.AllowGet);
        }

        //Actualizar vuelos
        public JsonResult Update_Vuelo(Vuelos v)
        {
            return Json(bd_v.Update_Vuelo(v), JsonRequestBehavior.AllowGet);
        }

        //Eliminar vuelos
        public JsonResult Delete_Vuelo(int ID)
        {
            return Json(bd_v.Delete_Vuelo(ID), JsonRequestBehavior.AllowGet);
        }


        //--------------------------------------------Avion-------------------------------------------------------------//

        Avion_BD bd_av = new Avion_BD();
        public ActionResult Aviones()
        {
            return View();
        }

        //Mostrar
        public JsonResult List_Avion()
        {
            return Json(bd_av.Mostrar_Avion(), JsonRequestBehavior.AllowGet);
        }
        //Insertar
        public JsonResult Add_Avion(Avion av)
        {
            return Json(bd_av.Insert_Avion(av), JsonRequestBehavior.AllowGet);
        }
        //Mostar por ID
        public JsonResult MostrarPorID_AV(int ID)
        {
            var Avion = bd_av.Mostrar_Avion().Find(x => x.AvionID.Equals(ID));
            return Json(Avion, JsonRequestBehavior.AllowGet);
        }

        //Actualizar
        public JsonResult Update_Avion(Avion av)
        {
            return Json(bd_av.Update_Avion(av), JsonRequestBehavior.AllowGet);
        }

        //Eliminar
        public JsonResult Delete_Avion(int ID)
        {
            return Json(bd_av.Delete_Avion(ID), JsonRequestBehavior.AllowGet);
        }

        //--------------------------------------------Aerolineas-------------------------------------------------------------//

        Aerolinea_BD bd_aer = new Aerolinea_BD();
        public ActionResult Aerolineas()
        {
            return View();
        }
        //Mostrar
        public JsonResult List_Aerolinea()
        {
            return Json(bd_aer.Mostrar_Aerolinea(), JsonRequestBehavior.AllowGet);
        }

        //Insertar
        public JsonResult Add_Aerolinea(Aerolineas aer)
        {
            return Json(bd_aer.Insert_Aerolinea(aer), JsonRequestBehavior.AllowGet);
        }
        //Mostar por ID
        public JsonResult MostrarPorID_AE(int ID)
        {
            var Aerolinea = bd_aer.Mostrar_Aerolinea().Find(x => x.Aerolinea_ID.Equals(ID));
            return Json(Aerolinea, JsonRequestBehavior.AllowGet);
        }

        //Actualizar
        public JsonResult Update_Aerolinea(Aerolineas aer)
        {
            return Json(bd_aer.Update_Aerolinea(aer), JsonRequestBehavior.AllowGet);
        }

        //Eliminar
        public JsonResult Delete_Aerolinea(int ID)
        {
            return Json(bd_aer.Delete_Aerolinea(ID), JsonRequestBehavior.AllowGet);
        }




        //--------------------------------------------Estado Vuelo-------------------------------------------------------------//
        Estado_Vuelos_BD bd_est = new Estado_Vuelos_BD();
        public ActionResult Estado_Vuelo()
        {
            return View();
        }

        //Mostrar
        public JsonResult List_Estado_Vuelo()
        {
            return Json(bd_est.Mostrar_Estado_Vuelos(), JsonRequestBehavior.AllowGet);
        }
        
        //Insertar
        public JsonResult Add_Estado_Vuelo(Estado_Vuelo est)
        {
            return Json(bd_est.Insert_Estado_Vuelo(est), JsonRequestBehavior.AllowGet);
        }
        
        //Mostrar por ID
        public JsonResult MostrarPorID_EV(int ID)
        {
            var Estados_Vuelos = bd_est.Mostrar_Estado_Vuelos().Find(x => x.Estado_ID.Equals(ID));
            return Json(Estados_Vuelos, JsonRequestBehavior.AllowGet);
        }

        //Actualizar
        public JsonResult Update_Estado_Vuelo(Estado_Vuelo est)
        {
            return Json(bd_est.Update_Estado_Vuelo(est), JsonRequestBehavior.AllowGet);
        }

        //Eliminar
        public JsonResult Delete_Estado_Vuelo(int ID)
        {
            return Json(bd_est.Delete_Estado_Vuelo(ID), JsonRequestBehavior.AllowGet);
        }


        //--------------------------------------------Pais-------------------------------------------------------------//

        Pais_BD bd_p = new Pais_BD();
        public ActionResult Pais()
        {
            return View();
        }
        
        //Mostrar
        public JsonResult List_Pais()
        {
            return Json(bd_p.Mostrar_Pais(), JsonRequestBehavior.AllowGet);
        }

        //Insertar
        public JsonResult Add_Pais(Pais p)
        {
            return Json(bd_p.Insert_Pais(p), JsonRequestBehavior.AllowGet);
        }

        //Mostrar por ID
        public JsonResult MostrarPorID_P(int ID)
        {
            var Ciudad = bd_p.Mostrar_Pais().Find(x => x.Pais_ID.Equals(ID));
            return Json(Ciudad, JsonRequestBehavior.AllowGet);
        }

        //Actualizar
        public JsonResult Update_Pais(Pais p)
        {
            return Json(bd_p.Update_Pais(p), JsonRequestBehavior.AllowGet);
        }

        //Eliminar
        public JsonResult Delete_Pais(int ID)
        {
            return Json(bd_p.Delete_Pais(ID), JsonRequestBehavior.AllowGet);
        }

        //--------------------------------------------Pais-------------------------------------------------------------//
        Ciudad_BD bd_c = new Ciudad_BD();

        public ActionResult Ciudad()
        {
            Enlazar_Pais();
            return View();
        }

        //Mostrar
        public JsonResult List_Ciudad()
        {
            return Json(bd_c.Mostrar_Ciudad(), JsonRequestBehavior.AllowGet);
        }

        //Insertar
        public JsonResult Add_Ciudad(Ciudad c)
        {
            return Json(bd_c.Insert_Ciudad(c), JsonRequestBehavior.AllowGet);
        }

        //Mostrar por ID
        public JsonResult MostrarPorID_C(int ID)
        {
            var Ciudad = bd_c.Mostrar_Ciudad().Find(x => x.Ciudad_ID.Equals(ID));
            return Json(Ciudad, JsonRequestBehavior.AllowGet);
        }

        //Actualizar
        public JsonResult Update_Ciudad(Ciudad c)
        {
            return Json(bd_c.Update_Ciudad(c), JsonRequestBehavior.AllowGet);
        }

        //Eliminar
        public JsonResult Delete_Ciudad(int ID)
        {
            return Json(bd_c.Delete_Ciudad(ID), JsonRequestBehavior.AllowGet);
        }

        //Llenar Combo box
        public void Enlazar_Pais()
        {
            DataSet ds = bd_c.Obtener_Pais();
            List<SelectListItem> pais_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                pais_list.Add(new SelectListItem { Text = dr["nombre_pais"].ToString(), Value = dr["id_pais"].ToString() });
            }
            ViewBag.Pais = pais_list;
        }

        //--------------------------------------------Aeropuerto-------------------------------------------------------------//

        Aeropuerto_BD bd_aero = new Aeropuerto_BD();
        public ActionResult Aeropuerto()
        {
            Enlazar_Pais();
            return View();
        }

        //Lamar cbo de ciudad


        public JsonResult Enlazar_Ciudad(string id_pais)
        {
            DataSet ds = bd_aero.Obtener_Ciudad(id_pais);
            List<SelectListItem> ciudad_list = new List<SelectListItem>();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                ciudad_list.Add(new SelectListItem { Text = dr["nombre_ciudad"].ToString(), Value = dr["id_ciudad"].ToString() });
            }
            return Json(ciudad_list, JsonRequestBehavior.AllowGet);
        }


        //Mostrar
        public JsonResult List_Aeropuerto()
        {
            return Json(bd_aero.Mostrar_Aeropuerto(), JsonRequestBehavior.AllowGet);
        }

        //Insertar
        public JsonResult Add_Aeropuerto(Aeropuerto aero)
        {
            return Json(bd_aero.Insert_Aeropuerto(aero), JsonRequestBehavior.AllowGet);
        }

        //Mostrar por ID
        public JsonResult MostrarPorID_AER(int ID)
        {
            var Aeropuerto = bd_aero.Mostrar_Aeropuerto().Find(x => x.Aeropuerto_ID.Equals(ID));
            return Json(Aeropuerto, JsonRequestBehavior.AllowGet);
        }

        //Actualizar
        public JsonResult Update_Aeropuerto(Aeropuerto aero)
        {
            return Json(bd_aero.Update_Aeropuerto(aero), JsonRequestBehavior.AllowGet);
        }

        //Eliminar
        public JsonResult Delete_Aeropuerto(int ID)
        {
            return Json(bd_aero.Delete_Aeropuerto(ID), JsonRequestBehavior.AllowGet);
        }


    }
}