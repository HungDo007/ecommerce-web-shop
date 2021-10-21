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
    //[Authorize]
    public class StoresController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        private readonly IUserService _userService;

        public StoresController(IProductService productService, ICategoryService categoryService, IUserService userService)
        {
            _productService = productService;
            _categoryService = categoryService;
            _userService = userService;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Add([FromForm] ProductRequest request)
        {
            int res = await _productService.Add(request);
            return Ok(res);
        }

        [HttpPost("{id}/addDetail")]
        public async Task<IActionResult> AddComp(int id, [FromBody] List<ProductDetailRequest> requests)
        {
            if (await _productService.AddProDetail(id, requests))
                return Ok();
            return BadRequest();
        }

        [HttpPost("updatePro")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update([FromForm] ProductRequest request)
        {
            if (await _productService.Update(request))
                return Ok();
            return BadRequest();
        }

        [HttpPost("updateDetail")]
        public async Task<IActionResult> UpdateComp([FromBody] List<ProductDetailRequest> requests)
        {
            if (await _productService.UpdateProDetail(requests))
                return Ok();
            return BadRequest();
        }

        [HttpGet("compInCat/{catId}")]
        public async Task<IActionResult> CompInCat(int catId)
        {
            return Ok(await _categoryService.AllCompInCat(catId));
        }

        [HttpGet("storeInfo/{username}")]
        public async Task<IActionResult> StoreInfo(string username)
        {
            var res = await _userService.StoreInfo(username);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest();
        }

        [HttpPost("storeInfo")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateStoreInfo([FromForm] StoreRequest request)
        {
            if (await _userService.UpdateStoreInfo(request))
                return Ok();
            return BadRequest();
        }
    }
}
