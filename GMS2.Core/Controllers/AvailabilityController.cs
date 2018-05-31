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
    [Route("api/availability")]
    public class AvailabilityController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly DataContext _dataContext;

        public AvailabilityController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, DataContext dataContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dataContext = dataContext;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> ListAvailability(Guid id)
        {
            var lessons = await _dataContext.Lessons.Where(l => l.StudentId == id).ToListAsync();

            if (lessons == null)
                return NoContent();

            return Json(lessons);
        }

        /// <summary>
        /// Create an avaialability for a teacher using the given model
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Returns created availability with status OK</returns>
        [HttpPost("")]
        public async Task<IActionResult> CreateAvailability([FromBody] AvailabilityDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var availability = new Availability()
            {
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                UserId = model.UserId
            };

            _dataContext.Availabilities.Add(availability);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        // TODO : Decide whether this method is needed. What's the point of reading just one
        /// <summary>
        /// Get available time slots of the teacher
        /// 
        /// </summary>
        /// <param name="id">id of the teacher</param>
        /// <returns>Returns confirmed booking on success</returns>
        [HttpGet("")]
        public IActionResult ReadAvailability(string id)
        {
            return NotFound();

            //return Json(null);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAvailability(Guid id, [FromBody] AvailabilityDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var availability = _dataContext.Availabilities.FindAsync(model.Id);


            await TryUpdateModelAsync(availability);

            await _dataContext.SaveChangesAsync();
                
            return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("")]
        public async Task<IActionResult> DeleteAvailability(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var availability = await _dataContext.Availabilities.FindAsync(id);

            _dataContext.Availabilities.Remove(availability);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

    }
}