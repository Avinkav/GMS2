using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using GMS.Data;
using GMS.Data.Models;
using GMS2.Core.Helpers;
using GMS2.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GMS2.Core.Controllers
{
    [Route("api/student")]
    [Authorize]
    public class StudentController : Controller
    {

        private readonly DataContext _dataContext;

        public StudentController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("list/{count}")]
        public async Task<IActionResult> ListStudents(int count = 10)
        {
            if (count > 100)
                count = 100;
            else if (count < 0)
                BadRequest("Cannot select a negative number of elements you monkey");

            var students = await _dataContext.Students.OrderBy(s => s.Id).Take(count).ToListAsync();

            if (students?.Any() == false)
                return NoContent();

            // Send headers describing the sequence of selected records
            Request.HttpContext.Response.Headers.Add("Count", $"{count}");

            return Json(students.Select(s => s.ToViewModel()));
        }

        [HttpGet("list/{from}/{to}")]
        public async Task<IActionResult> ListStudentRange(int from, int to)
        {
            // Validate range
            if (from < 1 || to <= from)
                return BadRequest("are u sirius m8?");

            var students = await _dataContext.Students.OrderBy(s => s.Id).Skip(from).Take(to - from).ToListAsync();

            if (students?.Any() == false)
                return NoContent();

            // Send headers describing the sequence of selected records
            var headers = Request.HttpContext.Response.Headers;
            headers.Add("From", $"{from}");
            headers.Add("To", $"{to}");
            headers.Add("Count", $"{to - from}");

            var models = students.Select(s => s.ToViewModel());
            return Json(models);
        }


        [HttpPost("")]
        public async Task<IActionResult> CreateStudent([FromBody] StudentDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var student = new Student()
            {
                UserId = model.UserId,
                Instruments = (model.Instruments == null) ? null : string.Join(",", model.Instruments)
            };

            _dataContext.Students.Add(student);

            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new
                {
                    message = "Database failed to update, make sure the User Id is valid and a student doesn't already exist",
                    exception = ex
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ReadStudent(Guid id)
        {
            var student = await _dataContext.Students.Where(s => s.Id == id)
                                                        .Include(s => s.LessonsTaken)
                                                        .SingleOrDefaultAsync();
            if (student == null)
                return NoContent();

            var model = student.ToViewModel();

            return Json(model);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(Guid id, [FromBody] StudentDTO model)
        {
            if (!ModelState.IsValid || id != model.Id)
                return BadRequest();

            var student = await _dataContext.Students.FindAsync(id);

            if (student == null)
                return BadRequest();

            student.Instruments = String.Join(',', model.Instruments);
            try
            {
                _dataContext.Students.Update(student);
                await _dataContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(Guid id)
        {
            var student = await _dataContext.Students.FindAsync(id);

            if (student == null)
                return BadRequest();

            try
            {
                _dataContext.Students.Remove(student);
                await _dataContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

            return Ok();
        }
    }
}