using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update22 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 6, 10, 34, 15, 630, DateTimeKind.Local).AddTicks(683),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 751, DateTimeKind.Local).AddTicks(9419));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 6, 10, 34, 15, 620, DateTimeKind.Local).AddTicks(4854),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 743, DateTimeKind.Local).AddTicks(1036));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 6, 10, 34, 15, 601, DateTimeKind.Local).AddTicks(539),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 721, DateTimeKind.Local).AddTicks(5414));

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "3437331c-df2c-4482-9b81-c3b329cea439");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "2c1e062b-ceb2-484f-a9fd-70e83356674f");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f629ef4b-4d34-4b0d-adb3-b5490680e1bf", "AQAAAAEAACcQAAAAEGiUlhSW3YjoTCrOsqU6pJQ27JRhf8fKTzDrWqCnL9EotGgrUXkQZAJXI/bzilANSQ==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 751, DateTimeKind.Local).AddTicks(9419),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 6, 10, 34, 15, 630, DateTimeKind.Local).AddTicks(683));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 743, DateTimeKind.Local).AddTicks(1036),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 6, 10, 34, 15, 620, DateTimeKind.Local).AddTicks(4854));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 721, DateTimeKind.Local).AddTicks(5414),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 6, 10, 34, 15, 601, DateTimeKind.Local).AddTicks(539));

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "e17f2109-f625-4c6e-80fe-227a27745983");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "2fb2fac2-1fbb-464f-b315-1ad7517b9c77");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "b5c8d7b5-0799-43c5-9da2-4964676e3ea4", "AQAAAAEAACcQAAAAELw7ziyZWJVaZMwzxhm+MQ1QKuSAs+oaQpirofu/y9VSW4MJVn/WCec/zKNjbIHDYQ==" });
        }
    }
}
