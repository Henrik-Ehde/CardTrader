using Humanizer;

namespace CardTrader.Server.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public Order Order { get; set; }      
        public int CardId { get; set; }
        public Card Card { get; set; }
        public int Quantity { get; set; }
        public int SubTotal { get; set; }   
    }
}
