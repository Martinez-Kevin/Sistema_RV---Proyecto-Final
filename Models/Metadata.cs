using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Sistema_RV.Models
{
    [MetadataType(typeof(Usuariometada))]
    public partial class Usuario
    {
        [Required(ErrorMessage = "Campos obligatorios", AllowEmptyStrings = false)]
        [System.Web.Mvc.Remote("UsuarioUnico", "Home", ErrorMessage = "Usuario ya registrado")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Campos obligatorios", AllowEmptyStrings = false)]
        [DataType(System.ComponentModel.DataAnnotations.DataType.Password)]
        public string Password { get; set; }
        [DataType(System.ComponentModel.DataAnnotations.DataType.Password)]
        [Compare("Password", ErrorMessage = "Las contraseñas no coinciden")]
        [Display(Name = "Verificar contraseña")]
        public string RPassword { get; set; }
    }

    public partial class Usuariometada
    {
        [Required(ErrorMessage = "Campos obligatorios", AllowEmptyStrings = false)]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "Campos obligatorios", AllowEmptyStrings = false)]
        public string Genero { get; set; }
        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Campos obligatorios", AllowEmptyStrings = false)]
        public System.DateTime Fec_Nac { get; set; }
        [Required(ErrorMessage = "Campos obligatorios", AllowEmptyStrings = false)]
        public string Direccion { get; set; }
        [Required(ErrorMessage = "Campos obligatorios", AllowEmptyStrings = false)]
        public string Tel { get; set; }
        [EmailAddress(ErrorMessage = "Correo electronico invalido")]
        [Required(ErrorMessage = "Campos obligatorios", AllowEmptyStrings = false)]
        public string Email { get; set; }
    }
    [MetadataType(typeof(LoginMetadata))]
    public partial class Login
    {

    }
    public partial class LoginMetadata
    {
        public string Username { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}