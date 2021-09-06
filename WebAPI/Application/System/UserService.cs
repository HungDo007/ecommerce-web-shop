using Application.ViewModels;
using AutoMapper;
using Data.Entities;
using Microsoft.AspNetCore.Identity;
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
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public UserService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IConfiguration config, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _mapper = mapper;
        }


        public async Task<string> Authenticate(LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (user == null)
                return null;

            var result = await _signInManager.PasswordSignInAsync(user, request.Password, request.Remember, true);
            if (!result.Succeeded)
                return null;


            //get Claim
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.GivenName,user.LastName),
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

        public async Task<List<string>> Register(RegisterRequest request)
        {
            List<string> errorList = new List<string>();

            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user != null)
                errorList.Add("Username is exists");

            if (await _userManager.FindByEmailAsync(request.Email) != null)
                errorList.Add("Email already in use");


            user = _mapper.Map<AppUser>(request);

            var result = await _userManager.CreateAsync(user, request.Password);
            await _userManager.AddToRoleAsync(user, SystemConstants.RoleUser);

            if (result.Succeeded)
                return null;
            else 
                return errorList;
        }
    }
}
