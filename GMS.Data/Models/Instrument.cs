using System;
using System.ComponentModel.DataAnnotations;

namespace GMS.Data.Models
{
    /// <summary>
    /// An Instrument to be hired
    /// </summary>
    public class Instrument
    {
        [Key] public Guid InstrumentID { get; set; }

        public string Type { get; set; }

        public string HireCost { get; set; }

        public string Description { get; set; } = "Dat badass violin";

    }
}
