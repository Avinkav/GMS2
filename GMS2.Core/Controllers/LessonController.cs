using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GMS.Data;
using GMS.Data.Models;
using GMS2.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace GMS2.Core.Controllers
{
    [Route("api/lessons")]
    public class LessonController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly DataContext _dataContext;

        public LessonController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, DataContext dataContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dataContext = dataContext;
        }


        /// <summary>
        /// Creates a new booking for a teacher based on data recieved in viewmodel
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Returns confirmed booking on success</returns>
        [HttpPost("")]
        public async Task<IActionResult> CreateLesson([FromBody] LessonViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            // Validation to make sure teacher is avaialbable

            //
            var lesson = new Lesson()
            {
                StartDateTime = model.DateTime,
                Status = LessonStatus.Booked,
                Cost = model.Cost,
                LessonType = model.LessonType,
                StudentId = model.Student.Id,
                TeacherId = model.Teacher.Id
            };

            _dataContext.Lessons.Add(lesson);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        /// <summary>
        /// Get lessons of the user with given id
        /// 
        /// </summary>
        /// <param name="id">id of the user</param>
        /// <returns>List of lessons</returns>
        [HttpGet("{id}")]
        public IActionResult ReadLessons(Guid id)
        {
            var lessons = _dataContext.Lessons.Where(l => l.StudentId == id);

            return Json(lessons);
        }


        /// <summary>
        /// Get lessons of the user with given id
        /// 
        /// </summary>
        /// <param name="id">id of the user</param>
        /// <returns>Status</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLesson(Guid id, [FromBody] LessonViewModel model)
        {
            if (!ModelState.IsValid || id != model.Id)
                return BadRequest();

            var lesson = await _dataContext.Lessons.FindAsync(model.Id);

            if (lesson == null)
                return NotFound();

            // Update values, all other properties are immutable after creation
            lesson.StartDateTime = model.DateTime;
            lesson.Cost = model.Cost;
            lesson.Status = model.Status;

            await _dataContext.SaveChangesAsync();

            return Ok();
        }



        /// <summary>
        /// Delete a confirmed booking
        /// </summary>
        /// <returns>Ok or error code</returns>
        [HttpDelete("")]
        public async Task<IActionResult> DeleteLesson([FromBody] Guid id)
        {
            var lesson = await _dataContext.Lessons.FindAsync(id);

            if (lesson == null)
                return NotFound();

            return new BadRequestObjectResult(null);
        }






    }
}