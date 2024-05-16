using Azure.Identity;
using Microsoft.AspNetCore.Identity;

namespace CardTrader.Server.Models
{
    public class User : IdentityUser
    {

        public List<Listing> Listings { get; set; }
        public string Name
        {
            //get { return "MR. "+UserName; }
            get { return UserName.Split("@")[0]; }
        }
    }
}
