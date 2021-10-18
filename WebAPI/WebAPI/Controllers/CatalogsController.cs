using Application.Catalog;
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
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _productService.GetAll());
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
    }
}
