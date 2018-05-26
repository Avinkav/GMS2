using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GMS.Data.Migrations
{
    public partial class renameLessonColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TaughtToId",
                table: "Lesson",
                newName: "TeacherId");

            migrationBuilder.RenameColumn(
                name: "TaughtById",
                table: "Lesson",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Lesson_TaughtToId",
                table: "Lesson",
                newName: "IX_Lesson_TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lesson_Student_StudentId",
                table: "Lesson",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lesson_Teacher_TeacherId",
                table: "Lesson",
                column: "TeacherId",
                principalTable: "Teacher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lesson_Student_StudentId",
                table: "Lesson");

            migrationBuilder.DropForeignKey(
                name: "FK_Lesson_Teacher_TeacherId",
                table: "Lesson");

            migrationBuilder.RenameColumn(
                name: "TeacherId",
                table: "Lesson",
                newName: "TaughtToId");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "Lesson",
                newName: "TaughtById");

            migrationBuilder.RenameIndex(
                name: "IX_Lesson_TeacherId",
                table: "Lesson",
                newName: "IX_Lesson_TaughtToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lesson_Teacher_TaughtById",
                table: "Lesson",
                column: "TaughtById",
                principalTable: "Teacher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lesson_Student_TaughtToId",
                table: "Lesson",
                column: "TaughtToId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
