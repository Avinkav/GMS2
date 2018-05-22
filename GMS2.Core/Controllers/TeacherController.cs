using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GMS.Data;
using GMS.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GMS2.Core.Controllers
{
    [Route("api/teachers")]
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
        [HttpGet("")]
        public IActionResult ListTeachers()
        {
            _dataContext.Teachers.Take(10).ToList();
            return Json(_dataContext.Teachers.Take(10));
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

            var teacher = MapTeacher(model);
            var user = await _userManager.FindByIdAsync(model.UserId.ToString());
            _dataContext.Teachers.Add(teacher);
            
            try
            {
                await _dataContext.SaveChangesAsync();
                await _userManager.AddToRoleAsync(user, "Teacher");
            }
            catch (Exception e)
            {
                return new JsonResult(e)
                {
                    StatusCode = 500
                };
            }
            
            return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{userId}")]
        public async Task<IActionResult> ReadTeacher(string userId)
        {
            var user = await _dataContext.Teachers.Include(u => u.AppUser).FirstAsync(u => u.AppUser.Id == new Guid(userId));
            return Json(user);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("")]
        public async Task<IActionResult> UpdateTeacher([FromBody] TeacherViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var teacher = await _dataContext.Teachers.FindAsync(model.Id);

            await TryUpdateModelAsync(teacher);
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

        private Teacher MapTeacher(TeacherViewModel model)
        {
            return new Teacher()
            {
                UserId = new Guid(model.UserId)
            };
        }

    }
}