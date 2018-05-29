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
using GMS2.Core.Helpers;

namespace GMS2.Core.Controllers
{
    [Route("api/lesson")]
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
                DateTime = DateTime.Parse(model.Date),
                Status = LessonStatus.Booked,
                Cost = model.Cost,
                Duration = model.Duration,
                LessonType = model.LessonType,
                StudentId = model.Student.Id,
                TeacherId = model.Teacher.Id
            };

            _dataContext.Lessons.Add(lesson);

            try{
                await _dataContext.SaveChangesAsync();
            }catch(Exception e){
                return new BadRequestObjectResult(e);
            }

            return Ok();
        }

        /// <summary>
        /// Get lessons of the user with given id
        /// 
        /// </summary>
        /// <param name="id">id of the user</param>
        /// <returns>List of lessons</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> ReadLessons(Guid id)
        {
            var lessons = _dataContext.Lessons.Include(l => l.Student).ThenInclude(l => l.AppUser)
                                            .Include(l => l.Teacher).ThenInclude(l => l.AppUser)
                                            .Where(l => l.StudentId == id).Select(l =>  l.ToViewModel());

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
            lesson.DateTime = DateTime.Parse(model.Date);
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