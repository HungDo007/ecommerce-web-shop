using System.Threading.Tasks;

namespace Application.Common
{
    public interface IMailService
    {
        Task<bool> ActiveMail(string toEmail);
    }
}
