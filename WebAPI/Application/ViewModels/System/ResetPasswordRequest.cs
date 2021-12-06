namespace Application.ViewModels.System
{
    public class ResetPasswordRequest
    {
        public string NewPassword { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
