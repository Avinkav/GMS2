using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GMS.Data.Models
{
    public class Teacher
    {
        public Guid Id { get; set; }

        [ForeignKey("AppUser")]
        public Guid UserId {get; set;}

        public AppUser AppUser { get; set; }

        public List<LessonType> InstrumentsTaught { get; set; }

        // Navigation property. Lessons taught by this user
        public List<Lesson> LessonsTaught { get; set; }

        // Navigation property. Times the user is available of lessons
        public List<Availability> Availabilities { get; set; }
    }
}
