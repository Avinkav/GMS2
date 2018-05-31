using GMS.Data;
using GMS.Data.Models;
using GMS2.Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;
using GMS2.Core.Helpers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;

namespace GMS2.Core
{
    /// <summary>
    /// ASP Net Core application startup routine.
    /// Configure the Web App as needed.
    /// </summary>
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        /// Use this method to configure services that are going to be used by the web app.
        /// Eg: Entity Framework Database Service, ASP Net Identity Service
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            // Add GMS.Data.DataContext to servicesn as the Entity Framework Database Model
            // and pass the MySql Connection string to it.
            services.AddDbContext<DataContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("GoogleSQLConnection")));


            // Add GMS.Data.AppUser as the ASP Net Identity user class, passing IdentityRole<Guid> as the
            // default user role. Pass GMS.Data.DataContext as the Entity Framework store to be used to
            // store user details Use the default token provider to provide tokens for password reset etc....
            services.AddIdentity<AppUser, IdentityRole<Guid>>().AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

            // JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            // services
            //     .AddAuthentication(options =>
            //     {
            //         options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //         options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            //         options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            //     })
            //     .AddJwtBearer(cfg =>
            //     {
            //         cfg.RequireHttpsMetadata = false;
            //         cfg.SaveToken = true;
            //         cfg.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             ValidIssuer = Configuration["JwtIssuer"],
            //             ValidAudience = Configuration["JwtIssuer"],
            //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
            //             ClockSkew = TimeSpan.Zero // remove delay of token when expire
            //         };
            //     });

            // Configure ASP Net Identity to behave as required
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.Password.RequiredUniqueChars = 0;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings
                options.User.RequireUniqueEmail = true;
            });

            // Configure cookies to maintain Identity Settings
            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(30);
                options.LoginPath = "/account/login";
                options.AccessDeniedPath = "/session/accessDenied";
                options.Events.OnRedirectToAccessDenied = ReplaceRedirector(HttpStatusCode.Forbidden, options.Events.OnRedirectToAccessDenied);
                options.Events.OnRedirectToLogin = ReplaceRedirector(HttpStatusCode.Unauthorized, options.Events.OnRedirectToLogin);
                options.SlidingExpiration = true;
            });

            services.AddMvc();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                  name: "API default",
                    template: "{controller}/{id?}");

                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200/");
                }
            });
        }

        static Func<RedirectContext<CookieAuthenticationOptions>, Task> ReplaceRedirector(HttpStatusCode statusCode, Func<RedirectContext<CookieAuthenticationOptions>, Task> existingRedirector) =>
            context =>
            {
                if (context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.StatusCode = (int)statusCode;
                    return Task.CompletedTask;
                }
                return existingRedirector(context);
            };
    }
}
