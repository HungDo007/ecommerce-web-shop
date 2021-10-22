using Microsoft.AspNetCore.Http;
using System;

namespace Application.ViewModels.System
{
    public class UserUpdateRequest
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public IFormFile Avatar { get; set; }
    }
}
