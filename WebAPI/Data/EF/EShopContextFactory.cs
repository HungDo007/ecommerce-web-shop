using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Data.EF
{
    public class EShopContextFactory : IDesignTimeDbContextFactory<EShopContext>
    {
        public EShopContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("eCommerceDb");

            var optionsBuilder = new DbContextOptionsBuilder<EShopContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new EShopContext(optionsBuilder.Options);
        }
    }
}
