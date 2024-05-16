import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Card {
    id: number;
    title: string;
    text: string;
}

function EditCard() {
    const [card, setCard] = useState<Card>();
    const { cardId } = useParams();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    // state variable for error messages
    const [error, setError] = useState("");

    const goBack = () => {
        navigate(-1);
    };



    useEffect(() => {
        GetCard(cardId);
    }, [cardId]);

    useEffect(() => {
        if (card != undefined) {
            setText(card.text)
            setTitle(card.title)
        }
    }, [card]);




    // handle change events for input fields
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTitle(value);
        //title = value;
    };

    const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setText(value);
        //text = value;
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
            fetch('/cards/' + cardId, {
                method: "PUT",
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
                    if (data.ok) {
                        setError("Card Successfully Edited.");
                        setTimeout(() => { goBack() }, 800);
                    }


                    else
                        setError("Error editing card.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error adding card.");
                });
        }
    };

    const contents = card === undefined
        ? <p><em>Loading card {cardId}</em></p>
        : <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                </div><div>
                    <input
                        type="text"
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
                    <button type="submit">Edit Card</button>

                </div>
                <div>
                    <button onClick={goBack}>Return</button>
                </div>
            </form>

            {error && <p className="error">{error}</p>}
        </div>

    return (
        <div className="containerbox">
            <h3>Edit Card</h3>
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
        console.log('Setting Cards')

    }
}

export default EditCard;
