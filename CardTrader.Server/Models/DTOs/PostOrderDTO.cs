namespace CardTrader.Server.Models.DTOs
{
    public class PostOrderDTO
    {
        public string BuyerEmail { get; set; }
        public string SellerEmail { get; set; }
        public string Status { get; set; }
        public int Total { get; set; }
        public List<OrderItemDTO> Items { get; set; }
    }
}
