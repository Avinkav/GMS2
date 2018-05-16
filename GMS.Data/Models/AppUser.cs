using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace GMS.Data.Models
{
    /// <inheritdoc />
    /// <summary>
    /// Application implementation of the IdentityUser class provided by the
    /// ASP Net Identity framework for user authentication. Type Guid set as primary key
    /// </summary>
    public class AppUser : IdentityUser<Guid>
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public List<InstumentType> Instruments { get; set; }

        // Navigation property. Lessons taken by this user
        [InverseProperty("TaughtTo")]
        public List<Lesson> LessonsTaken { get; set; }

        // Navigation property. Lessons taught by this user
        [InverseProperty("TaughtBy")]
        public List<Lesson> LessonsTaught { get; set; }

        // Navigation property. Times the user is available of lessons
        public List<Availability> Availabilities { get; set; }

    }
}
