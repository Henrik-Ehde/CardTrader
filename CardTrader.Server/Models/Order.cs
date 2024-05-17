namespace CardTrader.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public User Buyer { get; set; }
        public string SellerId { get; set; }
        public User Seller { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public string Status { get; set; }
        public int Total { get; set; }
        public DateOnly Date { get; set; }

    }
}
