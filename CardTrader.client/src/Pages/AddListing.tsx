import { AuthorizedEmail, AuthorizedUser } from "../Components/AuthorizeView.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddListing() {
    // state variables for email and passwords
    const [cardId, setCardId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const email = AuthorizedEmail();

    // state variable for error messages
    const [error, setError] = useState("");

    const handleReturnClick = () => {
        navigate("/");
    }




    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "cardId") setCardId(value);
        if (name === "quantity") setQuantity(value);
        if (name === "price") setPrice(value);
    };

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
            <h3>Add Card</h3>
            <h4> <AuthorizedUser value="email" /> </h4>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cardId">cardId:</label>
                </div>
                <div>
                    <input
                        type="text"
                        id="cardId"
                        name="cardId"
                        value={cardId}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                </div>
                <div>
                    <input
                        type="number"
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
                        type="decimal"
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
}

export default AddListing;