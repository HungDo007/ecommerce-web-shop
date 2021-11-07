using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Data.Configurations
{
    public class CartConfiguration : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder.ToTable("Carts");
            builder.HasKey(i => i.Id);
            builder.HasOne(i => i.ProductDetail).WithMany(i => i.Carts).HasForeignKey(i => i.ProductDetailId);
            builder.HasOne(i => i.AppUser).WithMany(i => i.Carts).HasForeignKey(i => i.UserId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
