using GMS.Data.Models;
using System;
using System.Collections.Generic;

namespace GMS2.Core.Controllers
{
    public class TeacherViewModel
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public List<LessonType> InstrumentsTaught { get; set; }

    }

}