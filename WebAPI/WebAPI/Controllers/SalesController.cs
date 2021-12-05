using Application.Catalog;
using Application.ViewModels.Catalog;
using Application.ViewModels.Common;
using BraintreeHttp;
using Data.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PayPal.Core;
using PayPal.v1.Payments;
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

        private readonly string _clientId;
        private readonly string _secretKey;
        private readonly string _cancelUrl;
        private readonly string _returnUrl;
        private readonly int _substringToken;

        public SalesController(ISaleService saleService, IConfiguration config)
        {
            _saleService = saleService;
            _clientId = config["PaypalSettings:ClientId"];
            _secretKey = config["PaypalSettings:SecretKey"];
            _cancelUrl = config["PaypalSettings:CancelUrl"];
            _returnUrl = config["PaypalSettings:ReturnUrl"];
            _substringToken = int.Parse(config["PaypalSettings:SubstringToken"]);
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
        public async Task<IActionResult> OrderProduct([FromBody] List<OrderRequest> requests)
        {
            var carts = await _saleService.OrderProduct(User.Identity.Name, requests);
            if (carts.Count != 0)
                return Ok();

            return BadRequest();
        }


        [HttpPost("PaymentOrder")]
        public async Task<IActionResult> PaymentOrderProduct([FromBody] List<OrderRequest> requests)
        {
            var environment = new SandboxEnvironment(_clientId, _secretKey);
            var client = new PayPalHttpClient(environment);

            var carts = await _saleService.OrderProduct(User.Identity.Name, requests);
            if (carts.Count == 0)
                return BadRequest();

            #region Create Paypal Order
            var itemList = new ItemList()
            {
                Items = new List<Item>()
            };

            decimal total = 0;
            foreach (var cart in carts)
            {
                total += cart.CartVms.Sum(p => p.Price);
                foreach (var item in cart.CartVms)
                {
                    itemList.Items.Add(new Item()
                    {
                        Name = item.ToString(),
                        Currency = "USD",
                        Price = item.Price.ToString(),
                        Quantity = item.Quantity.ToString(),
                        Sku = "sku",
                        Tax = "0"
                    });
                }
            }
            #endregion

            var paypalOrderId = DateTime.Now.Ticks;

            var payment = new Payment()
            {
                Intent = "sale",
                Transactions = new List<Transaction>()
                {
                    new Transaction()
                    {
                        Amount = new Amount()
                        {
                            Total = total.ToString(),
                            Currency = "USD",
                            Details = new AmountDetails
                            {
                                Tax = "0",
                                Shipping = "0",
                                Subtotal = total.ToString()
                            }
                        },
                        ItemList = itemList,
                        Description = $"Invoice #{paypalOrderId}",
                        InvoiceNumber = paypalOrderId.ToString(),

                    }
                },
                RedirectUrls = new RedirectUrls()
                {
                    CancelUrl = _cancelUrl,
                    ReturnUrl = _returnUrl
                },
                Payer = new Payer()
                {
                    PaymentMethod = "paypal"
                }
            };

            PaymentCreateRequest request = new PaymentCreateRequest();
            request.RequestBody(payment);

            try
            {
                var response = await client.Execute(request);
                var statusCode = response.StatusCode;
                Payment result = response.Result<Payment>();

                var links = result.Links.GetEnumerator();
                string paypalRedirectUrl = null;
                while (links.MoveNext())
                {
                    LinkDescriptionObject lnk = links.Current;
                    if (lnk.Rel.ToLower().Trim().Equals("approval_url"))
                    {
                        //saving the payapalredirect URL to which user will be redirected for payment  
                        paypalRedirectUrl = lnk.Href;
                    }
                }

                string token = paypalRedirectUrl.Substring(_substringToken);

                //save token
                foreach (var item in carts)
                {
                    await _saleService.SaveToken(token, item.OrderId);
                }
                return Ok(paypalRedirectUrl);
            }
            catch (HttpException httpException)
            {
                var statusCode = httpException.StatusCode;
                var debugId = httpException.Headers.GetValues("PayPal-Debug-Id").FirstOrDefault();

                //Process when Checkout with Paypal fails
                return BadRequest(_cancelUrl);
            }
        }

        [HttpDelete("Order/{orderId}")]
        public async Task<IActionResult> OrderProduct(int orderId)
        {
            if (await _saleService.CancelOrder(orderId))
                return Ok();

            return BadRequest();
        }

        [HttpPost("CheckoutStatus")]
        public async Task<IActionResult> CheckoutStatus([FromBody] CheckoutStatusRequest request)
        {
            await _saleService.Checkout(request);
            return Ok();
        }

        [HttpGet("Order")]
        public async Task<IActionResult> GetOrder([FromQuery] PagingRequestBase request)
        {
            return Ok(await _saleService.GetOrder(User.Identity.Name, request));
        }
        [HttpGet("Order/{orderId}")]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            return Ok(await _saleService.GetOrderDetail(orderId));
        }


        [HttpGet("OrderInProcess")]
        public async Task<IActionResult> GetOrderInProcess([FromQuery] PagingRequestBase request)
        {
            return Ok(await _saleService.GetOrderOfSeller(User.Identity.Name, request, OrderStatus.InProgress));
        }


        [HttpGet("OrderAllOfSeller")]
        public async Task<IActionResult> GetOrderAllOfSeller([FromQuery] PagingRequestBase request)
        {
            return Ok(await _saleService.GetOrderOfSeller(User.Identity.Name, request, OrderStatus.GetAll));
        }

        [HttpPost("ConfirmOrder")]
        public async Task<IActionResult> ConfirmOrder([FromBody] int orderId)
        {
            await _saleService.ConfirmedOrder(orderId);
            return Ok();
        }
    }
}
