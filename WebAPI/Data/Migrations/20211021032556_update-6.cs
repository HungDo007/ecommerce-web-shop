using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Stores",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Stores",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 21, 10, 25, 55, 578, DateTimeKind.Local).AddTicks(8758),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 20, 13, 46, 50, 832, DateTimeKind.Local).AddTicks(5447));

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Stores");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 20, 13, 46, 50, 832, DateTimeKind.Local).AddTicks(5447),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 21, 10, 25, 55, 578, DateTimeKind.Local).AddTicks(8758));

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "c550efe7-1c3e-447e-89e4-24e1afb3ebdf");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "2b89a034-bc30-441f-8cc9-8e753ddbd062");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ef04b00a-103b-44b3-a1f2-51795ed2b95f", "AQAAAAEAACcQAAAAEMgx1kShZMmPCBuLrTm0hsN3gaKSHmwvSDOgSMXKt3sj9YOHgACyW5hgtQ2vxB5PNg==" });
        }
    }
}
