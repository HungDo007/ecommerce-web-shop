namespace Application.ViewModels
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { set; get; }
        public bool Remember { set; get; }
    }
}
