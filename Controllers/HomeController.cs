using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sistema_RV.Models;

namespace Sistema_RV.Controllers
{
    public class HomeController : Controller
    {
        Sistema_RVEntities Db = new Sistema_RVEntities();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Registrar()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Registrar(Usuario userdet)
        {
            if (ModelState.IsValid)
            {
                Login log = new Login();
                log.Username = userdet.Username;
                log.Password = userdet.Password;
                log.RolID = 2;
                log.Fec_Creacion = DateTime.Today.Date;
                Db.Logins.Add(log);
                Db.SaveChanges();

                userdet.LoginID = Db.Logins.Max(a => a.LoginID);
                Db.Usuarios.Add(userdet);
                Db.SaveChanges();

                return RedirectToAction("../Login/Login");
            }
            return View();
        }

        public JsonResult UsuarioUnico(string Username)
        {
            return Json(!Db.Logins.Any(x => x.Username == Username), JsonRequestBehavior.AllowGet);
        }
    }
}