using System;
using GMS.Data.Models;
using GMS2.Core.Models;

namespace GMS2.Core.Models
{
    public class LessonViewModel
    {
        public Guid Id { get; set; }
        public DateTime DateTime { get; set; }
        public int Cost { get; set; }
        //public Guid InstrumentId { get;  set; }
        public string LessonType { get;  set; }
        public TeacherViewModel Teacher { get;  set; }
        public StudentViewModel Student { get;  set; }
        public LessonStatus Status { get; internal set; }
    }
}