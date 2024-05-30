//import React from 'react';
import { useEffect, useState } from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
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

interface Order {
    buyerEmail: string;
    sellerEmail: string;
    status: string;
    total: string;
}

interface User {
    name: string;
    email: string;
    listings: Listing[]
}
function UserListings() {
    const [user, setUser] = useState<User>();
    const { userId } = useParams();
    const loggedInUser = LoggedIn();

    useEffect(() => {
        if (loggedInUser != undefined) {
            if (loggedInUser.name == userId) navigate("/mylistings");

            else GetUser(userId);
        }
    }, [userId, loggedInUser]);

    const [listings, setListings] = useState([]);

    const navigate = useNavigate();

    const clamp = (num, min, max) => num > max ? max : num < min ? min : num

    const [total, setTotal] = useState(0);
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

        let newTotal = 0;
        newListings.map((l) => {
            newTotal += l.price * l.buyQuantity;
        })
        setTotal(newTotal);
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




    const [order, setOrder] = useState<Order>();
    const [error, setError] = useState("");

    const SubmitOrder = () => {

        const buyListings = listings.filter(l => l.buyQuantity > 0).map(l => l);
        let total = 0;
        const data = buyListings.map(function (l) {
            total += l.price * l.buyQuantity;
                return {
                    "cardId": l.cardId,
                    "quantity": l.buyQuantity,
                    "subTotal": l.price * l.buyQuantity,
                    "listingId": l.id 
                };

        });

        console.log(JSON.stringify(data));



            console.log(JSON.stringify({
                sellerEmail: user.email,
                buyerEmail: loggedInUser.email,
                total: total,
                "items": data
            }))

            // post data
            fetch(import.meta.env.VITE_API_URL + "orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sellerEmail: user.email,
                    buyerEmail: loggedInUser.email,
                    total: total,
                    status: "Placed",
                    "items": data
                }),
            })
                //.then((response) => response.json())
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok) {
                        setError("Order Placed.");
                        GetUser(userId);
                    }

                    else
                        setError("Error Placing Order.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error placing order.");
                });
        
    };

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
                        {loggedInUser != null && <th />}
                        <th>Buy</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map(l =>
                        <tr key={l.id}>
                            <td> <Link to={`/Card/${l.card.id}`}> {l.card.title} </Link></td>
                            <td>{l.price}</td>
                            <td>{l.quantity}</td>

                            {loggedInUser == null
                                ? <td> <Link to={`/#/Login`}> <Button variant="outline-secondary"> Login to Buy</Button> </Link> </td>

                                : <>
                                    <td>{l.buyQuantity > 0 &&
                                        <Button onClick={handleIncrementClick} value={-1} listingid={l.id} variant="warning"> - </Button>
                                    }</td>
                                    <td> <strong>{" " + l.buyQuantity + " "} </strong> </td>
                                    <td> {l.buyQuantity < l.quantity &&
                                        <Button onClick={handleIncrementClick} value={1} listingid={l.id} variant="info"> + </Button>
                                    }</td>
                                    <td>{l.buyQuantity > 0 && l.buyQuantity * l.price}</td>
                                </>
                            }

                        </tr>
                    )}
                    {loggedInUser != null &&
                        <tr>
                            <td /><td /><td /><td /><td /> <td><strong>Total: </strong></td><td>{total}</td>
                        </tr>
                    }
                </tbody>
            </table>
            {loggedInUser != null && <Button onClick={SubmitOrder} variant="success"> Submit Order </Button>}
            {error && <p className="error">{error}</p>}
        </div>

  return (
      <div>
          {contents}
          <ReturnButton />
      </div>
    );

    async function GetUser(userId: string) {
        console.log('fetching User/' + userId);
        const response = await fetch(import.meta.env.VITE_API_URL + '/users/' + userId);

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