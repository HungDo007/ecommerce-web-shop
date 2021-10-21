using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Application.Common
{
    public interface IStorageService
    {
        string GetFileUrl(string folderType, string fileName);
        Task<string> SaveFile(string folderType, IFormFile file);
        Task DeleteFileAsync(string fileName);
    }
}
