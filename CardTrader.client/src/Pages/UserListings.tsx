//import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReturnButton from '../Components/ReturnButton';

interface Card {
    id: number;
    title: string;
    text: string;
    listings: Listing[]
}

interface Listing {
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

    const navigate = useNavigate();
    const handleAddListingClick = () => {
        navigate(`/AddListing/`);
    }

    useEffect(() => {
        GetUser(userId);
    }, [userId]);

    const contents = user === undefined
        ? <p><em>Loading listings for user {userId}</em></p>
        : <div>
            <h2>{user.name}'s Listings</h2>
            <button onClick={handleAddListingClick}>Add Listing</button>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Card</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {user.listings.map(listing =>
                        <tr key={listing.id}>
                            <td>{listing.card.title}</td>
                            <td>{listing.price}</td>
                            <td>{listing.quantity}</td>
                            <td> <Link to={`/EditListing/${listing.id}`}> <Button variant="info"> Edit</Button> </Link> </td>
                            <td> <Link to={`/DeleteListing/${listing.id}`}> <Button variant="warning"> Delete</Button> </Link> </td>
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