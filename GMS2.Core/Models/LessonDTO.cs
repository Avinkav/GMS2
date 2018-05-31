using System;
using GMS.Data.Models;
using GMS2.Core.Models;

namespace GMS2.Core.Models
{
    public class LessonViewModel
    {
        public Guid Id { get; set; }
        public string Date { get; set; }

        public int Duration {get; set; }
        public int Cost { get; set; }
        //public Guid InstrumentId { get;  set; }
        public string LessonType { get;  set; }
        public TeacherDTO Teacher { get;  set; }
        public StudentDTO Student { get;  set; }
        public LessonStatus Status { get; internal set; }
    }
}