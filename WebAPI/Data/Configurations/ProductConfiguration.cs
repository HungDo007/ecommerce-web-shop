using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Data.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Status).HasDefaultValue(true);
            builder.Property(x => x.ViewCount).HasDefaultValue(0);
            builder.Property(x => x.Rate).HasDefaultValue(0);
            builder.Property(x => x.DateCreated).HasDefaultValue(DateTime.Now);
            builder.HasOne(x => x.User).WithMany(x => x.Products).HasForeignKey(x => x.UserId);
        }
    }
}
