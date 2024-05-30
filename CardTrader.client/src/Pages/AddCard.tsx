import { useState } from "react";
import ReturnButton from "../Components/ReturnButton";
import { Button } from "react-bootstrap";


function AddCard() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    // state variable for error messages
    const [error, setError] = useState("");




    // handle change events for input fields
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTitle(value);
    };

    const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setText(value);
    };

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !text) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            // post data
            fetch(import.meta.env.VITE_API_URL + "cards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    text: text,
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

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                </div><div>
                    <input
                        type="title"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <label htmlFor="text">Card Text:</label></div><div>
                    <textarea
                        id="text"
                        name="text"
                        value={text}
                        onChange={handleTextArea}
                    />
                </div>
                <div>
                    <Button variant="success" type="submit"> Add Card</Button>
                </div>
                <div>
                    <ReturnButton />
                </div>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default AddCard;
