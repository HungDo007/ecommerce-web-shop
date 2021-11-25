using Application.Catalog;
using Application.ViewModels.Catalog;
using Application.ViewModels.Common;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class SalesController : ControllerBase
    {
        private readonly ISaleService _saleService;

        public SalesController(ISaleService saleService)
        {
            _saleService = saleService;
        }


        [HttpGet("cart")]
        public async Task<IActionResult> GetCart([FromQuery] PagingRequestBase request)
        {
            return Ok(await _saleService.GetCart(User.Identity.Name, request));
        }

        [HttpPost("AddCart")]
        public async Task<IActionResult> UpdateQuantity([FromBody] AddToCartRequest request)
        {
            if (await _saleService.AddToCart(User.Identity.Name, request))
                return Ok();

            return BadRequest();
        }


        [HttpPost("UpdateQuantity")]
        public async Task<IActionResult> UpdateQuantity([FromBody] UpdateQuantityRequest request)
        {
            if (await _saleService.UpdateQuantity(request))
                return Ok();

            return BadRequest();
        }

        [HttpPost("RemoveCart")]
        public async Task<IActionResult> DeleteCarts([FromBody] List<int> CartIds)
        {
            if (await _saleService.RemoveFromCart(CartIds))
                return Ok();

            return BadRequest();
        }


        [HttpPost("Order")]
        public async Task<IActionResult> OrderProduct([FromBody] OrderRequest request)
        {
            if (await _saleService.OrderProduct(User.Identity.Name, request))
                return Ok();

            return BadRequest();
        }

        [HttpDelete("Order/{orderId}")]
        public async Task<IActionResult> OrderProduct(int orderId)
        {
            if (await _saleService.CancelOrder(orderId))
                return Ok();

            return BadRequest();
        }
    }
}
