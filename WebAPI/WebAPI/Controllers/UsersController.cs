using Application;
using Application.Common;
using Application.System;
using Application.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        
        public UsersController(IUserService userService, IMailService mailService)
        {
            _userService = userService;            
        }

        [HttpPost("authenticate")]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody] LoginRequest request)
        {
            var result = await _userService.Authenticate(request);

            if (string.IsNullOrEmpty(result))
                return BadRequest("Tên đăng nhập hoặc mật khẩu không chính xác.");

            return Ok(result);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _userService.Register(request);

            if (result == null)
                return Ok();
            else
                return BadRequest(result);
        }

        
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] UserUpdateRequest request)
        {
            string username = User.Identity.Name;
            if (User.IsInRole(SystemConstants.RoleAdmin) || username == request.Username)
            {
                if (await _userService.Update(request.Username, request))
                {
                    return Ok();
                }
                return BadRequest();
            }
            return BadRequest("Bạn không có quyền chỉnh sửa thông tin cho tài khoản người khác.");
        }



        [HttpPost("changeMail")]
        public async Task<IActionResult> ChangeEmail([FromBody] MailRequest request)
        {
            string name = User.Identity.Name;
            if (User.IsInRole(SystemConstants.RoleAdmin) || name == request.Username)
            {
                if (await _userService.ChangeEmail(request.Username, request.Email))
                {
                    return Ok();
                }
                return BadRequest();
            }
            return BadRequest("Bạn không có quyền chỉnh sửa thông tin cho tài khoản người khác.");
        }

        [HttpGet]
        public async Task<IActionResult> GetByName(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest();

            UserResponse user = await _userService.GetByName(username);
            return Ok(user);
        }

        [HttpPost("sendCode")]
        public async Task<IActionResult> ActiveMail([FromBody]MailRequest request)
        {
            string name = User.Identity.Name;
            if (request.Username == name)
            {
                await _userService.ActiveMail(request.Email);
                return Ok();
            }
            return BadRequest("Bạn không có quyền chỉnh sửa thông tin cho tài khoản người khác.");
        }
    }
}
