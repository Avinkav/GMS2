using System;
using GMS2.Core.Models;
using GMS.Data;
using GMS.Data.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace GMS2.Core.Helpers
{
    public static class Helpers
    {
        public static UserViewModel MaptoViewModel(this AppUser user, IList<string> roles = null)
        {
            var result = new UserViewModel()
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

            if (user.Student != null)
            {
                result.Student = new StudentViewModel()
                {
                    Id = user.Student.Id,
                    UserId = user.Id,
                    Instruments = user.Student.Instruments?.Split(','),

                };
            }

            if (user.Teacher != null)
            {
                result.Teacher = new TeacherViewModel()
                {
                    Id = user.Student.Id,
                    UserId = user.Id,
                    InstrumentsTaught = user.Student.Instruments?.Split(','),

                };
            }

            if (roles != null)
                result.Roles = roles;
            else
                result.Roles = new List<string>();

            return result;
        }

        public static TeacherViewModel ToViewModel(this Teacher teacher){
           var model = new TeacherViewModel()
            {
                Id = teacher.Id,
                UserId = teacher.UserId,
                InstrumentsTaught = teacher.InstrumentsTaught?.Split(','),
                HourlyRate = 50
            };

            if (teacher.AppUser != null){
                model.Name = $"{teacher.AppUser.FirstName} {teacher.AppUser.LastName}";
                
            }

            return model;
        }

    }
}