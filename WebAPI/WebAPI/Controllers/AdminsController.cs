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
        private readonly IComponentService _componentService;
        private readonly IProductService _productService;

        public AdminsController(IUserService userService,
            ICategoryService categoryService,
            IComponentService componentService,
            IProductService productService)
        {
            _userService = userService;
            _categoryService = categoryService;
            _componentService = componentService;
            _productService = productService;
        }


        //--------------------------------------------------------------------------------------
        #region User
        [HttpGet("user/adminPaging")]
        public async Task<IActionResult> GetAllAdmin([FromQuery] UserPagingRequest request)
        {
            PagedResult<UserResponse> res = await _userService.GetAdminPaging(request);
            return Ok(res);
        }


        [HttpGet("user/userPaging")]
        public async Task<IActionResult> GetAllUser([FromQuery] UserPagingRequest request)
        {
            PagedResult<UserResponse> res = await _userService.GetUserPaging(request);
            return Ok(res);
        }


        [HttpGet("user/userLockedPaging")]
        public async Task<IActionResult> GetAllUserLocked([FromQuery] UserPagingRequest request)
        {
            PagedResult<UserResponse> res = await _userService.GetUserLockedPaging(request);
            return Ok(res);
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

        [HttpPost("user/unlockAccount")]
        public async Task<IActionResult> UnLockAccount([FromBody] UnlockAccountRequest request)
        {
            var res = await _userService.UnlockAccount(request);
            if (res)
                return Ok();
            return BadRequest();
        }

        #endregion


        //--------------------------------------------------------------------------------------
        #region Category
        [HttpGet("category/comp/{id}")]
        public async Task<IActionResult> CompInCat(int id)
        {
            return Ok(await _categoryService.AllCompInCatAdmin(id));
        }


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
            if (await _componentService.Add(request))
                return Ok(1);
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



        //--------------------------------------------------------------------------------------
        #region Product
        [HttpGet("product/productAll")]
        public async Task<IActionResult> GetProductAll([FromQuery] ProductPagingRequest request)
        {
            return Ok(await _productService.GetAdminAll(request));
        }


        [HttpGet("product/productLocked")]
        public async Task<IActionResult> GetProductLocked([FromQuery] ProductPagingRequest request)
        {
            return Ok(await _productService.GetLocked(request));
        }


        [HttpPost("product/lockProduct")]
        public async Task<IActionResult> LockAccount([FromBody] LockProductRequest request)
        {
            if (await _userService.AdminDeleteProduct(request.ProId, request.Reason))
                return Ok();
            return BadRequest();
        }


        [HttpPost("product/unlockProduct")]
        public async Task<IActionResult> UnLockAccount([FromBody] int ProId)
        {
            if (await _userService.AdminUnDeleteProduct(ProId))
                return Ok();
            return BadRequest();
        }
        #endregion
    }
}
