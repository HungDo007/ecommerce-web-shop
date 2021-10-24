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
        public string PhoneNumber { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Avatar { get; set; }
        public string Email { set; get; }
        public string Role { set; get; }
    }
}
