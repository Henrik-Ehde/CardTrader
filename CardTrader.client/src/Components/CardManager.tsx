import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReturnButton from './ReturnButton';

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

    const contents = cards === undefined
        ? <p><em>Loading....</em></p>
        : <>
            {/* <button onClick={handleAddCardClick}>Add Card</button> */}
            <Link to='/AddCard'> <Button variant="outline-primary"> Add Card</Button> </Link>
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
                            <td> <Link to={`/Card/${card.id}`}> {card.title} </Link></td>
                            <td>{card.text}</td>
                            <td> <Link to={`/EditCard/${card.id}`}> <Button variant="info"> Edit</Button> </Link> </td>
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
            <ReturnButton />
        </div>
    );

    async function GetCards() {
        const response = await fetch('cards');
        const data = await response.json();
        setCards(data);
    }
}

export default CardManager;