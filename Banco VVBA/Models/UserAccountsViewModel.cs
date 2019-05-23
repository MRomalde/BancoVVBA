using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Models
{
    public class UserAccountsViewModel
    {
        [Key]
        public int AccountId { get; set; }
        [Required]
        public double Balance { get; set; }
        [Required]
        public string IBAN { get; set; }

        public int UserId { get; set;}
        [ForeignKey("UserId")]
        public virtual UsersViewModel User { get; set; }

        public UserAccountsViewModel() { }
    }
}
