import { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


interface Listing {
    id: number;
    card: Card;
    price: number;
    quantity: number;
    user: User;
    datePosted: Date;
}
interface Card {
    id: number;
    title: string;
    text: string;
}

interface User {
    name: string
}

function Listings() {
    const [listings, setListings] = useState<Listing[]>();

    useEffect(() => {
        GetListings();
    }, []);

    const navigate = useNavigate();
    const handleAddListingClick = () => {
        navigate("/addListing");
    }

    const contents = listings === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <>
            <button onClick={handleAddListingClick}>Add Listing</button>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Card Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Seller</th>
                        <th>Date Posted</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map(listing =>
                        <tr key={listing.id}>
                            <td>{listing.card.title}</td>
                            <td>{listing.price}</td>
                            <td>{listing.quantity}</td>
                            <td>{listing.user.name}</td>
                            <td>{listing.datePosted.toString()}</td>
                            <td> <Link to={`/EditListing/${listing.id}`}> <Button variant="info"> Edit</Button> </Link> </td>
                            <td> <Link to={`/DeleteListing/${listing.id}`}> <Button variant="warning"> Delete</Button> </Link> </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;


    return (
        <div>
            <h1 id="tabelLabel">Listings</h1>
            {contents}
        </div>
    );

    async function GetListings() {
        const response = await fetch('orders');

        ///*        For Debugging*/
        console.log('awaiting data')
        const dataText = await response.text();
        console.log(dataText);

        //const data = await response.json();
        //setListings(data);
    }
}

export default Listings;