﻿namespace CardTrader.Server.Models
{
    public class Listing
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public DateOnly DatePosted {  get; set; }
    }
}
