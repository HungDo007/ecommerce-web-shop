using Application.Common;
using Application.ViewModels.Common;
using Application.ViewModels.System;
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
using System.Linq;
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
        private readonly IStorageService _storageService;

        public UserService(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IConfiguration config,
            IMapper mapper,
            IMailService mailService,
            EShopContext context,
            IStorageService storageService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _mapper = mapper;
            _mailService = mailService;
            _context = context;
            _storageService = storageService;
        }


        public async Task ActiveMail(string email)
        {
            string code = GenerateCode();

            SendMailRequest mailRequest = new SendMailRequest();
            mailRequest.Subject = SystemConstants.ActiveMail;
            mailRequest.ToEmail = email;
            mailRequest.Body = $"Mã xác thực của bạn là:\n {code}";

            await _mailService.SendMail(mailRequest);

            UserActiveEmail uae = await _context.UserActiveEmails.FindAsync(email);
            if (uae == null)
            {
                uae = new UserActiveEmail()
                {
                    Code = code,
                    Email = email
                };
                _context.UserActiveEmails.Add(uae);
            }
            else
            {
                uae.Code = code;
            }

            await _context.SaveChangesAsync();
        }

        public async Task<string> Authenticate(LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(request.Username) != null ? await _userManager.FindByEmailAsync(request.Username) : null;
            }

            if (user == null || user.Status == false)
                return null;

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
                Subject = new ClaimsIdentity(claims),
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

            if ((await _userManager.UpdateAsync(user)).Succeeded)
                return true;
            return false;
        }


        public async Task<PagedResult<UserResponse>> GetAdminPaging(UserPagingRequest request)
        {
            var query = await _userManager.GetUsersInRoleAsync(SystemConstants.RoleAdmin);

            //Filter
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.UserName.Contains(request.Keyword)).ToList();
            }

            //Paging
            int totalRow = query.Count();
            var data = query.Where(x => x.Status == true)
                .Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();


            List<UserResponse> responses = _mapper.Map<List<UserResponse>>(data);

            //Select and projection
            var pagedResult = new PagedResult<UserResponse>()
            {
                TotalRecords = totalRow,
                PageIndex = request.PageIndex,
                PageSize = request.PageSize,
                Items = responses
            };
            return pagedResult;
        }


        public async Task<PagedResult<UserResponse>> GetUserLockedPaging(UserPagingRequest request)
        {
            var query = await _userManager.GetUsersInRoleAsync(SystemConstants.RoleUser);

            //Filter
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.UserName.Contains(request.Keyword)).ToList();
            }

            //Paging
            int totalRow = query.Count();
            var data = query.Where(x => x.Status == false)
                .Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();


            List<UserResponse> responses = _mapper.Map<List<UserResponse>>(data);

            //Select and projection
            var pagedResult = new PagedResult<UserResponse>()
            {
                TotalRecords = totalRow,
                PageIndex = request.PageIndex,
                PageSize = request.PageSize,
                Items = responses
            };
            return pagedResult;
        }

        public async Task<UserResponse> GetByName(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null || user.Status == false)
                return null;

            UserResponse res = _mapper.Map<UserResponse>(user);
            res.Role = (await _userManager.GetRolesAsync(user))[0];
            return res;
        }

        public async Task<PagedResult<UserResponse>> GetUserPaging(UserPagingRequest request)
        {
            var query = await _userManager.GetUsersInRoleAsync(SystemConstants.RoleUser);

            //Filter
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.UserName.Contains(request.Keyword)).ToList();
            }

            //Paging
            int totalRow = query.Count();
            var data = query.Where(x => x.Status == true)
                .Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();


            List<UserResponse> responses = _mapper.Map<List<UserResponse>>(data);

            //Select and projection
            var pagedResult = new PagedResult<UserResponse>()
            {
                TotalRecords = totalRow,
                PageIndex = request.PageIndex,
                PageSize = request.PageSize,
                Items = responses
            };
            return pagedResult;
        }

        public async Task<bool> LockAccount(LockAccountRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);

            if (user == null)
                return false;

            user.Status = false;

            SendMailRequest mailRequest = new SendMailRequest();
            mailRequest.Subject = SystemConstants.LockAccount;
            mailRequest.ToEmail = user.Email;
            mailRequest.Body = $"Tài khoản của bạn đã bị khóa vì: {request.Reason} <br/> Vui lòng liên hệ quản trị viên để làm việc và lấy lại tài khoản!!!";

            await _mailService.SendMail(mailRequest);

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return true;
            return false;
        }


        public async Task<bool> UnlockAccount(UnlockAccountRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);

            if (user == null)
                return false;

            user.Status = true;

            SendMailRequest mailRequest = new SendMailRequest();
            mailRequest.Subject = SystemConstants.UnlockAccount;
            mailRequest.ToEmail = user.Email;
            mailRequest.Body = $"Tài khoản của bạn đã được mở khóa trở lại.";

            await _mailService.SendMail(mailRequest);

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return true;
            return false;
        }

        public async Task<List<string>> Register(RegisterRequest request, bool IsAdmin)
        {
            List<string> errorList = new List<string>();

            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user != null)
                errorList.Add("Username already used");

            if (await _userManager.FindByEmailAsync(request.Email) != null)
                errorList.Add("Email already used");


            user = _mapper.Map<AppUser>(request);

            var result = await _userManager.CreateAsync(user, request.Password);
            if (IsAdmin)
                await _userManager.AddToRoleAsync(user, SystemConstants.RoleAdmin);
            else
                await _userManager.AddToRoleAsync(user, SystemConstants.RoleUser);

            if (result.Succeeded)
                return null;
            else
                return errorList;
        }

        public async Task<StoreVm> StoreInfo(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (!user.EmailConfirmed)
                return null;

            StoreVm storeVm = new StoreVm();
            var store = await _context.Stores.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();

            storeVm.NameStore = store.Name;
            storeVm.Address = store.Address;
            storeVm.Description = store.Description;
            storeVm.PhoneNumber = store.PhoneNumber;
            storeVm.Avatar = store.Avatar;

            storeVm.TotalProduct = _context.Products.Where(x => x.UserId == user.Id).Count();
            if (storeVm.TotalProduct == 0)
                storeVm.Rate = 0;
            else
                storeVm.Rate = Math.Round((_context.Products.Where(x => x.UserId == user.Id).Sum(x => x.Rate) / storeVm.TotalProduct), 1);

            return storeVm;
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
            try
            {
                user.Avatar = await _storageService.SaveFile(SystemConstants.FolderAvatar, request.Avatar);
            }
            catch { }

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return true;
            return false;
        }

        public async Task<bool> UpdateStoreInfo(StoreRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            var store = await _context.Stores.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();

            store.Name = request.NameStore;
            store.Description = request.Description;
            store.Address = request.Address;
            store.PhoneNumber = request.PhoneNumber;
            try
            {
                store.Avatar = await _storageService.SaveFile(SystemConstants.FolderAvatar, request.Avatar);
            }
            catch { }
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> VerifyEmail(string email, string code)
        {
            var check = await _context.UserActiveEmails.FindAsync(email);
            var user = await _userManager.FindByEmailAsync(email);
            if (check.Code == code)
            {
                user.EmailConfirmed = true;
                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    Store store = new Store();
                    store.UserId = user.Id;
                    _context.Stores.Add(store);
                    await _context.SaveChangesAsync();
                    return true;
                }
            }
            return false;
        }

        private string GenerateCode()
        {
            Random rd = new Random();
            return rd.Next(100000, 999999).ToString();
        }
    }
}
