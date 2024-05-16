import { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

interface Card {
    id: number;
    title: string;
    text: string;
}



function CardManager() {
    const [cards, setCards] = useState<Card[]>();

    useEffect(() => {
        GetCards();
    }, []);

    const navigate = useNavigate();
    const handleAddCardClick = () => {
        navigate("/addCard");
    }

    const contents = cards === undefined
        ? <p><em>Loading....</em></p>
        : <>
            <button onClick={handleAddCardClick}>Add Card</button>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Text</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map(card =>
                        <tr key={card.id}>
                            <td>{card.title}</td>
                            <td>{card.text}</td>
                            <td> <Link to={`/DeleteCard/${card.id}`}> <Button variant="warning"> Delete</Button> </Link> </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;


    return (
        <div>
            <h1 id="tabelLabel">Cards</h1>
            {contents}
        </div>
    );

    async function GetCards() {
        const response = await fetch('cards');
        const data = await response.json();
        setCards(data);
    }
}

export default CardManager;