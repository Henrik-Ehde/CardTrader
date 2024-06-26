﻿using System;
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
        public async Task<IActionResult> PutListing(int id, PostListingDTO dto)
        {
            var listing = await _context.Listings.Include(x => x.Card).Include(x => x.User).FirstAsync(x => x.Id == id);

            if (id != listing.Id)
            {
                return BadRequest();
            }

            listing.CardId = dto.CardId;
            listing.Quantity = dto.Quantity;
            listing.Price = dto.Price;
            var User = await _context.Users.FirstAsync(x => x.Email == dto.UserEmail);
            listing.DatePosted = DateOnly.FromDateTime(DateTime.Now);

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
        public async Task<ActionResult<Listing>> PostListing(PostListingDTO dto)
        {
            var User = await _context.Users.FirstAsync(x => x.Email == dto.UserEmail);

            Listing listing = new Listing();
            listing.CardId = dto.CardId;
            listing.Quantity = dto.Quantity;
            listing.Price = dto.Price;
            listing.UserId = User.Id;
            listing.DatePosted = DateOnly.FromDateTime(DateTime.Now);

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
