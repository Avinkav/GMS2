using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GMS.Data.Models
{
    public class Student
    {
        public Guid Id { get; set; }

        [ForeignKey("AppUser")]
        public Guid UserId { get; set; }

        public AppUser AppUser { get; set; }

        public List<LessonType> Instruments { get; set; }

        // Navigation property. Lessons taken by this user
        public List<Lesson> LessonsTaken { get; set; }
    }
}
