using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class StoreConfiguration : IEntityTypeConfiguration<Store>
    {
        public void Configure(EntityTypeBuilder<Store> builder)
        {
            builder.HasKey(x => x.UserId);

            builder.HasOne(x => x.User).WithOne(x => x.Store);
        }
    }
}
