using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Data.Entities
{
    public class AppUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string Address { set; get; }
        public bool IsSale { get; set; }


        public List<Product> Products { get; set; }
        public Store Store { set; get; }
        public List<Order> Orders { get; set; }
        public List<Cart> Carts { get; set; }
    }
}
