using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GMS.ASPNet.Core.Models;
using GMS.Data.Models;
using GMS2.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GMS2.Core.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
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
             IConfiguration configuration
             )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        /// <summary>
        /// Called when Register view POSTs a new users data to the controller
        /// </summary>
        /// <param name="model">View model containin the new registrants datra</param>
        /// <param name="returnUrl">Page to redirect to after user logs in</param>
        /// <returns></returns>
        [HttpPost("register")]
        public async Task<object> Register([FromBody] RegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (!ModelState.IsValid) return new BadRequestObjectResult("Invalid data recieved");

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
                PostCode = model.PostCode
                       
                
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            // Sign new user in if regisration was succesful
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return new OkObjectResult(user);
            }else
                return new BadRequestObjectResult("Error Encountered");

        }

        [HttpPost("login")]
        public async Task<object> Login([FromBody] LoginViewModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if (result.Succeeded)
            {
                var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);
                return await GenerateJwtToken(model.Email, appUser);
            }

            return new BadRequestObjectResult("Login Failed");
        }

        [HttpGet("details")]
        [Authorize]
        public async Task<object> Details(string id = null){
            var user = await _userManager.GetUserAsync(User);
            var userVm = new UserViewModel(user);
            return Json(userVm);
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