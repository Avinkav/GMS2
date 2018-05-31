using GMS.Data.Models;
using System;
using System.Collections.Generic;

namespace GMS2.Core.Models
{
    public class TeacherDTO
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Name {get; set;}

        public string Description {get; set;}

        public int HourlyRate {get; set;}
        public string[] InstrumentsTaught { get; set; }

    }

}