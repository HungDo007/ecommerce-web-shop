using Application.Common;
using Application.ViewModels;
using AutoMapper;
using Data.EF;
using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.System
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        private readonly EShopContext _context;

        public UserService(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IConfiguration config,
            IMapper mapper,
            IMailService mailService,
            EShopContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _mapper = mapper;
            _mailService = mailService;
            _context = context;
        }


        public async Task ActiveMail(string email)
        {
            string code = GenerateCode();

            SendMailRequest mailRequest = new SendMailRequest();
            mailRequest.Subject = SystemConstants.ActiveMail;
            mailRequest.ToEmail = email;
            mailRequest.Body = $"Mã xác thực của bạn là: {code}";

            await _mailService.SendMail(mailRequest);

            UserActiveEmail uae = new UserActiveEmail() 
            { 
                Email = email,
                Code = code 
            };
            _context.UserActiveEmails.Add(uae);
            await _context.SaveChangesAsync();
        }


        public async Task<string> Authenticate(LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(request.Username) != null ? await _userManager.FindByEmailAsync(request.Username) : null;
            }

            var result = await _signInManager.PasswordSignInAsync(user, request.Password, request.Remember, true);
            if (!result.Succeeded)
                return null;


            //get Claim
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.UserName)
            };
            foreach (var i in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, i));
            }


            //create token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity((claims)),
                Expires = DateTime.Now.AddMonths(2),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }


        public async Task<bool> ChangeEmail(string username, string email)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName != username && x.Email == email))
                return false;

            var user = await _userManager.FindByNameAsync(username);
            user.Email = email;
            user.EmailConfirmed = false;
            if ((await _userManager.UpdateAsync(user)).Succeeded)
                return true;
            return false;
        }

        public async Task<UserResponse> GetByName(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
                return null;

            UserResponse res = _mapper.Map<UserResponse>(user);
            res.Role = (await _userManager.GetRolesAsync(user))[0];
            return res;
        }

        public Task<List<UserResponse>> GetUserPaging()
        {
            throw new NotImplementedException();
        }

        public async Task<List<string>> Register(RegisterRequest request)
        {
            List<string> errorList = new List<string>();

            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user != null)
                errorList.Add("Username đã được sử dụng");

            if (await _userManager.FindByEmailAsync(request.Email) != null)
                errorList.Add("Email đã được sử dụng");


            user = _mapper.Map<AppUser>(request);

            var result = await _userManager.CreateAsync(user, request.Password);
            await _userManager.AddToRoleAsync(user, SystemConstants.RoleUser);

            if (result.Succeeded)
                return null;
            else
                return errorList;
        }


        public async Task<bool> Update(string username, UserUpdateRequest request)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
                return false;

            user.Address = request.Address;
            user.PhoneNumber = request.PhoneNumber;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Dob = request.Dob;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return true;
            return false;
        }


        private string GenerateCode()
        {
            Random rd = new Random();
            return rd.Next(100000, 999999).ToString();
        }
    }
}
