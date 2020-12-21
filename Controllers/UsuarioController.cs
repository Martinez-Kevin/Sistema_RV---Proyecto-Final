using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sistema_RV.Models;

namespace Sistema_RV.Controllers
{
    [Authorize(Roles = "Usuario")]
    public class UsuarioController : Controller
    {
        // GET: Usuario
        
        public ActionResult Usuario()
        {
            return View();
        }

        Reserva_BD bd_r = new Reserva_BD();
        public ActionResult Reservas()
        {
            Enlazar_Tip_Vuelo_R();
            Enlazar_Pais_R();
            return View();
        }

        //Onbtener el pais combobox
        public void Enlazar_Pais_R()
        {
            DataSet ds = bd_r.Obtener_Pais_R();
            List<SelectListItem> pais_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                pais_list.Add(new SelectListItem { Text = dr["nombre_pais"].ToString(), Value = dr["id_pais"].ToString() });
            }
            ViewBag.Pais_R = pais_list;
        }

        //Obtener la ciudad
        public JsonResult Enlazar_Ciudad_R(string id_pais)
        {
            DataSet ds = bd_r.Obtener_Ciudad_R(id_pais);
            List<SelectListItem> ciudad_list = new List<SelectListItem>();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                ciudad_list.Add(new SelectListItem { Text = dr["nombre_ciudad"].ToString(), Value = dr["id_ciudad"].ToString() });
            }
            return Json(ciudad_list, JsonRequestBehavior.AllowGet);
        }

        //Obtener el tipo de vuelo en combobox
        public void Enlazar_Tip_Vuelo_R()
        {
            DataSet ds = bd_r.Obtener_Tip_Vuelo();
            List<SelectListItem> t_vuelo_list = new List<SelectListItem>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                t_vuelo_list.Add(new SelectListItem { Text = dr["tipo_vuelo"].ToString(), Value = dr["id_tip_vuelo"].ToString() });
            }
            ViewBag.TipoV_R = t_vuelo_list;
        }

        //Lista por filtro
        public JsonResult List_Vuelos_B(Reserva r)
        {
            return Json(bd_r.Mostrar_Vuelos_R(r), JsonRequestBehavior.AllowGet);
        }

        //Mostrar por ID
        public JsonResult MostrarPorID_V_R(int ID)
        {
            var Vuelos = bd_r.Mostrar_Vuelos_R_T().Find(x => x.ID_Vuelo.Equals(ID));
            return Json(Vuelos, JsonRequestBehavior.AllowGet);
        }

        //Insertar reserva
        public JsonResult Add_Reserva_V(Reserva r)
        {
            return Json(bd_r.Insert_Reserva(r), JsonRequestBehavior.AllowGet);
        }

        //Mis reservas 
        public ActionResult Mis_Reservas()
        {
            return View();
        }


        public JsonResult List_Reservas()
        {
            return Json(bd_r.Mostrar_Reservas(), JsonRequestBehavior.AllowGet);
        }


    }
}