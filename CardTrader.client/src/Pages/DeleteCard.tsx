import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardDetails from '../Components/CardDetails';
import Button from 'react-bootstrap/Button';

function DeleteCard() {
    const { cardId } = useParams();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const handleDeleteClick = () => {
            // post data
        fetch('/cards/' + cardId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            body: ""
            })
                //.then((response) => response.json())
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok) {
                        setError("Card Successfully deleted.");
                        setTimeout(() => { goBack() }, 800);
                    }

                    else
                        setError("Error deleting card.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error adding card.");
                });
    };

  return (
      <div>
          <CardDetails />
          <br />
          <strong> Do you really want to delete this card?</strong>
          <br />
          <span>
              <Button variant="danger" onClick={handleDeleteClick}> Delete</Button>{' '}

              <button onClick={goBack}>Return</button>
          </span>
          {error && <p className="error">{error}</p>}
      </div>
  );
}

export default DeleteCard;