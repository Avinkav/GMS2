using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GMS.ASPNet.Core.Models;
using GMS.Data;
using GMS.Data.Models;
using GMS2.Core.Helpers;
using GMS2.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GMS2.Core.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        [TempData] public string ErrorMessage { get; set; }

        /// <summary>
        /// Dependency Injection is used to retrieve the services needed for us to manaage users
        /// </summary>
        /// <param name="userManager">ASP Net Identity User Manager</param>
        /// <param name="signInManager">ASP Net Identity Sign In Manager</param>
        /// <param name="logger">Default ASP Net Logger</param>
        public AccountController(
             UserManager<AppUser> userManager,
             SignInManager<AppUser> signInManager,
             DataContext dataContext,
             IConfiguration configuration
             )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _dataContext = dataContext;
        }

        /// <summary>
        /// Called when Register view POSTs a new users data to the controller
        /// </summary>
        /// <param name="model">View model containin the new registrants datra</param>
        /// <param name="returnUrl">Page to redirect to after user logs in</param>
        /// <returns></returns>
        [HttpPost("register")]
        public async Task<object> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            // Creating the new user
            var user = new AppUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                AddressLine1 = model.AddressLine1,
                City = model.City,
                State = model.State,
                PostCode = model.PostCode,
                Dob = DateTime.Parse(model.DOB),
                Student = new Student()
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            
            if (!result.Succeeded) 
                return new BadRequestObjectResult(result.Errors);

            result = await _userManager.AddToRoleAsync(user, "Student");

            if (!result.Succeeded) 
                return new BadRequestObjectResult(result.Errors);

            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }

            // Sign new user in if registration was succesful
            await _signInManager.SignInAsync(user, isPersistent: false);

            return new OkObjectResult(user.ToViewModel());

        }

        [HttpPost("login")]
        public async Task<object> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);

            if (result.Succeeded)
            {
                var user = await _userManager.Users.Include(u => u.Student)
                                                        .Include(u => u.Teacher)
                                                        .Where(r => r.NormalizedEmail == model.Email.ToUpperInvariant()).SingleOrDefaultAsync();
                return Ok(user.ToViewModel());
            }

            return BadRequest(result);
        }

        [HttpGet("logout")]
        public async Task<object> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        [HttpGet("details")]
        [Authorize]
        public async Task<object> Details(string id = null)
        {
            var user = await _userManager.GetUserAsync(User);
            var vm = user.ToViewModel();
            return Json(vm);
        }


        [HttpPut("details")]
        [Authorize]
        public async Task<object> Details([FromBody] UserViewModel model)
        {
            if (model == null)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return NotFound();

            if (user.Id != model.Id)
                return Unauthorized();

            // Perform database update
            UpdateValues(user, model);
            await _userManager.UpdateAsync(user);
            await _userManager.UpdateNormalizedEmailAsync(user);
            await _userManager.UpdateNormalizedUserNameAsync(user);

            return Ok();
        }

        // Update user object using values from the viewmodel
        public void UpdateValues(AppUser user, UserViewModel model)
        {
            user.UserName = model.UserName;
            user.NormalizedUserName = model.Email.ToUpperInvariant();
            user.NormalizedEmail = model.Email.ToUpperInvariant();
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Dob = DateTime.Parse(model.dob);
            user.Email = model.Email;
            user.AddressLine1 = model.AddressLine1;
            user.City = model.City;
            user.PostCode = model.PostCode;
            user.PhoneNumber = model.PhoneNumber;
        }

        private async Task<object> GenerateJwtToken(string email, AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}