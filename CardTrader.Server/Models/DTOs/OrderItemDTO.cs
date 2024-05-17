namespace CardTrader.Server.Models.DTOs
{
    public class OrderItemDTO
    {
        public int CardId { get; set; }
        public int ListingId { get; set; }
        public int Quantity { get; set; }
        public int SubTotal { get; set; }
    }
}
