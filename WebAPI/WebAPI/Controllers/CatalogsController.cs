using Application.Catalog;
using Application.ViewModels.Catalog;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;

        public CatalogsController(IProductService productService, ICategoryService categoryService)
        {
            _productService = productService;
            _categoryService = categoryService;
        }

        [HttpGet("product")]
        public async Task<IActionResult> GetAll([FromQuery] ProductPagingRequest request)
        {
            return Ok(await _productService.GetAll(request));
        }


        [HttpGet("product/{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            return Ok(await _productService.GetProductDetail(id));
        }


        [HttpGet("category")]
        public async Task<IActionResult> GetAllCat()
        {
            return Ok(await _categoryService.GetAll());
        }

        [HttpPost("addViewCount")]
        public async Task<IActionResult> AddViewCount([FromBody] int id)
        {
            await _productService.AddViewCount(id);
            return Ok();
        }

        [HttpGet("allProductOfUser/{username}")]
        public async Task<IActionResult> ProductOfUser(string username, [FromQuery] ProductPagingRequest request)
        {
            return Ok(await _productService.GetOfUser(username, request));
        }
    }
}
