using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
    
namespace Data.Configurations
{
    public class UserActiveMailConfiguration : IEntityTypeConfiguration<UserActiveEmail>
    {
        public void Configure(EntityTypeBuilder<UserActiveEmail> builder)
        {
            builder.HasKey(x => x.Email);
        }
    }
}
