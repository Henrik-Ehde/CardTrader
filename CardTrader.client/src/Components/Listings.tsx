import { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';


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
    userName: string
}

function Listings() {
    const [listings, setListings] = useState<Listing[]>();

    useEffect(() => {
        GetListings();
    }, []);

    const navigate = useNavigate();
    const handleAddCardClick = () => {
        navigate("/addCard");
    }

    const contents = listings === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <>
            <button onClick={handleAddCardClick}>Add Listing</button>
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
                    {listings.map(listings =>
                        <tr key={listings.id}>
                            <td>{listings.card.title}</td>
                            <td>{listings.price}</td>
                            <td>{listings.quantity}</td>
                            <td>{listings.user.userName}</td>
                            <td>{listings.datePosted.toString()}</td>
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
        const response = await fetch('listings');
        const data = await response.json();
        setListings(data);
    }
}

export default Listings;