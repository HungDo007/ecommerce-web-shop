using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 51, 28, 671, DateTimeKind.Local).AddTicks(8208),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 403, DateTimeKind.Local).AddTicks(407));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 51, 28, 658, DateTimeKind.Local).AddTicks(9250),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 389, DateTimeKind.Local).AddTicks(8099));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 51, 28, 635, DateTimeKind.Local).AddTicks(3668),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 334, DateTimeKind.Local).AddTicks(6952));

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "06b1329e-65c6-41eb-aeb8-adfe4a0f8ebb");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "45e5a6e4-28d1-4733-9c67-4befa5dcc1ac");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "5766ac3e-eea2-41a1-9315-b6c38d70f6e7", "AQAAAAEAACcQAAAAEBBZ9fzRmvO51q7tJ9KNFZ6YiGsA65NCcg8jtGQU1Phre9pIpHA4WaKuL1EJE+4Haw==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "OrderDetails");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 403, DateTimeKind.Local).AddTicks(407),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 51, 28, 671, DateTimeKind.Local).AddTicks(8208));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 389, DateTimeKind.Local).AddTicks(8099),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 51, 28, 658, DateTimeKind.Local).AddTicks(9250));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 334, DateTimeKind.Local).AddTicks(6952),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 51, 28, 635, DateTimeKind.Local).AddTicks(3668));

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "f0d06c93-a376-4be6-8729-91d0a492ad0d");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "2b277619-f8d6-4b33-8a22-152bc8acd653");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "1f0574b4-289e-4c81-8fdb-e6dea0e80398", "AQAAAAEAACcQAAAAEHcaqSDdwr/Eb+qSCyJmqYwU9g6EYWz3ca6Gb7dbpOxCWVT2fpbwS79Ymvml3UOdaA==" });
        }
    }
}
