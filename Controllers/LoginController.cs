using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Sistema_RV.Models;

namespace Sistema_RV.Controllers
{
    public class LoginController : Controller
    {
        // GET: 
        Sistema_RVEntities Db = new Sistema_RVEntities();
        public ActionResult Login()
        {
            return View();
            #pragma warning disable CS0162 
            ViewBag.Message = "";
            #pragma warning restore CS0162 
        }

        [HttpPost]
        public ActionResult Login(Login log)
        {
            var result = Db.Logins.Where(a => a.Username == log.Username && a.Password == log.Password).ToList();
            if (result.Count() > 0)
            {
                Session["LoginID"] = result[0].LoginID;
                Session["Username"] = result[0].Username;

                FormsAuthentication.SetAuthCookie(result[0].Username, false);
                if (result[0].RolID==1)
                {
                    return RedirectToAction("../Admin/Admin");
                } 
                else if (result[0].RolID==2)
                {
                    return RedirectToAction("../Usuario/Usuario");
                }

            }
            else
            {
                ViewBag.Message = "Usuario o contraseña incorrecta";
                
            }
            return View(log);
        }

        public ActionResult Logout()
        {
            Session["LoginID"] = 0;
            Session["Username"] = 0;
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }
    }
}