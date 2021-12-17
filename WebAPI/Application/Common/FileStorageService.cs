using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Application.Common
{
    public class FileStorageService : IStorageService
    {
        private readonly string _folder;

        public FileStorageService(IWebHostEnvironment webHostEnvironment)
        {
            //  _folder = Path.Combine(webHostEnvironment.WebRootPath, USER_CONTENT_FOLDER_NAME);
            _folder = webHostEnvironment.WebRootPath;
        }


        public async Task<string> SaveFile(string folderType, IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await SaveFileAsync(folderType, file.OpenReadStream(), fileName);

            return "/" + folderType + "/" + fileName;
        }


        public string GetFileUrl(string folderType, string fileName)
        {
            return $"/{Path.Combine(_folder, folderType)}/{fileName}";
        }



        public async Task DeleteFileAsync(string fileName)
        {
            fileName = fileName.Replace("/", "\\");
            string filePath = _folder + fileName;

            if (File.Exists(filePath))
            {
                await Task.Run(() => File.Delete(filePath));
            }
        }


        private async Task SaveFileAsync(string folderType, Stream mediaBinaryStream, string fileName)
        {
            string filePath = Path.Combine(Path.Combine(_folder, folderType), fileName);
            using var output = new FileStream(filePath, FileMode.Create);
            await mediaBinaryStream.CopyToAsync(output);
        }
    }
}
