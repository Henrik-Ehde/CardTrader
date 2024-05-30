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
    public class CardsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        //GET: Cards
       //[HttpGet]
       // public async Task<ActionResult<IEnumerable<Card>>> GetCards()
       // {
       //     return await _context.Cards.Include(c => c.Listings).ThenInclude(l => l.User).ToListAsync();
       // }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardDTO>>> GetCardDTOs()
        {
            List<CardDTO> DTOList = new List<CardDTO>();;
            var cards = await _context.Cards.
                Include(c => c.Listings).
                /*ThenInclude(l => l.User).*/
                //IgnoreAutoIncludes().
                ToListAsync();

            foreach (Card card in cards)
            {
                DTOList.Add(new CardDTO()
                {
                    Id = card.Id,
                    Title = card.Title,
                    Text = card.Text,
                    Listings = card.Listings,
                    NumberOfListings = card.Listings.Count,
                    NumberOfCards = card.Listings.Sum(l => l.Quantity),
                    BestPrice = card.Listings.Select(l => l.Price).DefaultIfEmpty().Min(),
                    
                }) ;
            }

            return Ok(DTOList);
        }

        // GET: Cards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCard(int id)
        {
            var card = await _context.Cards.Include(c => c.Listings).ThenInclude(l => l.User).FirstAsync(c => c.Id == id);

            if (card == null)
            {
                return NotFound();
            }

            card.Listings = card.Listings.OrderBy(l => l.Price).ToList();

            return card;
        }

        // PUT: api/Cards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCard(int id, PostCardDTO dto)
        {
            var card = await _context.Cards.Include(c => c.Listings).ThenInclude(l => l.User).FirstAsync(c => c.Id == id);

            if (id != card.Id)
            {
                return BadRequest();
            }

            card.Title = dto.Title;
            card.Text = dto.Text;

            _context.Entry(card).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardExists(id))
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

        // POST: api/Cards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Card>> PostCard(PostCardDTO dto)
        {
            Card card = new Card
            {
                Title = dto.Title,
                Text = dto.Text
            };
            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCard", new { id = card.Id }, card);
        }

        // DELETE: api/Cards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CardExists(int id)
        {
            return _context.Cards.Any(e => e.Id == id);
        }
    }
}
