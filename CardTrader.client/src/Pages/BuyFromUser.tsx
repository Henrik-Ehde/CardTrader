//import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReturnButton from '../Components/ReturnButton';
import { LoggedIn } from '../Components/LoggedInUser';

interface Card {
    id: number;
    title: string;
    text: string;
    listings: Listing[]
}

interface Listing {
    buyQuantity: number;
    id: number;
    card: Card;
    price: number;
    quantity: number;
    user: User;
    datePosted: Date;

}

interface User {
    name: string;
    listings: Listing[]
}
function UserListings() {
    const [user, setUser] = useState<User>();
    const { userId } = useParams();
    const loggedInUser = LoggedIn();

    useEffect(() => {
        if (loggedInUser.name != undefined) {
            if (loggedInUser.name != userId) {
                GetUser(userId);
            }
            else navigate("/mylistings");
        }
    }, [userId, loggedInUser]);

    const [listings, setListings] = useState([]);
    const [buyQuantity, setBuyQuantity] = useState(0);

    const navigate = useNavigate();
    const handleAddListingClick = () => {
        navigate(`/AddListing/`);
    }

    const clamp = (num, min, max) => num > max ? max : num < min ? min : num

    const handleIncrementClick = (event) => {
        const listingId = event.currentTarget.getAttribute("listingid");
        const value = parseInt(event.currentTarget.getAttribute("value"));
        const newListings = listings.map((l) => {
            if (l.id == listingId) {
                l.buyQuantity += value;
                l.buyQuantity = clamp(l.buyQuantity, 0, l.quantity);
                return l;
            } else {
                // The rest haven't changed
                return l;
            }
        });
        setListings(newListings);
    }

    useEffect(() => {
        if (user != undefined) {
/*            setListings(user.listings)*/

            const newListings = user.listings.map((listing) => {
                    listing.buyQuantity = 0;
                    return listing;

            });
            setListings(newListings);
        }
    }, [user]);

    const contents = user === undefined
        ? <p><em>Loading listings for user {userId}</em></p>
        : <div>
            <h2>{user.name}'s Listings</h2>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Card</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Buy</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map(l =>
                        <tr key={l.id}>
                            <td> <a href={`/Card/${l.card.id}`}> {l.card.title} </a></td>
                            <td>{l.price}</td>
                            <td>{l.quantity}</td>
                            <td>{l.buyQuantity > 0 &&
                                    <Button onClick={handleIncrementClick} value={-1} listingid={l.id} variant="warning"> - </Button>
                            }</td>
                            <td> <strong>{" " + l.buyQuantity + " "} </strong> </td>
                            <td> {l.buyQuantity < l.quantity &&
                                <Button onClick={handleIncrementClick} value={1} listingid={l.id} variant="info"> + </Button>
                            }</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
  return (
      <div>
          {contents}
          <ReturnButton />
      </div>
    );

    async function GetUser(userId: string) {
        console.log('fetching User/' + userId);
        const response = await fetch('/users/' + userId);

///*        For Debugging*/
//        console.log('awaiting data')
//        const dataText = await response.text();
//        console.log(dataText);
   
        const data = await response.json();
        setUser(data);
        console.log('Setting User')

    }
}

export default UserListings;