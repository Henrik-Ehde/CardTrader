using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CardTrader.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedingDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_BuyerId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_SellerId",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "SellerId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BuyerId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "10c3ab68-349d-46a2-beba-6d6a34d44e4a", 0, "a190635c-513f-4be0-a51b-557b791bffa0", "PadawanHenrik@cardtrader.com", false, false, null, "PADAWANHENRIK@CARDTRADER.COM", "PADAWANHENRIK@CARDTRADER.COM", "AQAAAAIAAYagAAAAEG9kt1KLy1gURwa6qEn1qisTKYTo93B5IvWLGcusp7CpSa4KTG2/wTguhII0JUy2Sg==", null, false, "KEL4AYSOLSTDBGCOV6V5KLW2ZMQ72ZQR", false, "PadawanHenrik@cardtrader.com" },
                    { "13accbe2-0d08-405e-842f-562eb19eb9eb", 0, "86ab6172-af3d-489e-8d94-d77c100ad6c6", "MasterHenrik@cardtrader.com", false, false, null, "MASTERHENRIK@CARDTRADER.COM", "MASTERHENRIK@CARDTRADER.COM", "AQAAAAIAAYagAAAAEIF689lwByxC4CSBx+0QZJKDnyhP8P62vRs7jZC4S9BI6YhNwkHXlSzPRg/jQmziKA==", null, false, "DJRTVSF73SKZE64XSWIXBWOZB2Y7VO5B", false, "MasterHenrik@cardtrader.com" },
                    { "305be290-c6c8-4088-abe0-3c7fd240575d", 0, "fff2c039-7c68-4d41-9981-ecd26294f1dc", "RebelHenrik@cardtrader.com", false, false, null, "REBELHENRIK@CARDTRADER.COM", "REBELHENRIK@CARDTRADER.COM", "AQAAAAIAAYagAAAAEFF4isjGcaE2wX18ISy835P2uLwdgTCWITlE94GtdKNZuAybaQNUS1MP3PF84Eae/Q==", null, false, "ORAX25XMADYUIDL3RKPIV6NFVQXL5FZH", false, "RebelHenrik@cardtrader.com" },
                    { "4d89b9ec-ab0d-4bcd-bd33-4c1c0227c139", 0, "c1195420-1986-46e9-b291-c9e9cee3acf7", "AdmiralHenrik@cardtrader.com", false, false, null, "ADMIRALHENRIK@CARDTRADER.COM", "ADMIRALHENRIK@CARDTRADER.COM", "AQAAAAIAAYagAAAAEJfYRJgW3V9y3Vs8W4QOZMwz9vAXq+NHSZgmzF1AfFyilMqXqIJ47y6Z6OdC9nnDjQ==", null, false, "WI4O73VRDTLSJRL5HWE45FFWA7FULWRC", false, "AdmiralHenrik@cardtrader.com" },
                    { "c23bfbf6-54e2-407f-9a0e-a4e77c85e2aa", 0, "b7e22164-9520-42d1-96c2-39f28892cc12", "DarthHenrik@cardtrader.com", false, false, null, "DARTHHENRIK@CARDTRADER.COM", "DARTHHENRIK@CARDTRADER.COM", "AQAAAAIAAYagAAAAEN/LgAUxWpsrjQ7k66r06IT+wHf6vUegODYWn1NYthFmO/y1n3VvAfVkZHBrUrX6fw==", null, false, "Y22CH62G7SLLYCMAZPAWJOX6GTZHQMWR", false, "DarthHenrik@cardtrader.com" },
                    { "d7826a1c-1652-48a1-8cfd-4a976248d03a", 0, "e9e15815-1c00-4553-84a9-9fb4fa560343", "StormTrooperHenrik@cardtrader.com", false, false, null, "STORMTROOPERHENRIK@CARDTRADER.COM", "STORMTROOPERHENRIK@CARDTRADER.COM", "AQAAAAIAAYagAAAAEDHKfCtcQwOxoXOc3G7FPQNWyvzJo5e5WUtT0KPNuAIuh8MA0hqs5lZZjf9Sn94Zig==", null, false, "ZOM3SDYSQGAAN34Q2PMJXF65ZRQC2LRQ", false, "StormTrooperHenrik@cardtrader.com" },
                    { "e7c585dc-4b37-4a75-8458-a09caf1df0a1", 0, "ae2b262e-4765-4022-8aaf-fb3bfbe5686c", "SithHenrik@cardtrader.com", false, false, null, "SITHHENRIK@CARDTRADER.COM", "SITHHENRIK@CARDTRADER.COM", "AQAAAAIAAYagAAAAEBzOpUxTQY+jYvRVtRGCtivyhTL34WWsSKf3dSO+HIJ5/X+/OkZwa867pNCW5EZSRA==", null, false, "A2WFEBY3WQR37XP4ECCTPALD33L7FHVB", false, "SithHenrik@cardtrader.com" }
                });

            migrationBuilder.InsertData(
                table: "Cards",
                columns: new[] { "Id", "Text", "Title" },
                values: new object[,]
                {
                    { 2, "Defeat All Units", "Superlaser Blast" },
                    { 3, "Defeat a unit with 5 or less remaining HP", "Takedown" },
                    { 4, "When Played: You may deal 3 damage to a space unit.", "Imperial Interceptor" },
                    { 5, "Defeat a non-leader unit", "Vanquish" },
                    { 9, "Action [-⌄]: Give an Experience token to another friendly unit", "Bail Organa" },
                    { 10, "When played: You may attack with a unit. If it's a REBEL unit, it gets +2/+0 for this attack.", "Fleet Lieutenant" },
                    { 11, "Other friendly REBEL units get +1/+1.", "General Dodonna" },
                    { 12, "Give an Experience token to each of up to 3 REBEL units that attacked this phase", "Medal Ceremony" },
                    { 14, "Return a non-leader unit to it's owner's hand", "Waylay" },
                    { 17, "Saboteur", "Rebel Pathfinder" },
                    { 18, "When Played: Deal Damage to an enemy unit equal to the number of units you control in it's arena", "Admiral Ackbar" },
                    { 21, "When Played: Either ready a resource or exhaust a unit", "Leia Organa" }
                });

            migrationBuilder.InsertData(
                table: "Listings",
                columns: new[] { "Id", "CardId", "DatePosted", "Price", "Quantity", "UserId" },
                values: new object[,]
                {
                    { 27, 14, new DateOnly(2024, 5, 16), 2.00m, 8, "305be290-c6c8-4088-abe0-3c7fd240575d" },
                    { 30, 3, new DateOnly(2024, 5, 16), 7.50m, 1, "d7826a1c-1652-48a1-8cfd-4a976248d03a" },
                    { 32, 2, new DateOnly(2024, 5, 16), 200.00m, 2, "d7826a1c-1652-48a1-8cfd-4a976248d03a" },
                    { 33, 9, new DateOnly(2024, 5, 16), 15.00m, 2, "d7826a1c-1652-48a1-8cfd-4a976248d03a" },
                    { 36, 12, new DateOnly(2024, 5, 16), 5.00m, 6, "c23bfbf6-54e2-407f-9a0e-a4e77c85e2aa" },
                    { 39, 11, new DateOnly(2024, 5, 16), 25.00m, 5, "c23bfbf6-54e2-407f-9a0e-a4e77c85e2aa" },
                    { 40, 17, new DateOnly(2024, 5, 17), 7.00m, 1, "10c3ab68-349d-46a2-beba-6d6a34d44e4a" },
                    { 46, 17, new DateOnly(2024, 5, 17), 4.00m, 4, "e7c585dc-4b37-4a75-8458-a09caf1df0a1" },
                    { 47, 17, new DateOnly(2024, 5, 17), 6.00m, 1, "13accbe2-0d08-405e-842f-562eb19eb9eb" },
                    { 52, 5, new DateOnly(2024, 5, 17), 10.00m, 2, "10c3ab68-349d-46a2-beba-6d6a34d44e4a" },
                    { 53, 21, new DateOnly(2024, 5, 17), 30.00m, 3, "10c3ab68-349d-46a2-beba-6d6a34d44e4a" },
                    { 54, 18, new DateOnly(2024, 5, 24), 20.00m, 2, "13accbe2-0d08-405e-842f-562eb19eb9eb" },
                    { 55, 18, new DateOnly(2024, 5, 24), 25.00m, 4, "d7826a1c-1652-48a1-8cfd-4a976248d03a" },
                    { 56, 18, new DateOnly(2024, 5, 24), 18.50m, 1, "e7c585dc-4b37-4a75-8458-a09caf1df0a1" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_BuyerId",
                table: "Orders",
                column: "BuyerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_SellerId",
                table: "Orders",
                column: "SellerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_BuyerId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_SellerId",
                table: "Orders");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4d89b9ec-ab0d-4bcd-bd33-4c1c0227c139");

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10c3ab68-349d-46a2-beba-6d6a34d44e4a");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "13accbe2-0d08-405e-842f-562eb19eb9eb");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "305be290-c6c8-4088-abe0-3c7fd240575d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c23bfbf6-54e2-407f-9a0e-a4e77c85e2aa");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d7826a1c-1652-48a1-8cfd-4a976248d03a");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e7c585dc-4b37-4a75-8458-a09caf1df0a1");

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Cards",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.AlterColumn<string>(
                name: "SellerId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "BuyerId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_BuyerId",
                table: "Orders",
                column: "BuyerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_SellerId",
                table: "Orders",
                column: "SellerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
