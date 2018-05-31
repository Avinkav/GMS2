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
    [Route("api/teacher")]
    public class TeacherController : Controller
    {
        private readonly DataContext _dataContext;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        public TeacherController(DataContext dataContext, UserManager<AppUser> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            _dataContext = dataContext;
            _roleManager = roleManager;
            _userManager = userManager;

        }

        /// <summary>
        /// Returns a list of teachers
        /// </summary>
        /// <returns></returns>
        [HttpGet("list/{count?}")]
        public IActionResult ListTeachers(int count = 10)
        {
            var teachers = _dataContext.Teachers.Include(t => t.AppUser).OrderBy(t => t.Id).Take(count).Select(t => t.ToViewModel());

            return Json(teachers);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> CreateTeacher([FromBody] TeacherViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var teacher = new Teacher()
            {
                UserId = model.UserId,
                InstrumentsTaught = (model.InstrumentsTaught == null) ? null : String.Join(",", model.InstrumentsTaught),
                Description = model.Description
            };

            _dataContext.Teachers.Add(teacher);

            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

            return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> ReadTeacher(Guid id)
        {
            var teacher = await _dataContext.Teachers.FindAsync(id);

            if (teacher == null)
                return NoContent();

            return Json(teacher.ToViewModel());
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(Guid id, [FromBody] TeacherViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != model.Id)
                return BadRequest();

            var teacher = await _dataContext.Teachers.FindAsync(id);

            if (teacher == null)
                return NoContent();

            teacher.InstrumentsTaught = String.Join(",", model.InstrumentsTaught);
            teacher.Description = model.Description;

            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        /// <summary>
        /// Delete a teacher
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("")]
        public async Task<IActionResult> DeleteTeacher(string id)
        {
            var teacher = await _dataContext.Teachers.FindAsync(id);
            _dataContext.Teachers.Remove(teacher);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}