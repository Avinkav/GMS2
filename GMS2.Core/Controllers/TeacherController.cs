﻿using System;
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
using Microsoft.AspNetCore.Authorization;

namespace GMS2.Core.Controllers
{
    [Authorize(Roles = "Teacher, Administrator, Super Administrator")]
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

        [HttpGet("list/{count?}")]
        public IActionResult ListTeachers(int count = 10)
        {
            var teachers = _dataContext.Teachers.Include(t => t.AppUser).OrderBy(t => t.Id).Take(count).Select(t => t.ToViewModel());

            return Json(teachers);
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateTeacher([FromBody] TeacherDTO model)
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

        [HttpGet("{id}")]
        public async Task<IActionResult> ReadTeacher(Guid id)
        {
            var teacher = await _dataContext.Teachers.Where(t => t.Id == id)
                                                     .Include(t => t.LessonsTaught)
                                                     .SingleOrDefaultAsync();

            if (teacher == null)
                return NoContent();

            return Json(teacher.ToViewModel());
        }

        [HttpGet("by-user-id/{id}")]
        public async Task<IActionResult> ReadTeacherByUserId(Guid id)
        {
            var teacher = await _dataContext.Teachers.Where(t => t.UserId == id)
                                                     .Include(t => t.LessonsTaught)
                                                     .SingleOrDefaultAsync();

            if (teacher == null)
                return NoContent();

            return Json(teacher.ToViewModel());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(Guid id, [FromBody] TeacherDTO model)
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