using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GMS2.Core.Controllers
{
    [Route("api/students")]
    public class StudentController : Controller
    {
        [HttpGet("list")]
        public IActionResult ListStudents()
        {
            return Json(null) ;
        }

 
        [HttpPost("")]
        public IActionResult CreateStudent([FromBody] StudentViewModel model)
        {
            return Json(null);
        }

        [HttpGet("")]
        public IActionResult ReadStudent(string id)
        {
            return Json(null);
        }

        [HttpPut("")]
        public IActionResult UpdateStudent([FromBody] StudentViewModel model)
        {
            return Json(null);
        }

        [HttpDelete("")]
        public IActionResult DeleteStudent([FromBody] StudentViewModel model)
        {
            return Json(null);
        }




    }
}