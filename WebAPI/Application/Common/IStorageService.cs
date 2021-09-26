using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Application.Common
{
    public interface IStorageService
    {
        string GetFileUrl(bool categoryImg, string fileName);
        Task<string> SaveFile(bool categoryImg, IFormFile file);
        Task DeleteFileAsync(bool categoryImg, string fileName);
    }
}
