using System;
using GMS2.Core.Models;
using GMS.Data;
using GMS.Data.Models;

namespace GMS2.Core.Helpers
{
    public static class Helpers
    {
        public static UserViewModel MaptoViewModel(this AppUser user)
        {
            return new UserViewModel()
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                dob = user.Dob.ToShortDateString(),
                AddressLine1 = user.AddressLine1,
                State = user.State,
                City = user.City,
                PostCode = user.PostCode,
                PhoneNumber = user.PhoneNumber,
            };
        }


    }
}