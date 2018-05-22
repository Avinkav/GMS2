﻿using System;
using System.ComponentModel.DataAnnotations;

namespace GMS.Data.Models
{
    /// <summary>
    /// Models a lesson. A lesson is conducted between a teacher and a student on a specific
    /// date for a certain duration
    /// </summary>
    public class Lesson
    {
        
        public Guid Id { get; set; }

        public Guid TaughtById { get; set; }

        [Required]
        public Teacher TaughtBy { get; set; }

        public Guid TaughtToId { get; set; }

        [Required]
        public Student TaughtTo { get; set; }

        [Required]
        public DateTime StartDateTime { get; set; }

        public Guid InstrumentID { get; set; }

        public Instrument Instrument { get; set; }

        private int Duration { get; set; }

        public string LessonType { get; set; }

        public int Cost { get; set; }

        public LessonStatus Status { get; set; }
    }

    public enum LessonStatus { Booked, Complete, Cancelled, Missed, Postponed };
}
