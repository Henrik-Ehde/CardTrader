//import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

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
    userName: string;
}
function CardListings() {
    const [card, setCard] = useState<Card>();
    const { cardId } = useParams();

    const navigate = useNavigate();
    const handleAddListingClick = () => {
        navigate("/addListing");
    }

    useEffect(() => {
        GetCard(cardId);
    }, [cardId]);

    const contents = card === undefined
        ? <p><em>Loading card {cardId}</em></p>
        : <div>
            <button onClick={handleAddListingClick}>Add Listing</button>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <tbody>
                        <tr>
                        <td><strong>Title</strong></td>
                        <td>{card.title}</td>
                    </tr>
                    <tr>
                        <td><strong>Text</strong></td>
                        <td>{card.text}</td>
                    </tr>                  
                </tbody>
            </table>

            <h2>Listings</h2>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Seller</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {card.listings.map(listing =>
                        <tr key={listing.id}>
                            <td>{listing.user.userName}</td>
                            <td>{listing.price}</td>
                            <td>{listing.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
  return (
      <div>
          <h1 id="tabelLabel">Card</h1>
          {contents}
      </div>
    );

    async function GetCard(cardId: string) {
        console.log('fetching cards/' + cardId);
        const response = await fetch('/cards/' + cardId);

        //For Debugging
        //console.log('awaiting data')
        //const dataText = await response.text();
        //console.log(dataText);
   
        const data = await response.json();
        setCard(data);
        console.log('Setting Cards')

    }
}

export default CardListings;