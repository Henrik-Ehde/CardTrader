//import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

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
function CardDetails() {
    const [card, setCard] = useState<Card>();
    const { cardId } = useParams();

    useEffect(() => {
        GetCard(cardId);
    }, [cardId]);

    const contents = card === undefined
        ? <p><em>Loading card {cardId}</em></p>
        : <div>
            <img
                //src="https://api.swu-db.com/cards/named?waylay&format=image"
                src="https://api.swu-db.com/cards/sor/361?format=image"
                alt="new"
            />
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
        </div>

  return (
      <div>
          <h2 id="tabelLabel">Card Details</h2>
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
    }
}

export default CardDetails;