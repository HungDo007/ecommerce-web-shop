using Application.ViewModels.Common;

namespace Application.ViewModels.System
{
    public class LockAccountRequest : LockRequestBase
    {
        public string Username { get; set; }
    }
}
