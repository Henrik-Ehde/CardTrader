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
    id: number;
    card: Card;
    price: number;
    quantity: number;
    user: User;
    datePosted: Date;
    buyQuantity: number;
}

interface User {
    name: string;
    listings: Listing[]
}
function UserListings() {
    const [user, setUser] = useState();
    const loggedInUser = LoggedIn();

    const navigate = useNavigate();
    const handleAddListingClick = () => {
        navigate(`/AddListing/`);
    }

    useEffect(() => {
        if (loggedInUser == null) navigate("/");
        else if (loggedInUser.name != undefined) GetUser(loggedInUser.name);
    }, [loggedInUser]);

    const contents = user === undefined
        ? <p><em>Loading your listings</em></p>
        : <div>
            <h2>Your Listings</h2>
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
                            <td> <a href={`/Card/${listing.card.id}`}> {listing.card.title} </a></td>
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

    async function GetUser(userName: string) {
        const response = await fetch('/users/' + userName);

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