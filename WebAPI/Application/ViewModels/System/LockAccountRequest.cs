using Application.ViewModels.Common;

namespace Application.ViewModels.System
{
    public class LockAccountRequest : LockAccountBase
    {
        public string Reason { get; set; }
    }
}
