import { AuthorizedEmail, AuthorizedUser } from "../Components/AuthorizeView.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Card {
    id: number;
    title: string;
}

function AddListing() {
    const { initialId } = useParams();
    const [cardId, setCardId] = useState(initialId);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(1);
    const navigate = useNavigate();
    const email = AuthorizedEmail();

    // state variable for error messages
    const [error, setError] = useState("");

    const handleReturnClick = () => {
        navigate("/");
    }

    const [cards, setCards] = useState<Card[]>();

        useEffect(() => {
            GetCards();
        }, []);


    const contents = cards === undefined
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
            fetch("/listings", {
                method: "POST",
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
                    if (data.ok)
                        setError("Card Successfully added.");
                    else
                        setError("Error adding card.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error adding card.");
                });
        }
    };

    return (
        <div className="containerbox">
            <h3>Add Listing</h3>
{/*            <h4> <AuthorizedUser value="email" /> </h4>*/}



            <form onSubmit={handleSubmit}>


                <div>
                    <label htmlFor="Card">Card:</label>
                </div>
                <div>
                    <select name="cardId"
                        value={cardId}
                        onChange={e => setCardId(e.target.value)}
                    >
                        {contents}
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
                    <button type="submit">Add Card</button>

                </div>
                <div>
                    <button onClick={handleReturnClick}>Return</button>
                </div>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );

    async function GetCards() {
        const response = await fetch('/cards');
        const data = await response.json();
        setCards(data);
    }
}

export default AddListing;