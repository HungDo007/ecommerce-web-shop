using Application.Catalog;
using Application.ViewModels.Catalog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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


        [HttpGet("category")]
        public async Task<IActionResult> GetAllCat()
        {            
            return Ok(await _categoryService.GetAll());
        }
    }
}
