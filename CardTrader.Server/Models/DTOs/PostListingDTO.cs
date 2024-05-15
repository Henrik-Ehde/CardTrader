using Humanizer;

namespace CardTrader.Server.Models.DTOs
{
    public class PostListingDTO
    {
        public int CardId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string UserEmail { get; set; }
    }
}
