using Application;
using Application.Catalog;
using Application.System;
using Application.ViewModels.Catalog;
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
        private readonly ICategoryService _categoryService;

        public AdminsController(IUserService userService, ICategoryService categoryService)
        {
            _userService = userService;
            _categoryService = categoryService;
        }


        [HttpGet("allUser")]
        public async Task<IActionResult> GetAllUser()
        {
            List<UserResponse> res = await _userService.GetAll();
            return Ok(res);
        }


        [HttpGet("{username}")]
        public async Task<IActionResult> GetByName(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest();

            UserResponse user = await _userService.GetByName(username);
            return Ok(user);
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

        
        [HttpGet("user/paging")]
        public async Task<IActionResult> GetUserPaging([FromQuery] UserPagingRequest request)
        {
            PagedResult<UserResponse> result = await _userService.GetUserPaging(request);
            return Ok(result);
        }

        

        [HttpPost("category")]
        public async Task<IActionResult> AddCategory([FromBody] CategoryVm request)
        {
            if (await _categoryService.AddCat(request))
                return Ok();
            else
                return BadRequest("Category is exists");
        }

        [HttpPost("category/update")]
        public async Task<IActionResult> UpdateCategory([FromBody] CategoryVm request)
        {
            if (await _categoryService.UpdateCat(request))
                return Ok();
            else
                return BadRequest("Cats");
        }
    }
}
