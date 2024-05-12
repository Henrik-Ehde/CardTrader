import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddCard() {
    // state variables for email and passwords
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    // state variable for error messages
    const [error, setError] = useState("");

    const handleReturnClick = () => {
        navigate("/");
    }




    // handle change events for input fields
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        if (name === "text") setText(value);
    };

    const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        if (name === "text") setText(value);
    };

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!title || !text) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api
            fetch("/cards", {
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
                        //type="text"
                        id="text"
                        name="text"
                        value={text}
                        onChange={handleTextArea}
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

export default AddCard;
