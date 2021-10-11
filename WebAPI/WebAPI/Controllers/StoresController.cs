using Application.Catalog;
using Application.ViewModels.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            await _productService.Add(request);
            return Ok();
        }

        [HttpGet("compInCat/{catId}")]
        public async Task<IActionResult> CompInCat(int catId)
        {
            return Ok(await _categoryService.AllCompInCat(catId));
        }
    }
}
