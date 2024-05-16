//import React from 'react';
import { useEffect, useState } from 'react';
import CardDetails from '../Components/CardDetails';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReturnButton from '../Components/ReturnButton';
import { AuthorizedName } from '../Components/LoggedInUser';
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
}

interface User {
    name: string;
}
function CardListings() {
    const [card, setCard] = useState<Card>();
    const { cardId } = useParams();

    const loggedInUser = LoggedIn();

    const navigate = useNavigate();
    const handleAddListingClick = () => {
        navigate(`/AddListing/${cardId}`);
    }

    useEffect(() => {
        GetCard(cardId);
    }, [cardId]);

    const contents = card === undefined
        ? <p><em>Loading card {cardId}</em></p>
        : <div>
            <h2>Listings</h2>
            <button onClick={handleAddListingClick}>Add Listing</button>
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
                            <td> <a href={`/BuyFromUser/${listing.user.name}`}> {listing.user.name} </a></td>
                            <td>{listing.price}</td>
                            <td>{listing.quantity}</td>
                            {loggedInUser != null ?
                                loggedInUser.name == listing.user.name ?

                                    <td>
                                        <> <Link to={`/EditListing/${listing.id}`}> <Button variant="info"> Edit</Button> </Link> </>
                                        <> <Link to={`/DeleteListing/${listing.id}`}> <Button variant="warning"> Delete</Button> </Link> </>
                                    </td>
                                    : <td> <Link to={`/BuyFromUser/${listing.user.name}`}> <Button variant="success"> Buy Cards</Button> </Link> </td>

                                : <td> <Link to={`/Login`}> <Button variant="outline-secondary"> Login to trade</Button> </Link> </td>

                            }



{/*                            {loggedInUser.name == listing.user.name ?*/}
{/*/*                           {loggedInUser != null ?*/}
{/*                                <  >*/}

{/*                                </>*/}

{/*                                : <>*/}

{/*                                </>*/}
{/*                            }                            */}
                            

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
  return (
      <div>
          <CardDetails />
          {contents}
          <ReturnButton />
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