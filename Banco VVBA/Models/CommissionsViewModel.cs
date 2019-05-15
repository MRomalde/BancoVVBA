using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Models
{
    public class CommissionsViewModel
    {
        [Key]
        public int CommissionId { get; set;}
        [Required]
        public string Description { get; set; }
        [Required]
        public double Price { get; set; }

    }
}
