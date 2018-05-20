using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GMS2.Core.Controllers
{
    [Route("api/instruments")]
    public class InstrumentController : Controller
    {
        [HttpGet("list")]
        public IActionResult ListInstruments()
        {
            return Json(null);
        }

        [HttpPost("")]
        public IActionResult CreateInstrument()
        {
            return Json(null);
        }

        [HttpGet("")]
        public IActionResult ReadInstrument()
        {
            return Json(null);
        }

        [HttpPut("")]
        public IActionResult UpdateInstrument()
        {
            return Json(null);
        }

        [HttpDelete("")]
        public IActionResult DeleteInstrument()
        {
            return Json(null);
        }
    }
}