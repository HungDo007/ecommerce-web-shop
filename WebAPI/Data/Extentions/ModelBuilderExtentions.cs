using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Extentions
{
    public static class ModelBuilderExtentions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            Guid RoleAdminId = new Guid("AE7F2C5C-8241-4E88-9E2E-4E9342F98A51");
            Guid RoleUserId = new Guid("8DAF1440-3444-416D-807C-EDBE207F8FBA");
            Guid AdminID = new Guid("F82493F3-AB61-477B-8BB8-DAEBC61CF148");

            modelBuilder.Entity<AppRole>().HasData(
                new AppRole() { Id = RoleAdminId, Name = "Admin", Description = "Administrator", NormalizedName = "admin" },
                new AppRole() { Id = RoleUserId, Name = "User", Description = "Website Users", NormalizedName = "user" }
                );

            modelBuilder.Entity<IdentityUserRole<Guid>>().HasData(new IdentityUserRole<Guid>
            {
                RoleId = RoleAdminId,
                UserId = AdminID
            });

            var hasher = new PasswordHasher<AppUser>();

            modelBuilder.Entity<AppUser>().HasData(new AppUser
            {
                Id = AdminID,
                UserName = "admin",
                NormalizedUserName = "admin",
                Email = "webshop@gmail.com",
                NormalizedEmail = "webshop@gmail.com",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Abcd@1234"),
                SecurityStamp = string.Empty,
                FirstName = "Super",
                LastName = "Admin",
                Dob = new DateTime(2020, 01, 31),
                Address = "TPHCM",
                PhoneNumber = "1234567"
            });

            modelBuilder.Entity<Transaction>().HasData(new Transaction
            {
                Id = 999,
                Fee = 1,
                Provider = "MySHop"
            });
        }
    }
}
