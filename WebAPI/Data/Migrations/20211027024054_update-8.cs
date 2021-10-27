using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 27, 9, 40, 53, 374, DateTimeKind.Local).AddTicks(4080),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 21, 14, 54, 31, 151, DateTimeKind.Local).AddTicks(5105));

            migrationBuilder.AlterColumn<string>(
                name: "Avatar",
                table: "AppUsers",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "/Avatar/default.png",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "470bd5ca-63c3-4e6f-a1c8-6ad238a6427e");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "007066af-8f70-4a24-ace2-67d70a472c09");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ecc8a3fa-39e8-4623-a270-3f8d0b078f37", "AQAAAAEAACcQAAAAECSZS2Kpd4DwLbnhx+QoE18Yf+sy3XgyeLUKfhiZSZPr52+D/jz9GcTxXoh3a5KaGg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 21, 14, 54, 31, 151, DateTimeKind.Local).AddTicks(5105),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 27, 9, 40, 53, 374, DateTimeKind.Local).AddTicks(4080));

            migrationBuilder.AlterColumn<string>(
                name: "Avatar",
                table: "AppUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "/Avatar/default.png");

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
    }
}
