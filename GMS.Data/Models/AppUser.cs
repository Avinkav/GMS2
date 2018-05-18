using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace GMS.Data.Models
{
    /// <inheritdoc />
    /// <summary>
    /// Application implementation of the IdentityUser class provided by the
    /// ASP Net Identity framework for user authentication. Type Guid set as primary key
    /// </summary>
    public class AppUser : IdentityUser<Guid>
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string AddressLine1 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public int PostCode { get; set; }
        
        public DateTime Dob {get; set;}

    }
}
