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

namespace CardTrader.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Users/5
        [HttpGet("{name}")]
        [Produces("application/json")]
        public async Task<ActionResult<User>> GetUser(string name)
        {
            var email = name + "@cardtrader.com";
            var user = await _context.Users.
                Include(u => u.BuyOrders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.Card).
                Include(u => u.SellOrders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.Card).
                Include(u => u.Listings).ThenInclude(l => l.Card).
                FirstAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

 
        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
