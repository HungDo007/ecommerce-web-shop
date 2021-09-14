using Application;
using Application.Common;
using Application.System;
using Application.ViewModels.System;
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
        
        public UsersController(IUserService userService)
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
            var result = await _userService.Register(request, false);

            if (result == null)
                return Ok();
            else
                return BadRequest(result);
        }

        
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] UserUpdateRequest request)
        {
            string username = User.Identity.Name;
            if (username == request.Username)
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
            if (name == request.Username)
            {
                if (await _userService.ChangeEmail(request.Username, request.Email))
                {
                    return Ok();
                }
                return BadRequest();
            }
            return BadRequest("Bạn không có quyền chỉnh sửa thông tin cho tài khoản người khác.");
        }
        
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail([FromBody] MailRequest request)
        {
            string name = User.Identity.Name;
            if (name == request.Username)
            {
                if (await _userService.VerifyEmail(request.Email, request.Code))
                {
                    return Ok();
                }
                return BadRequest("Mã nhập không đúng");
            }
            return BadRequest("Bạn không có quyền chỉnh sửa thông tin cho tài khoản người khác.");
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
