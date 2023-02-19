using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProductsAsync()
        {
            return Ok(await _repo.GetProductsAsync());
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductAsync(Guid id)
        {
            return await _repo.GetProductAsync(id);
        }
    }
}