using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GMS.Data.Models
{
    public class Student
    {
        public Guid Id { get; set; }

        [ForeignKey("AppUser")]
        [Required]
        public Guid UserId { get; set; }

        public AppUser AppUser { get; set; }

        public string Instruments { get; set; }

        // Navigation property. Lessons taken by this user
        public List<Lesson> LessonsTaken { get; set; }
    }
}
