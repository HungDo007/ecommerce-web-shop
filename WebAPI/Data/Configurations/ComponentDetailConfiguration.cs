using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Data.Configurations
{
    public class ComponentDetailConfiguration : IEntityTypeConfiguration<ComponentDetail>
    {
        public void Configure(EntityTypeBuilder<ComponentDetail> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasMany(x => x.ProductDetails).WithMany(y => y.ComponentDetails);
            builder.HasOne(x => x.Component).WithMany(x => x.ComponentDetails).HasForeignKey(x => x.ComponentId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
