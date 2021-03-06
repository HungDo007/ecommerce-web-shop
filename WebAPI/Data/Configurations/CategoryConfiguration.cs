using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Status).HasDefaultValue(true);
            builder.HasMany(x => x.CatParent).WithMany(x => x.CatChildren);
            builder.HasMany(x => x.Components).WithMany(x => x.Categories);
        }
    }
}
