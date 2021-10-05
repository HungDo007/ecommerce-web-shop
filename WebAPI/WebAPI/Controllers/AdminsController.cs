﻿using Application;
using Application.Catalog;
using Application.System;
using Application.ViewModels.Catalog;
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
        private readonly IComponentService _componentService;

        public AdminsController(IUserService userService,
            ICategoryService categoryService,
            IComponentService componentService)
        {
            _userService = userService;
            _categoryService = categoryService;
            _componentService = componentService;
        }


        //--------------------------------------------------------------------------------------
        #region User
        [HttpGet("user/allAdmin")]
        public async Task<IActionResult> GetAllAdmin()
        {
            List<UserResponse> res = await _userService.GetAllAdmin();
            return Ok(res);
        }


        [HttpGet("user/allUser")]
        public async Task<IActionResult> GetAllUser()
        {
            List<UserResponse> res = await _userService.GetAllUser();
            return Ok(res);
        }


        [HttpGet("user/allUserLocked")]
        public async Task<IActionResult> GetAllUserLocked()
        {
            List<UserResponse> res = await _userService.GetAllUserLocked();
            return Ok(res);
        }


        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetByName(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest();

            UserResponse user = await _userService.GetByName(username);
            return Ok(user);
        }


        [HttpPost("user/addAdmin")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _userService.Register(request, true);

            if (result == null)
                return Ok();
            else
                return BadRequest(result);
        }


        [HttpPost("user/lockAccount")]
        public async Task<IActionResult> LockAccount([FromBody] LockAccountRequest request)
        {
            var res = await _userService.LockAccount(request);
            if (res)
                return Ok();
            return BadRequest();
        }

        //[HttpGet("user/paging")]
        //public async Task<IActionResult> GetUserPaging([FromQuery] UserPagingRequest request)
        //{
        //    PagedResult<UserResponse> result = await _userService.GetUserPaging(request);
        //    return Ok(result);
        //}
        #endregion


        //--------------------------------------------------------------------------------------
        #region Category
        [HttpPost("category/add")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddCategoryForm([FromForm] CategoryRequest request)
        {
            if (await _categoryService.AddCat(request))
                return Ok();
            else
                return BadRequest("Category is exists");
        }

        [HttpPost("category/update")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateCategory([FromForm] CategoryRequest request)
        {
            if (await _categoryService.UpdateCat(request))
                return Ok();
            else
                return BadRequest("Category name is exists.");
        }


        [HttpDelete("category/delete/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (await _categoryService.DeleteCat(id))
                return Ok();
            return BadRequest();
        }

        [HttpPost("category/assignComp")]
        public async Task<IActionResult> AssignCompToCat(AssignCompToCatRequest request)
        {
            if (await _categoryService.AssignCompToCat(request))
            {
                return Ok();
            }
            return BadRequest();
        }
        #endregion


        //--------------------------------------------------------------------------------------
        #region Component
        [HttpPost("component/add")]
        public async Task<IActionResult> AddComponent(ComponentRequest request)
        {
            int res = await _componentService.Add(request);
            if (res != 0)
                return Ok(res);
            return BadRequest("Component is exists.");
        }


        [HttpPost("component/update")]
        public async Task<IActionResult> UpdateComponent(ComponentRequest request)
        {
            if (await _componentService.Update(request))
                return Ok();
            return BadRequest("Component is exists.");
        }


        [HttpGet("component")]
        public async Task<IActionResult> GetAllComp()
        {
            return Ok(await _componentService.GetAllComponent());
        }


        [HttpDelete("component/{id}")]
        public async Task<IActionResult> DeleteComp(int id)
        {
            if (await _componentService.Delete(id))
                return Ok();
            return BadRequest();
        }
        #endregion
    }
}
