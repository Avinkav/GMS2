using System;
using GMS.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GMS.Data
{
    /// <summary>
    /// Solution implementation of Entity Framework Identity Db context.
    /// Uses AppUser for user accounts, type IdentityRole<Guid> for role
    /// and Guid as Id for user
    /// </summary>
    public class DataContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
    {
        /// <summary>
        /// A call to the super constructor
        /// </summary>
        /// <param name="options">Options for Database Model such as the Connection String</param>
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Availability> Availabilities { get; set; }

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<Instrument> Instruments { get; set; }

        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<Student> Students { get; set; }


        /// <summary>
        /// Executed when Entity Framework is being initialised by the application
        /// This is used to build object-relational mapping and configure relationships
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Models are mapped to singular names. i.e. Lesson is mapped to a table named Lesson instead of Lessons
            modelBuilder.Entity<Lesson>().ToTable("Lesson");
            modelBuilder.Entity<Instrument>().ToTable("Instrument");
            modelBuilder.Entity<Availability>().ToTable("Availability");
            modelBuilder.Entity<Teacher>().ToTable("Teacher");
            modelBuilder.Entity<Student>().ToTable("Student");

            // Composite key for Availability
            modelBuilder.Entity<Availability>()
                .HasKey(c => new { c.UserId, c.StartTime });

            modelBuilder.Entity<Lesson>()
                .HasKey(c => c.Id );

            // Composite key for Lesson
            modelBuilder.Entity<Lesson>()
                .HasAlternateKey(c => new { c.StudentId, c.TeacherId, c.DateTime });

            //modelBuilder.Entity<AppUser>().HasOne(a => a.Student).WithOne(b => b.AppUser).HasForeignKey<Student>(b => b.UserId).IsRequired();

            //modelBuilder.Entity<AppUser>().HasOne(d => d.Teacher).WithOne(e => e.AppUser).HasForeignKey<Teacher>(e => e.UserId).IsRequired();

        }
     
    }
}
