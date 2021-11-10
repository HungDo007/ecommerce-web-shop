using Application.ViewModels.Common;

namespace Application.ViewModels.System
{
    public class LockProductRequest : LockRequestBase
    {
        public int ProId { get; set; }
    }
}
