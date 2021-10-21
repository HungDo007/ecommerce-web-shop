using System;

namespace Data.Entities
{
    public class Store
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Avatar { get; set; }
        public AppUser User { get; set; }
    }
}
