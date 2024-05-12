import { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

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
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
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
                    {cards.map(cards =>
                        <tr key={cards.id}>
                            <td>{cards.title}</td>
                            <td>{cards.text}</td>
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