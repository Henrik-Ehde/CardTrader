using Azure.Identity;
using Microsoft.AspNetCore.Identity;

namespace CardTrader.Server.Models
{
    public class User : IdentityUser
    {

        public List<Listing> Listings { get; set; }
        public List<Order> BuyOrders { get; set; }
        public List<Order> SellOrders { get; set; }
        public string Name
        {
            get { return UserName.Split("@")[0]; }
        }
    }
}
