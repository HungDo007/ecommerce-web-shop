using Application;
using Application.System;
using Application.ViewModels.Common;
using Application.ViewModels.System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = SystemConstants.RoleAdmin)]
    public class AdminsController : ControllerBase
    {
        private readonly IUserService _userService;

        public AdminsController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("addAdmin")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _userService.Register(request, true);

            if (result == null)
                return Ok();
            else
                return BadRequest(result);
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetByName(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest();

            UserResponse user = await _userService.GetByName(username);
            return Ok(user);
        }


        [HttpGet("user/paging")]
        public async Task<IActionResult> GetUserPaging([FromQuery] UserPagingRequest request)
        {
            PagedResult<UserResponse> result = await _userService.GetUserPaging(request);
            return Ok(result);
        }

        [HttpGet("allUser")]
        public async Task<IActionResult> GetAllUser()
        {
            List<UserResponse> res = await _userService.GetAll();
            return Ok(res);
        }
    }
}
