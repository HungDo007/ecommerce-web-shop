using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 403, DateTimeKind.Local).AddTicks(407),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 958, DateTimeKind.Local).AddTicks(6003));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 389, DateTimeKind.Local).AddTicks(8099),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 948, DateTimeKind.Local).AddTicks(3919));

            migrationBuilder.AddColumn<bool>(
                name: "Paid",
                table: "Orders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 334, DateTimeKind.Local).AddTicks(6952),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 929, DateTimeKind.Local).AddTicks(5853));

            migrationBuilder.CreateTable(
                name: "PaymentOnlines",
                columns: table => new
                {
                    Token = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentOnlines", x => x.Token);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentOnlines");

            migrationBuilder.DropColumn(
                name: "Paid",
                table: "Orders");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 958, DateTimeKind.Local).AddTicks(6003),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 403, DateTimeKind.Local).AddTicks(407));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 948, DateTimeKind.Local).AddTicks(3919),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 389, DateTimeKind.Local).AddTicks(8099));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 929, DateTimeKind.Local).AddTicks(5853),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 22, 7, 52, 334, DateTimeKind.Local).AddTicks(6952));

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "3ab60acc-3eac-4d68-9861-10771577a4aa");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "952b7e2f-ddd9-443d-9de0-1816c260ee66");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "3018efdc-b8d0-4652-9294-803d9857ebc2", "AQAAAAEAACcQAAAAEFM5g3i8VuDZwf7b/VUK7PfbAAgyuzVIvntlqZ16YXN7Rh0dL5zW/jreiCZQprlODw==" });
        }
    }
}
