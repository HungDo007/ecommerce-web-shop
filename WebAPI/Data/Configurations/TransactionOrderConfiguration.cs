using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class TransactionOrderConfiguration : IEntityTypeConfiguration<TransactionOrder>
    {
        public void Configure(EntityTypeBuilder<TransactionOrder> builder)
        {
            builder.HasKey(x => new { x.OrderId, x.TransactionId });
            builder.HasOne(x => x.Order).WithOne(x => x.TransactionOrder);
            builder.HasOne(x => x.Transaction).WithMany(x => x.TransactionOrders).HasForeignKey(x => x.TransactionId);
        }
    }
}
