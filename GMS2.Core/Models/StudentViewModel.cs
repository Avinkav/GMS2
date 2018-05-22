﻿using GMS.Data.Models;
using System;
using System.Collections.Generic;

namespace GMS2.Core.Controllers
{
    public class StudentViewModel
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public AppUser AppUser { get; set; }

        public string[] Instruments { get; set; }

        public List<Lesson> LessonsTaken { get; set; }
    }
}