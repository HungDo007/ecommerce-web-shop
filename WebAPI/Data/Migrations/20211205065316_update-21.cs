using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class update21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PaymentOnlines",
                table: "PaymentOnlines");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 751, DateTimeKind.Local).AddTicks(9419),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 4, 17, 58, 44, 214, DateTimeKind.Local).AddTicks(9907));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 743, DateTimeKind.Local).AddTicks(1036),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 4, 17, 58, 44, 207, DateTimeKind.Local).AddTicks(7798));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 721, DateTimeKind.Local).AddTicks(5414),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 4, 17, 58, 44, 191, DateTimeKind.Local).AddTicks(8539));

            migrationBuilder.AddPrimaryKey(
                name: "PK_PaymentOnlines",
                table: "PaymentOnlines",
                columns: new[] { "Token", "OrderId" });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PaymentOnlines",
                table: "PaymentOnlines");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 4, 17, 58, 44, 214, DateTimeKind.Local).AddTicks(9907),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 751, DateTimeKind.Local).AddTicks(9419));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 4, 17, 58, 44, 207, DateTimeKind.Local).AddTicks(7798),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 743, DateTimeKind.Local).AddTicks(1036));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Carts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 4, 17, 58, 44, 191, DateTimeKind.Local).AddTicks(8539),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 5, 13, 53, 14, 721, DateTimeKind.Local).AddTicks(5414));

            migrationBuilder.AddPrimaryKey(
                name: "PK_PaymentOnlines",
                table: "PaymentOnlines",
                column: "Token");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("8daf1440-3444-416d-807c-edbe207f8fba"),
                column: "ConcurrencyStamp",
                value: "9b0a12a2-ea05-4c3f-8a56-a778e4cdc230");

            migrationBuilder.UpdateData(
                table: "AppRole",
                keyColumn: "Id",
                keyValue: new Guid("ae7f2c5c-8241-4e88-9e2e-4e9342f98a51"),
                column: "ConcurrencyStamp",
                value: "6967c10f-d8df-4db4-aa54-9510ba9300d9");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("f82493f3-ab61-477b-8bb8-daebc61cf148"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "82b8b669-6530-4ac7-b4d9-57448b969269", "AQAAAAEAACcQAAAAEBwdnPWNGlI8YmCCG7j3WY7txanri9WDg5/dDzm/7e//mv+d6vhuzfPwxGgfSr73dw==" });
        }
    }
}
