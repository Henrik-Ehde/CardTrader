namespace CardTrader.Server.Models
{
    public class CardDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public List<Listing> Listings { get; set; }
        public int NumberOfListings { get; set; }
        public int NumberOfCards { get; set; }
        public decimal BestPrice { get; set; }
    }
}
