using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GMS.Data.Migrations
{
    public partial class teacherstudent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availability_Teacher_Teacherid",
                table: "Availability");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonType_Teacher_Teacherid",
                table: "LessonType");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_AspNetUsers_AppUserId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Teacher_AspNetUsers_AppUserId",
                table: "Teacher");

            migrationBuilder.DropIndex(
                name: "IX_Teacher_AppUserId",
                table: "Teacher");

            migrationBuilder.DropIndex(
                name: "IX_Student_AppUserId",
                table: "Student");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Teacher",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Teacher",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Student",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Teacherid",
                table: "LessonType",
                newName: "TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_LessonType_Teacherid",
                table: "LessonType",
                newName: "IX_LessonType_TeacherId");

            migrationBuilder.RenameColumn(
                name: "Teacherid",
                table: "Availability",
                newName: "TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Availability_Teacherid",
                table: "Availability",
                newName: "IX_Availability_TeacherId");

            migrationBuilder.AddColumn<string>(
                name: "LanguagesSpoken",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TeacherId",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Teacher_UserId",
                table: "Teacher",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Student_UserId",
                table: "Student",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Availability_Teacher_TeacherId",
                table: "Availability",
                column: "TeacherId",
                principalTable: "Teacher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonType_Teacher_TeacherId",
                table: "LessonType",
                column: "TeacherId",
                principalTable: "Teacher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_AspNetUsers_UserId",
                table: "Student",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Teacher_AspNetUsers_UserId",
                table: "Teacher",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availability_Teacher_TeacherId",
                table: "Availability");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonType_Teacher_TeacherId",
                table: "LessonType");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_AspNetUsers_UserId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Teacher_AspNetUsers_UserId",
                table: "Teacher");

            migrationBuilder.DropIndex(
                name: "IX_Teacher_UserId",
                table: "Teacher");

            migrationBuilder.DropIndex(
                name: "IX_Student_UserId",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "LanguagesSpoken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Teacher",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Teacher",
                newName: "AppUserId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Student",
                newName: "AppUserId");

            migrationBuilder.RenameColumn(
                name: "TeacherId",
                table: "LessonType",
                newName: "Teacherid");

            migrationBuilder.RenameIndex(
                name: "IX_LessonType_TeacherId",
                table: "LessonType",
                newName: "IX_LessonType_Teacherid");

            migrationBuilder.RenameColumn(
                name: "TeacherId",
                table: "Availability",
                newName: "Teacherid");

            migrationBuilder.RenameIndex(
                name: "IX_Availability_TeacherId",
                table: "Availability",
                newName: "IX_Availability_Teacherid");

            migrationBuilder.CreateIndex(
                name: "IX_Teacher_AppUserId",
                table: "Teacher",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Student_AppUserId",
                table: "Student",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Availability_Teacher_Teacherid",
                table: "Availability",
                column: "Teacherid",
                principalTable: "Teacher",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonType_Teacher_Teacherid",
                table: "LessonType",
                column: "Teacherid",
                principalTable: "Teacher",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_AspNetUsers_AppUserId",
                table: "Student",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Teacher_AspNetUsers_AppUserId",
                table: "Teacher",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
