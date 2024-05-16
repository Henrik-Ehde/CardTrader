import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthorizedEmail } from "../Components/AuthorizeView";
import ReturnButton from "../Components/ReturnButton";
import { Button } from "react-bootstrap";

interface Card {
    id: number;
    title: string;
}

interface Listing {
    id: number;
    cardId: number;
    card: Card;
    price: number;
    quantity: number;
    user: User;
    datePosted: Date;
}

interface User {
    name: string;
    email: string;
}

function EditListing() {
    const [listing, setListing] = useState<Listing>();
    const { listingId } = useParams();

    const { initialId } = useParams();
    const [cardId, setCardId] = useState(initialId);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(1);
    const navigate = useNavigate();
    //const email = AuthorizedEmail();
    const [email, setEmail] = useState("")

    // state variable for error messages
    const [error, setError] = useState("");

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        GetListing(listingId);
    }, [listingId]);

    useEffect(() => {
        if (listing != undefined) {
            setCardId(listing.cardId);
            setPrice(listing.price)
            setQuantity(listing.quantity)
            setEmail(listing.user.email)
        }
    }, [listing]);

    const [cards, setCards] = useState<Card[]>();

        useEffect(() => {
            GetCards();
        }, []);


    const cardOptions = cards === undefined
        ? <option>loading...</option>
        : <>
            {cards.map(card =>
                <option
                    key={card.id}
                    value={card.id}

                >{card.title}


                </option>
            )}
        </>;




    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "cardId") setCardId(value);
        if (name === "quantity") setQuantity(value);
        if (name === "price") setPrice(value);
    };

    //const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //    const {value } = e.target;
    //    setCardId(value);
    //};

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!cardId || !quantity || !price) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");

            console.log(email);
            console.log(JSON.stringify({
                cardId: cardId,
                quantity: quantity,
                price: price,
                userEmail: email
            }))

            // post data
            fetch("/listings/" + listingId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cardId: cardId,
                    quantity: quantity,
                    price: price,
                    userEmail: email
                }),
            })
                //.then((response) => response.json())
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok) {
                        setError("Listing successfully edited.");
                        setTimeout(() => { goBack() }, 800);
                    }

                    else
                        setError("Error editing listing.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error adding card.");
                });
        }
    };

    const contents = listing === undefined
        ? <p><em>Loading card {cardId}</em></p>
        : <div>
            <form onSubmit={handleSubmit}>


                <div>
                    <label htmlFor="Card">Card:</label>
                </div>
                <div>
                    <select name="cardId"
                        value={cardId}
                        onChange={e => setCardId(e.target.value)}
                    >
                        {cardOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                </div>
                <div>
                    <input
                        type="number"
                        min="1"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                </div>
                <div>
                    <input
                        type="number"
                        min="1"
                        step="0.50"
                        id="price"
                        name="price"
                        value={price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Button variant="info" type="submit"> Edit Listing</Button>

                </div>
            </form>

            {error && <p className="error">{error}</p>}
          </div>

    return (
        <div className="containerbox">
            <h3>Edit Listing</h3>
            {contents}
            <ReturnButton />
        </div>
    );

    async function GetCards() {
        const response = await fetch('/cards');
        const data = await response.json();
        setCards(data);
    }

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

export default EditListing;