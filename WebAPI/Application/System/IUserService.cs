using Application.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.System
{
    public interface IUserService
    {
        Task<string> Authenticate(LoginRequest request);
        Task<List<string>> Register(RegisterRequest request);
    }
}
