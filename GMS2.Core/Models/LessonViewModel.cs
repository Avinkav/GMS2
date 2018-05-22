using System;
using GMS.Data.Models;

namespace GMS2.Core.Controllers
{
    public class LessonViewModel
    {
        public Guid Id { get; set; }
        public DateTime DateTime { get; set; }
        public int Cost { get; set; }
        public Guid InstrumentId { get;  set; }
        public string LessonType { get;  set; }
        public Guid TaughtById { get;  set; }
        public Guid TaughtToId { get;  set; }
        public LessonStatus Status { get; internal set; }
    }
}