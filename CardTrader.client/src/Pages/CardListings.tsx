//import React from 'react';
import { useEffect, useState } from 'react';

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
function CardListings({ cardId }: { cardId: number }) {
    const [card, setCard] = useState<Card[]>();

    useEffect(() => {
        GetCard(cardId);
    }, []);

    const contents = card === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>

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

    async function GetCard(cardId: number) {
        const response = await fetch('cards/' + cardId);
        const data = await response.json();
        setCard(data);
    }
}

export default CardListings;