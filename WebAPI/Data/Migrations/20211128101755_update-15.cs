using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShipEmail",
                table: "Orders",
                newName: "ShipName");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 958, DateTimeKind.Local).AddTicks(6003),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 25, 10, 54, 15, 344, DateTimeKind.Local).AddTicks(576));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 948, DateTimeKind.Local).AddTicks(3919),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 25, 10, 54, 15, 332, DateTimeKind.Local).AddTicks(8937));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 929, DateTimeKind.Local).AddTicks(5853),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 25, 10, 54, 15, 314, DateTimeKind.Local).AddTicks(8547));

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShipName",
                table: "Orders",
                newName: "ShipEmail");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 25, 10, 54, 15, 344, DateTimeKind.Local).AddTicks(576),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 958, DateTimeKind.Local).AddTicks(6003));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 25, 10, 54, 15, 332, DateTimeKind.Local).AddTicks(8937),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 948, DateTimeKind.Local).AddTicks(3919));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 25, 10, 54, 15, 314, DateTimeKind.Local).AddTicks(8547),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 28, 17, 17, 53, 929, DateTimeKind.Local).AddTicks(5853));

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "a20e2053-7923-4b60-ae02-77c9bbbd8dd4");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "e285a400-52ec-4a54-bb7d-765d29f1ca2c");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "53b6215e-a457-4c36-86dc-4410dccdb9b0", "AQAAAAEAACcQAAAAEKGFYy4oQNwUs15q3/F383A+FRNZih/AvfJ+qH1thz719UUI/e8YQBrd2v4LaUM5SA==" });
        }
    }
}
