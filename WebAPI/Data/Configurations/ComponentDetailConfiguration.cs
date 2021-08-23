using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    class ComponentDetailConfiguration : IEntityTypeConfiguration<ComponentDetail>
    {
        public void Configure(EntityTypeBuilder<ComponentDetail> builder)
        {
            builder.HasKey(x => new { x.ComponentId, x.DetailId });
            builder.HasOne(x => x.Component).WithMany(x => x.ComponentDetails).HasForeignKey(x => x.ComponentId);
            builder.HasOne(x => x.ProductDetail).WithMany(x => x.ComponentDetails).HasForeignKey(x => x.DetailId);

        }
    }
}
