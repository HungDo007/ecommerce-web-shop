using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Components",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "b1bee148-2007-422a-9007-eb67098eeb96");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "22e20350-d481-480c-81b9-e8f06cc1aea4");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "30ad2249-5432-4039-a549-014fd8bcb7ee", "AQAAAAEAACcQAAAAEFJy1K64pWG81+kf6hhrHBq4JifEw+Mcgw37N5y3uNFS+nbdBF3nytM1bWirAq+R7w==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Components");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "a6f9e2ee-195b-42a3-a8f8-bedbc2977453");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "7ee5fa49-35bb-44cf-ad46-dd507fa0f872");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "6e927b49-5a3b-4f68-9c68-4a1c98b035b2", "AQAAAAEAACcQAAAAECLcRC/ljTqTg4GzmfcQcmnjXZj7/1rquuKSxXw/oUDOXvyJmFHd38FeFOd3LzHs1g==" });
        }
    }
}
