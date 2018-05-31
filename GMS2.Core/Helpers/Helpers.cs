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
        public static UserDTO ToViewModel(this AppUser user, IList<string> roles = null)
        {
            var result = new UserDTO()
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                dob = user.Dob.ToString("o"),
                AddressLine1 = user.AddressLine1,
                State = user.State,
                City = user.City,
                PostCode = user.PostCode,
                PhoneNumber = user.PhoneNumber,
            };

            result.Student = user.Student?.ToViewModel();
            result.Teacher = user.Teacher?.ToViewModel();
            result.Roles = roles;

            return result;
        }

        public static StudentDTO ToViewModel(this Student student)
        {
            return new StudentDTO()
            {
                Id = student.Id,
                UserId = student.UserId,
                Name = $"{student.AppUser?.FirstName} {student.AppUser?.LastName}",
                Instruments = (student.Instruments?.Trim() == "") ? null : student.Instruments?.Trim().Split(','),
            };
        }

        public static TeacherDTO ToViewModel(this Teacher teacher)
        {
            return new TeacherDTO()
            {
                Id = teacher.Id,
                UserId = teacher.UserId,
                Name = $"{teacher.AppUser?.FirstName} {teacher.AppUser?.LastName}",
                InstrumentsTaught = (teacher.InstrumentsTaught?.Trim() == "") ? null : teacher.InstrumentsTaught?.Trim().Split(','),
                Description = teacher.Description,
                HourlyRate = 50
            };
        }

        public static LessonViewModel ToViewModel(this Lesson lesson)
        {
            return new LessonViewModel()
            {
                Teacher = lesson.Teacher?.ToViewModel(),
                Student = lesson.Student?.ToViewModel(),
                Id = lesson.Id,
                Cost = lesson.Cost,
                Date = lesson.DateTime.ToString("o"),
                Duration = lesson.Duration
            };
        }

    }
}