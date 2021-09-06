using System;
using System.Threading.Tasks;
using Application.ViewModels;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Application.Common
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async Task<bool> ActiveMail(string toEmail)
        {


            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(toEmail));

            email.Subject = SystemConstants.ActiveMail;



            var builder = new BodyBuilder();
            builder.HtmlBody = $"Mã kích hoạt Email của bạn là: {GenerateCode()}";
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);

            return true;
        }

        private string GenerateCode()
        {
            Random rd = new Random();
            return rd.Next(100000, 999999).ToString();
        }
    }
}
