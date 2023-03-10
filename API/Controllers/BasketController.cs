using Core.DTO;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null)
            {
                return NotFound();
            }

            return MapBasketToDto(basket);
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(Guid productId, int quantity)
        {
            // Obtenemos el basket si existe
            var basket = await RetrieveBasket();

            // Creamos el basket si no existe
            if (basket == null)
            {
                basket = await CreateBasket();
            }
            // Obtener el product
            var product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return NotFound();
            }
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            }
            return BadRequest(new ProblemDetails { Title = "Problem saving item into basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(Guid productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null)
            {
                return NotFound();
            }
            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
        }

        private async Task<Basket> RetrieveBasket()
        {
            // Incluimos la informacion del basket, la cual tiene relacion con los items y a su vez con los productos
            return await _context.Baskets.Include(item => item.Items).ThenInclude(p => p.Product).FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);
        }

        private async Task<Basket> CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(30),
                IsEssential = true
            };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket
            {
                BuyerId = buyerId
            };

            await _context.Baskets.AddAsync(basket);
            return basket;
        }
    }
}