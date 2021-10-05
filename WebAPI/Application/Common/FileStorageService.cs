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


        public async Task<string> SaveFile(bool categoryImg, IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await SaveFileAsync(categoryImg, file.OpenReadStream(), fileName);


            if (categoryImg)
            {
                return "/" + SystemConstants.FolderCategory + "/" + fileName;
            }
            else
            {
                return "/" + SystemConstants.FolderProduct + "/" + fileName;
            }
        }


        public string GetFileUrl(bool categoryImg, string fileName)
        {
            if (categoryImg)
            {
                return $"/{Path.Combine(_folder, SystemConstants.FolderCategory)}/{fileName}";
            }
            else
            {
                return $"/{Path.Combine(_folder, SystemConstants.FolderProduct)}/{fileName}";
            }
        }



        public async Task DeleteFileAsync(bool categoryImg, string fileName)
        {
            //string filePath = "";
            //fileName = fileName.Replace("/","\\")
            //if (categoryImg)
            //{
            //    filePath = Path.Combine(Path.Combine(_folder, SystemConstants.FolderCategory), fileName);
            //}
            //else
            //{
            //    filePath = Path.Combine(Path.Combine(_folder, SystemConstants.FolderProduct), fileName);
            //}
            fileName = fileName.Replace("/", "\\");
            string filePath = _folder + fileName;

            if (File.Exists(filePath))
            {
                await Task.Run(() => File.Delete(filePath));
            }
        }


        private async Task SaveFileAsync(bool categoryImg, Stream mediaBinaryStream, string fileName)
        {
            string filePath = "";
            if (categoryImg)
            {
                filePath = Path.Combine(Path.Combine(_folder, SystemConstants.FolderCategory), fileName);
            }
            else
            {
                filePath = Path.Combine(Path.Combine(_folder, SystemConstants.FolderProduct), fileName);
            }
            using var output = new FileStream(filePath, FileMode.Create);
            await mediaBinaryStream.CopyToAsync(output);
        }
    }
}
