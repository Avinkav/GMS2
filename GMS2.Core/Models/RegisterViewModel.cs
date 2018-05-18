using System;
using System.ComponentModel.DataAnnotations;

namespace GMS.ASPNet.Core.Models
{
    public class RegisterViewModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string AddressLine1 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public int PostCode { get; set; }

        public string Password { get; set; }


    }
}
