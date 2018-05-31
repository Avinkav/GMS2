using System;

namespace GMS2.Core.Controllers
{
    public class AvailabilityDTO
    {
        public Guid UserId { get; set; }

        public Guid Id { get; set; }

        public DateTime StartTime { get;  set; }
        public DateTime EndTime { get;  set; }


    }
}