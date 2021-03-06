using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using GMS.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace GMS2.Core.Models
{
    public class UserDTO
    {
        public UserDTO()
        {
        }

        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string AddressLine1 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public int PostCode { get; set; }

        public string dob { get; set; }

        public StudentDTO Student {get;set;}

        public TeacherDTO Teacher {get;set;}

        public IList<string> Roles {get; set;}

    }
}
