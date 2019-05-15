using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Models
{
    public class UsersViewModel
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [MaxLength(50)]
        public string SurnameName { get; set; }
        [Required]
        [MaxLength(6)]
        public string Alias { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        [MaxLength(30)]
        public string Password { get; set; }
        [Required]
        [MaxLength(10)]
        public string Dni { get; set; }
        public int Telephone { get; set; }
        [Required]
        [MaxLength(50)]
        public string Mail { get; set; }

        public int TypeAccessId { get; set; }
        [ForeignKey("TypeAccessId")]
        public virtual UserTypeAccessViewModel TypeAccess { get; set; }
    }
}
