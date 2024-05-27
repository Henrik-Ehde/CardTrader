using CardTrader.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Data;
using System.Reflection.Emit;

namespace CardTrader.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<Listing> Listings { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Order>()
                .HasOne(b => b.Buyer)
                .WithMany(t => t.BuyOrders)
                .HasForeignKey(pt => pt.BuyerId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Order>()
                .HasOne(b => b.Seller)
                .WithMany(t => t.SellOrders)
                .HasForeignKey(pt => pt.SellerId)
                .OnDelete(DeleteBehavior.Restrict);




            //SEEDS THE DATABASE WITH SOME DATA

            builder.Entity<User>().HasData(
                new User { Id = "10c3ab68-349d-46a2-beba-6d6a34d44e4a", UserName = "PadawanHenrik@cardtrader.com", NormalizedUserName = "PADAWANHENRIK@CARDTRADER.COM", PasswordHash = "AQAAAAIAAYagAAAAEG9kt1KLy1gURwa6qEn1qisTKYTo93B5IvWLGcusp7CpSa4KTG2/wTguhII0JUy2Sg==", SecurityStamp = "KEL4AYSOLSTDBGCOV6V5KLW2ZMQ72ZQR", Email = "PadawanHenrik@cardtrader.com", NormalizedEmail = "PADAWANHENRIK@CARDTRADER.COM" },
                new User { Id = "13accbe2-0d08-405e-842f-562eb19eb9eb", UserName = "MasterHenrik@cardtrader.com", NormalizedUserName = "MASTERHENRIK@CARDTRADER.COM", PasswordHash = "AQAAAAIAAYagAAAAEIF689lwByxC4CSBx+0QZJKDnyhP8P62vRs7jZC4S9BI6YhNwkHXlSzPRg/jQmziKA==", SecurityStamp = "DJRTVSF73SKZE64XSWIXBWOZB2Y7VO5B", Email = "MasterHenrik@cardtrader.com", NormalizedEmail = "MASTERHENRIK@CARDTRADER.COM" },
                new User { Id = "305be290-c6c8-4088-abe0-3c7fd240575d", UserName = "RebelHenrik@cardtrader.com", NormalizedUserName = "REBELHENRIK@CARDTRADER.COM", PasswordHash = "AQAAAAIAAYagAAAAEFF4isjGcaE2wX18ISy835P2uLwdgTCWITlE94GtdKNZuAybaQNUS1MP3PF84Eae/Q==", SecurityStamp = "ORAX25XMADYUIDL3RKPIV6NFVQXL5FZH", Email = "RebelHenrik@cardtrader.com", NormalizedEmail = "REBELHENRIK@CARDTRADER.COM" },
                new User { Id = "4d89b9ec-ab0d-4bcd-bd33-4c1c0227c139", UserName = "AdmiralHenrik@cardtrader.com", NormalizedUserName = "ADMIRALHENRIK@CARDTRADER.COM", PasswordHash = "AQAAAAIAAYagAAAAEJfYRJgW3V9y3Vs8W4QOZMwz9vAXq+NHSZgmzF1AfFyilMqXqIJ47y6Z6OdC9nnDjQ==", SecurityStamp = "WI4O73VRDTLSJRL5HWE45FFWA7FULWRC", Email = "AdmiralHenrik@cardtrader.com", NormalizedEmail = "ADMIRALHENRIK@CARDTRADER.COM" },
                new User { Id = "c23bfbf6-54e2-407f-9a0e-a4e77c85e2aa", UserName = "DarthHenrik@cardtrader.com", NormalizedUserName = "DARTHHENRIK@CARDTRADER.COM", PasswordHash = "AQAAAAIAAYagAAAAEN/LgAUxWpsrjQ7k66r06IT+wHf6vUegODYWn1NYthFmO/y1n3VvAfVkZHBrUrX6fw==", SecurityStamp = "Y22CH62G7SLLYCMAZPAWJOX6GTZHQMWR", Email = "DarthHenrik@cardtrader.com", NormalizedEmail = "DARTHHENRIK@CARDTRADER.COM" },
                new User { Id = "d7826a1c-1652-48a1-8cfd-4a976248d03a", UserName = "StormTrooperHenrik@cardtrader.com", NormalizedUserName = "STORMTROOPERHENRIK@CARDTRADER.COM", PasswordHash = "AQAAAAIAAYagAAAAEDHKfCtcQwOxoXOc3G7FPQNWyvzJo5e5WUtT0KPNuAIuh8MA0hqs5lZZjf9Sn94Zig==", SecurityStamp = "ZOM3SDYSQGAAN34Q2PMJXF65ZRQC2LRQ", Email = "StormTrooperHenrik@cardtrader.com", NormalizedEmail = "STORMTROOPERHENRIK@CARDTRADER.COM" },
                new User { Id = "e7c585dc-4b37-4a75-8458-a09caf1df0a1", UserName = "SithHenrik@cardtrader.com", NormalizedUserName = "SITHHENRIK@CARDTRADER.COM", PasswordHash = "AQAAAAIAAYagAAAAEBzOpUxTQY+jYvRVtRGCtivyhTL34WWsSKf3dSO+HIJ5/X+/OkZwa867pNCW5EZSRA==", SecurityStamp = "A2WFEBY3WQR37XP4ECCTPALD33L7FHVB", Email = "SithHenrik@cardtrader.com", NormalizedEmail = "SITHHENRIK@CARDTRADER.COM" }
                );


            builder.Entity<Card>().HasData(
                new Card { Id = 2, Title = "Superlaser Blast", Text = "Defeat All Units" },
                new Card { Id = 3, Title = "Takedown", Text = "Defeat a unit with 5 or less remaining HP" },
                new Card { Id = 4, Title = "Imperial Interceptor", Text = "When Played: You may deal 3 damage to a space unit." },
                new Card { Id = 5, Title = "Vanquish", Text = "Defeat a non-leader unit" },
                new Card { Id = 9, Title = "Bail Organa", Text = "Action [-⌄]: Give an Experience token to another friendly unit" },
                new Card { Id = 10, Title = "Fleet Lieutenant", Text = "When played: You may attack with a unit. If it's a REBEL unit, it gets +2/+0 for this attack." },
                new Card { Id = 11, Title = "General Dodonna", Text = "Other friendly REBEL units get +1/+1." },
                new Card { Id = 12, Title = "Medal Ceremony", Text = "Give an Experience token to each of up to 3 REBEL units that attacked this phase" },
                new Card { Id = 14, Title = "Waylay", Text = "Return a non-leader unit to it's owner's hand" },
                new Card { Id = 17, Title = "Rebel Pathfinder", Text = "Saboteur" },
                new Card { Id = 18, Title = "Admiral Ackbar", Text = "When Played: Deal Damage to an enemy unit equal to the number of units you control in it's arena" },
                new Card { Id = 21, Title = "Leia Organa", Text = "When Played: Either ready a resource or exhaust a unit" }
                );


            builder.Entity<Listing>().HasData(
                new Listing { Id = 27, CardId = 14, Quantity = 8, Price = 2.00M, UserId = "305be290-c6c8-4088-abe0-3c7fd240575d", DatePosted = DateOnly.Parse("2024-05-16") },
                new Listing { Id = 30, CardId = 3, Quantity = 1, Price = 7.50M, UserId = "d7826a1c-1652-48a1-8cfd-4a976248d03a", DatePosted = DateOnly.Parse("2024-05-16") },
                new Listing { Id = 32, CardId = 2, Quantity = 2, Price = 200.00M, UserId = "d7826a1c-1652-48a1-8cfd-4a976248d03a", DatePosted = DateOnly.Parse("2024-05-16") },
                new Listing { Id = 33, CardId = 9, Quantity = 2, Price = 15.00M, UserId = "d7826a1c-1652-48a1-8cfd-4a976248d03a", DatePosted = DateOnly.Parse("2024-05-16") },
                new Listing { Id = 36, CardId = 12, Quantity = 6, Price = 5.00M, UserId = "c23bfbf6-54e2-407f-9a0e-a4e77c85e2aa", DatePosted = DateOnly.Parse("2024-05-16") },
                new Listing { Id = 39, CardId = 11, Quantity = 5, Price = 25.00M, UserId = "c23bfbf6-54e2-407f-9a0e-a4e77c85e2aa", DatePosted = DateOnly.Parse("2024-05-16") },
                new Listing { Id = 40, CardId = 17, Quantity = 1, Price = 7.00M, UserId = "10c3ab68-349d-46a2-beba-6d6a34d44e4a", DatePosted = DateOnly.Parse("2024-05-17") },
                new Listing { Id = 46, CardId = 17, Quantity = 4, Price = 4.00M, UserId = "e7c585dc-4b37-4a75-8458-a09caf1df0a1", DatePosted = DateOnly.Parse("2024-05-17") },
                new Listing { Id = 47, CardId = 17, Quantity = 1, Price = 6.00M, UserId = "13accbe2-0d08-405e-842f-562eb19eb9eb", DatePosted = DateOnly.Parse("2024-05-17") },
                new Listing { Id = 52, CardId = 5, Quantity = 2, Price = 10.00M, UserId = "10c3ab68-349d-46a2-beba-6d6a34d44e4a", DatePosted = DateOnly.Parse("2024-05-17") },
                new Listing { Id = 53, CardId = 21, Quantity = 3, Price = 30.00M, UserId = "10c3ab68-349d-46a2-beba-6d6a34d44e4a", DatePosted = DateOnly.Parse("2024-05-17") },
                new Listing { Id = 54, CardId = 18, Quantity = 2, Price = 20.00M, UserId = "13accbe2-0d08-405e-842f-562eb19eb9eb", DatePosted = DateOnly.Parse("2024-05-24") },
                new Listing { Id = 55, CardId = 18, Quantity = 4, Price = 25.00M, UserId = "d7826a1c-1652-48a1-8cfd-4a976248d03a", DatePosted = DateOnly.Parse("2024-05-24") },
                new Listing { Id = 56, CardId = 18, Quantity = 1, Price = 18.50M, UserId = "e7c585dc-4b37-4a75-8458-a09caf1df0a1", DatePosted = DateOnly.Parse("2024-05-24") }
                );
        }
    }
}
