namespace CardTrader.Server.Models
{
    public class Listing
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public virtual Card Card { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public DateOnly DatePosted {  get; set; }
    }
}
