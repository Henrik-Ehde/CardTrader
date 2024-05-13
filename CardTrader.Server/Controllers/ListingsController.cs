﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CardTrader.Server.Data;
using CardTrader.Server.Models;

namespace CardTrader.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ListingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Listings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Listing>>> GetListings()
        {
            return await _context.Listings.Include(x => x.Card).Include(x => x.User).ToListAsync();
        }

        // GET: api/Listings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Listing>> GetListing(int id)
        {
            var listing = await _context.Listings.Include(x => x.Card).Include(x => x.User).FirstAsync(x => x.Id == id);

            if (listing == null)
            {
                return NotFound();
            }

            return listing;
        }

        // PUT: api/Listings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListing(int id, Listing listing)
        {
            if (id != listing.Id)
            {
                return BadRequest();
            }

            _context.Entry(listing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingExists(id))
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

        // POST: api/Listings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Listing>> PostListing(int cardId, int quantity, decimal price, string userId, DateOnly datePosted)
        {
            //var card = await _context.Cards.FirstOrDefaultAsync(c => c.Id == listing.CardId);
            //if (card == null)
            //{
            //    return BadRequest();
            //}
            //listing.Card = card;

            Listing listing = new Listing();
            listing.CardId = cardId;
            listing.Quantity = quantity;
            listing.Price = price;
            listing.UserId = userId;
            listing.DatePosted = datePosted;

            _context.Listings.Add(listing);
            await _context.SaveChangesAsync();
            listing = await _context.Listings.Include(x => x.Card).Include(x => x.User).FirstAsync(t => t.Id == listing.Id);

            return CreatedAtAction("GetListing", new { id = listing.Id }, listing);
        }

        // DELETE: api/Listings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListing(int id)
        {
            var listing = await _context.Listings.FindAsync(id);
            if (listing == null)
            {
                return NotFound();
            }

            _context.Listings.Remove(listing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListingExists(int id)
        {
            return _context.Listings.Any(e => e.Id == id);
        }
    }
}