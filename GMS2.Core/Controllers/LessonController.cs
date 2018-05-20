using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GMS2.Core.Controllers
{
    [Route("api/lessons")]
    public class LessonController : Controller
    {
        /// <summary>
        /// Creates a new booking for a teacher based on data recieved in viewmodel
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Returns confirmed booking on success</returns>
        [HttpPost("book")]
        public JsonResult Book([FromBody] BookViewModel model)
        {
            return Json(null);
        }

        /// <summary>
        /// Get lessons of the student with given id
        /// 
        /// </summary>
        /// <param name="id">id of the student</param>
        /// <returns>List of lessons</returns>
        [HttpGet("")]
        public JsonResult Lessons(string id)
        {
            return Json(null);
        }

        /// <summary>
        /// Get available time slots of the teacher
        /// 
        /// </summary>
        /// <param name="id">id of the teacher</param>
        /// <returns>Returns confirmed booking on success</returns>
        [HttpGet("availability")]
        public JsonResult Availability(string id)
        {
            return Json(null);
        }


        /// <summary>
        /// Create an avaialability for a teacher using the given model
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Returns created availability with status OK</returns>
        [HttpPost("availability")]
        public JsonResult Availability([FromBody] AvailabilityViewModel model)
        {
            return Json(null);
        }

        /// <summary>
        /// Delete a confirmed booking
        /// </summary>
        /// <returns>Ok or error code</returns>
        [HttpDelete("")]
        public IActionResult Lesson()
        {
            return new BadRequestObjectResult(null);
        }







    }
}