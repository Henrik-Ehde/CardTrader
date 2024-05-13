namespace CardTrader.Server.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }

        public List<Listing> Listings { get; set; }
    }
}
