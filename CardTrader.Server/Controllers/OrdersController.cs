using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CardTrader.Server.Data;
using CardTrader.Server.Models;
using CardTrader.Server.Models.DTOs;
using NuGet.Protocol;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace CardTrader.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(o => o.OrderItems).ThenInclude(l => l.Card).ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.
                Include(o => o.OrderItems).ThenInclude(i => i.Card).
                FirstAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(PostOrderDTO dto)
        {
            var seller = await _context.Users.FirstAsync(x => x.Email == dto.SellerEmail);
            var buyer = await _context.Users.FirstAsync(x => x.Email == dto.BuyerEmail);
            Console.Write(dto.Items.ToJson());

            Order order = new Order();

            foreach (OrderItemDTO i in dto.Items)
            {
                OrderItem item = new OrderItem();
                item.CardId = i.CardId;
                item.Quantity = i.Quantity;
                item.SubTotal = i.SubTotal;
                item.Order = order;
                _context.OrderItems.Add(item);

                Listing listing = await _context.Listings.FirstAsync(x => x.Id == i.ListingId);
                listing.Quantity -= item.Quantity;
                if (listing.Quantity < 1) _context.Remove(listing);
                else _context.Entry(listing).State = EntityState.Modified;
            }

            order.Status = dto.Status;
            order.Total = dto.Total;
            order.BuyerId = buyer.Id;
            order.SellerId = seller.Id;
            order.Date = DateOnly.FromDateTime(DateTime.Now);

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
