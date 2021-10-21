using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 21, 14, 54, 31, 151, DateTimeKind.Local).AddTicks(5105),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 21, 10, 25, 55, 578, DateTimeKind.Local).AddTicks(8758));

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "AppUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "f2f244e0-ca6a-4376-a947-df743a473366");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "65e8b462-9601-4627-9b71-e4b21aa2d818");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f66e9bc1-ba5a-4c1d-af39-a727530e7fd6", "AQAAAAEAACcQAAAAEO0FgS6tXe+BkOT9Uirz33WjD6GLHQo0NsQsB9MUA6AaoeTmpwUjm7E2atmgUuVfSQ==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "AppUsers");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 21, 10, 25, 55, 578, DateTimeKind.Local).AddTicks(8758),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 21, 14, 54, 31, 151, DateTimeKind.Local).AddTicks(5105));

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "bdc118c4-d64a-4645-8728-281fd5d33d3b");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "7e51414a-5499-41d8-ab4b-23b139026a5e");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a7d3e654-754a-47e2-848f-8b48baab7219", "AQAAAAEAACcQAAAAEMyK4Gd374o8W3NdxHGLbDsUVh0uwV/lf6bWdQ7qeVCHjhM/HpYeHMEcSCNvp+uBmQ==" });
        }
    }
}
