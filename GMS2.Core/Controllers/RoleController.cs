using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GMS.Data;
using GMS.Data.Models;
using GMS2.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using GMS2.Core.Helpers;
namespace GMS2.Core.Controllers
{

    [Authorize(Roles = "Administrator, Super Administrator")]
    [Route("api/role")]
    public class RoleController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly DataContext _dataContext;


        public RoleController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        DataContext context, RoleManager<IdentityRole<Guid>> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _dataContext = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoles()
        {
            return NoContent();
        }


        [HttpGet("{id}/grant/{role}")]
        public async Task<IActionResult> Grant(string id, string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
                return BadRequest();

            var user = await _dataContext.Users.Where(u => u.Id.ToString() == id)
                                                .Include(u => u.Teacher)
                                                .Include(u => u.Student)
                                                .SingleOrDefaultAsync();

            if (user == null)
                return BadRequest();

            await _userManager.AddToRoleAsync(user, role);

            // if user does not have a student account, create one
            if (role.ToUpperInvariant() == "STUDENT" && user.Student == null)
            {
                user.Student = new Student();
                await _dataContext.SaveChangesAsync();
                return Ok(user.Student.ToViewModel());
            }
            // if user does not have a teacher account, create one
            if (role.ToUpperInvariant() == "TEACHER" && user.Teacher == null)
            {
                user.Teacher = new Teacher();
                await _dataContext.SaveChangesAsync();
                return Ok(user.Teacher.ToViewModel());
            }
            var roles = _userManager.GetRolesAsync(user);
            return Ok(roles);
        }

        [HttpGet("{id}/revoke/{role}")]
        public async Task<IActionResult> Revoke(string id, string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
                return BadRequest();

            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return BadRequest();

            await _userManager.RemoveFromRoleAsync(user, role);
            var roles = _userManager.GetRolesAsync(user);
            return Ok(roles);
        }
    }
}