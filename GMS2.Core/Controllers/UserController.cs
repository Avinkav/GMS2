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

    /// <summary>
    /// AccountController handles all actions performed on users exluding session management such as login, logout
    /// All GMS related actions such as assigning student/teacher/admin priviledges are handled here
    /// </summary>
    [Authorize]
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly DataContext _dataContext;

        /// <summary>
        /// Constructor uses Dependency Injection to retrieve services registerd previously in Startup.cs
        /// </summary>
        /// <param name="userManager">ASP Net Identity UserManager instance</param>
        /// <param name="signInManager">ASP Net Identity SignInManager instance</param>
        /// <param name="context">Entity Framework inherited GMS.Data.DataContext instance</param>
        /// <param name="roleManager">ASP Net Identity RoleManager instance</param>
        /// <param name="logger">Framework provided logger for logging</param>
        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
                                 DataContext context, RoleManager<IdentityRole<Guid>> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _dataContext = context;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListUser()
        {
            var userVms = (await _dataContext.Users.ToListAsync())
                                    .Select(user => user.ToViewModel());

            return Json(userVms);
        }

        // Found in AccountController TODO: Code or remove?
        [HttpPost("")]
        public IActionResult CreateUser([FromBody] UserDTO model)
        {
            return BadRequest();
            throw new NotImplementedException();
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> ReadUser(string id)
        {
            if (id == null)
                return BadRequest();

            var user = await _dataContext.Users.Where(u => u.Id == new Guid(id))
                                         .Include(u => u.Teacher)
                                         .Include(u => u.Student)
                                         .SingleOrDefaultAsync();

            var roles = await _userManager.GetRolesAsync(user);

            var vm = user.ToViewModel(roles);

            return Json(vm);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UserDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
                return NotFound();

            UpdateModel(user, model);
            await _userManager.UpdateAsync(user);

            return Ok();
        }

        //[Authorize(Roles = "Administrator, Super Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
                return NotFound();

            await _userManager.DeleteAsync(user);

            return Ok();
        }


        // Backend action to create Roles
        [HttpGet("createroles")]
        public async Task<IActionResult> CreateRoles()
        {
            if (!await _roleManager.RoleExistsAsync("Super Administrator"))
            {
                var role = new IdentityRole<Guid>
                {
                    Name = "Super Administrator",

                };
                await _roleManager.CreateAsync(role);
            }
            if (!await _roleManager.RoleExistsAsync("Administrator"))
            {
                var role = new IdentityRole<Guid>
                {
                    Name = "Administrator",

                };
                await _roleManager.CreateAsync(role);
            }
            if (!await _roleManager.RoleExistsAsync("Student"))
            {
                var role = new IdentityRole<Guid>
                {
                    Name = "Student",

                };
                await _roleManager.CreateAsync(role);
            }
            if (!await _roleManager.RoleExistsAsync("Teacher"))
            {
                var role = new IdentityRole<Guid>
                {
                    Name = "Teacher",

                };
                await _roleManager.CreateAsync(role);
            }

            return Ok();
        }


        //
        public void UpdateModel(AppUser user, UserDTO model)
        {
            user.UserName = model.UserName;
            user.NormalizedUserName = model.UserName.ToUpperInvariant();
            user.NormalizedEmail = model.Email.ToUpperInvariant();
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.AddressLine1 = model.AddressLine1;
            user.City = model.City;
            user.State = model.State;
            user.PhoneNumber = model.PhoneNumber;
        }
    }
}