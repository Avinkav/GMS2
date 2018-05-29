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

            result.Student = user.Student?.ToViewModel();

            if (user.Teacher != null)
            {
                result.Teacher = new TeacherViewModel()
                {
                    Id = user.Teacher.Id,
                    UserId = user.Id,
                    InstrumentsTaught = user.Teacher.InstrumentsTaught?.Split(','),

                };
            }

            if (roles != null)
                result.Roles = roles;
            else
                result.Roles = new List<string>();

            return result;
        }

        public static StudentViewModel ToViewModel(this Student student)
        {
            return new StudentViewModel()
            {
                Id = student.Id,
                UserId = student.UserId,
                Name = $"{student.AppUser?.FirstName} {student.AppUser?.LastName}",
                Instruments = student.Instruments?.Split(','),
            };
        }


        public static TeacherViewModel ToViewModel(this Teacher teacher)
        {
            var model = new TeacherViewModel()
            {
                Id = teacher.Id,
                UserId = teacher.UserId,
                Name = $"{teacher.AppUser?.FirstName} {teacher.AppUser?.LastName}",
                InstrumentsTaught = teacher.InstrumentsTaught?.Split(','),
                Description = teacher.Description,
                HourlyRate = 50
            };

            if (teacher.AppUser != null)
            {
                model.Name = $"{teacher.AppUser.FirstName} {teacher.AppUser.LastName}";

            }

            return model;
        }

        public static LessonViewModel ToViewModel(this Lesson lesson)
        {
            var model = new LessonViewModel()
            {
                Teacher = lesson.Teacher?.ToViewModel(),
                Student = lesson.Student?.ToViewModel(),
                Id = lesson.Id,
                Cost = lesson.Cost,
                Date = lesson.DateTime.ToString("o"),
                Duration = lesson.Duration
            };

            return model;
        }

    }
}