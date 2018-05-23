using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using GMS.Data;
using GMS.Data.Models;
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

            var students = await _dataContext.Students.Take(count).ToListAsync();

            if (students?.Any() == false)
                return NoContent();

            // Send headers describing the sequence of selected records
            Request.HttpContext.Response.Headers.Add("From", "0");
            Request.HttpContext.Response.Headers.Add("To", $"{count}");
            Request.HttpContext.Response.Headers.Add("Count", $"{count}");

            return new JsonResult(students) {
                StatusCode = (int) HttpStatusCode.OK
            };
        }

        [HttpGet("list/{from}/{to}")]
        public async Task<IActionResult> ListStudentRange(int from, int to)
        {
            // Validate range
            if (from < 1 || to <= from)
                return BadRequest("are u sirius m8?");

            var students = await _dataContext.Students.Skip(from).Take(to - from).ToListAsync();

            if (students?.Any() == false)
                return NoContent();

            // Send headers describing the sequence of selected records
            Request.HttpContext.Response.Headers.Add("From", $"{from}");
            Request.HttpContext.Response.Headers.Add("To", $"{to}");
            Request.HttpContext.Response.Headers.Add("Count", $"{to - from}");

            return new JsonResult(students)
            {
                StatusCode = (int)HttpStatusCode.OK
            };
        }


        [HttpPost("")]
        public async Task<IActionResult> CreateStudent([FromBody] StudentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (model.Instruments == null)
                model.Instruments = new string[] { };

            var student = new Student()
            {
                UserId = model.UserId,
                Instruments = string.Join(",", model.Instruments )
            };

            _dataContext.Students.Add(student);

            try{
             await _dataContext.SaveChangesAsync();
            } catch (DbUpdateException ex){
                return BadRequest("Request failed, make sure the UserId is valid and a student doesn't already exist");
            } catch (Exception e){
                Request.HttpContext.Response.StatusCode = 500;
                return Json(e);
            }
            
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ReadStudent(Guid id)
        {
            var student = await _dataContext.Students.Include(s => s.LessonsTaken).FirstOrDefaultAsync(s => s.UserId == id);
            if (student == null)
                return NoContent();

            var model = new StudentViewModel()
            {
                Id = student.Id,
                UserId = student.UserId,
                Instruments = student.Instruments.Split(','),
                
            };
            return Json(model);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(Guid id, [FromBody] StudentViewModel model)
        {
            if (!ModelState.IsValid || id != model.Id  )
                return BadRequest();

            var student = await _dataContext.Students.FirstAsync(s => s.UserId == id);

            student.Instruments = String.Join(',', model.Instruments);

            _dataContext.Students.Update(student);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(Guid id)
        {
            var student = await _dataContext.Students.FindAsync(id);

            if (student == null)
                return BadRequest();

            _dataContext.Students.Remove(student);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }




    }
}