using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class updatedatabase0 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "UserActiveEmails",
                newName: "Email");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "8fdc6677-b367-4768-b8cb-f2cb1f516358");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "aa6595a2-452b-4528-bf4a-31bdd72d9f2d");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f820405b-c438-401b-bb5b-1962e9c41db2", "AQAAAAEAACcQAAAAEJbyfwHJGWTmpM4J7/izkAHExv1Gsfa6rguMiOu6jHBEJHV5DvLaAOt96/tZWnvZKg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "UserActiveEmails",
                newName: "Username");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "7336b9cb-3c85-4f32-8eff-debf8c9c3886");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "2a8ff4e5-3126-493e-9526-e5c518b3b6ac");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "85349f8c-47d7-4eba-a177-4c81b16c77d9", "AQAAAAEAACcQAAAAELxBaGAnBhWvLO78BNq+PoAgikimcYog0JMrle8gOKy/H5zaWcDXuxkShVQ/2aFO0A==" });
        }
    }
}
