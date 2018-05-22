using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GMS.Data.Migrations
{
    public partial class _2205 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonType");

            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Lesson",
                newName: "StartDateTime");

            migrationBuilder.AddColumn<string>(
                name: "InstrumentsTaught",
                table: "Teacher",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Instruments",
                table: "Student",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstrumentsTaught",
                table: "Teacher");

            migrationBuilder.DropColumn(
                name: "Instruments",
                table: "Student");

            migrationBuilder.RenameColumn(
                name: "StartDateTime",
                table: "Lesson",
                newName: "DateTime");

            migrationBuilder.CreateTable(
                name: "LessonType",
                columns: table => new
                {
                    Type = table.Column<string>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    StudentId = table.Column<Guid>(nullable: true),
                    TeacherId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonType", x => new { x.Type, x.UserId });
                    table.ForeignKey(
                        name: "FK_LessonType_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LessonType_Teacher_TeacherId",
                        column: x => x.TeacherId,
                        principalTable: "Teacher",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LessonType_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonType_StudentId",
                table: "LessonType",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonType_TeacherId",
                table: "LessonType",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonType_UserId",
                table: "LessonType",
                column: "UserId");
        }
    }
}
