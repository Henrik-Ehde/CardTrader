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
    name: string;
}
function ListingDetails() {
    const [listing, setListing] = useState<Listing>();
    const { listingId } = useParams();

    useEffect(() => {
        GetListing(listingId);
    }, [listingId]);

    const contents = listing === undefined
        ? <p><em>Loading Listing {listingId}</em></p>
        : <div>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <tbody>
                        <tr>
                        <td><strong>Card</strong></td>
                        <td>{listing.card.title}</td>
                    </tr>
                    <tr>
                        <td><strong>Quantity</strong></td>
                        <td>{listing.quantity}</td>
                    </tr>                  
                </tbody>
            </table>
        </div>

  return (
      <div>
          <h2 id="tabelLabel">Listing Details</h2>
          {contents}
      </div>
    );

    async function GetListing(listingId: string) {
        console.log('fetching Listings/' + listingId);
        const response = await fetch('/listings/' + listingId);

/*        For Debugging*/
        //console.log('awaiting data')
        //const dataText = await response.text();
        //console.log(dataText);
   
        const data = await response.json();
        setListing(data);
        console.log('Setting Listings')

    }
}

export default ListingDetails;