using Microsoft.AspNetCore.Http;

namespace Application.ViewModels.System
{
    public class StoreRequest
    {
        public string Username { get; set; }
        public string NameStore { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public IFormFile Avatar { get; set; }
    }
}
