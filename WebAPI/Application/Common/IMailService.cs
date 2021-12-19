using Application.ViewModels.Common;
using System.Threading.Tasks;

namespace Application.Common
{
    public interface IMailService
    {
        /// <summary>
        /// Send email with information in param.
        /// </summary>
        /// <param name="mailRequest"></param>
        /// <returns></returns>
        Task<string> SendMail(SendMailRequest mailRequest);
    }
}
