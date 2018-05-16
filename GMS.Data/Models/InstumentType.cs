using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GMS.Data.Models
{
    public class InstumentType
    {
        public string Type { get; set; }

        public Guid UserId { get; set; }

        public AppUser User { get; set; }

        public override string ToString()
        {
            return Type;
        }
    }
}