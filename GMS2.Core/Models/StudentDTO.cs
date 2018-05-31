using GMS.Data.Models;
using System;
using System.Collections.Generic;

namespace GMS2.Core.Models
{
    public class StudentDTO
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public AppUser AppUser { get; set; }

        public string[] Instruments { get; set; }

        public List<Lesson> LessonsTaken { get; set; }
        public string Name { get; set; }
    }
}