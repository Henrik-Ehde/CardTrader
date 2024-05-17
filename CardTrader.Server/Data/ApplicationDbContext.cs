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
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
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
        }
    }
}
