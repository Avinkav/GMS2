using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GMS.Data.Models
{
    /// <summary>
    /// The time slot a teacher is available to teach
    /// </summary>
    public class Availability
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public AppUser User { get; set; }

        public long DurationTicks { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}
