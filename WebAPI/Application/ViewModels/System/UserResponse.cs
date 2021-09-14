using System;

namespace Application.ViewModels.System
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string Address { set; get; }
        public string Email { set; get; }
        public string Role { set; get; }
    }
}
