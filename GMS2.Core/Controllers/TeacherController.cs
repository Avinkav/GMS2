using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GMS2.Core.Controllers
{
    [Route("api/teachers")]
    public class TeacherController : Controller
    {
        /// <summary>
        /// Returns a list of teachers
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public IActionResult ListTeachers()
        {
            return Json(null);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("")]
        public IActionResult CreateTeacher([FromBody] TeacherViewModel model)
        {
            return Json(null);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("")]
        public IActionResult ReadTeacher(string id)
        {
            return Json(null);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("")]
        public IActionResult UpdateTeacher([FromBody] TeacherViewModel model)
        {
            return Json(null);
        }

        /// <summary>
        /// Delete a teacher
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("")]
        public IActionResult DeleteTeacher(string id)
        {
            return BadRequest();
        }


    }
}