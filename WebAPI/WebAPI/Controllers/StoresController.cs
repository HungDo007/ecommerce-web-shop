using Application.Catalog;
using Application.ViewModels.Catalog;
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

        public StoresController(IProductService productService, ICategoryService categoryService)
        {
            _productService = productService;
            _categoryService = categoryService;
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


        [HttpGet("compInCat/{catId}")]
        public async Task<IActionResult> CompInCat(int catId)
        {
            return Ok(await _categoryService.AllCompInCat(catId));
        }
    }
}
