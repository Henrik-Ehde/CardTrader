import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

interface Card {
    id: number;
    title: string;
    text: string;
    listings: Listing[]
    numberOfListings: number;
    numberOfCards: number;
    bestPrice: number;
}

interface Listing {
    price: number
    quantity: number
}



function Cards() {
    const [cards, setCards] = useState<Card[]>();

    useEffect(() => {
        GetCards();
    }, []);

    const [searchInput, setSearchInput] = useState("");

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const contents = cards === undefined
        ? <p><em>Loading... Please refresh the page after a minute if the content does not load. </em></p>
        : <>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                value={searchInput} />
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Listings</th>
                        <th>No. of Cards</th>
                        <th>Best Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map(card =>
                        <>
                            {(searchInput == "" ||
                                card.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                                card.text.toLowerCase().includes(searchInput.toLowerCase())
                            ) &&
                            <tr key={card.id}>
                                <td> <Link to={`/Card/${card.id}`}> {card.title} </Link></td>
                                <td>{card.numberOfListings}</td>
                                <td>{card.numberOfCards}</td>
                                {card.bestPrice == 0
                                    ? <td> n/a </td>
                                    : <td>{card.bestPrice}</td>
                                }                               
                            </tr>}
                        </>


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
        //const response = await fetch('https://cardtraderapi.azurewebsites.net/cards');
        const response = await fetch(import.meta.env.VITE_API_URL + 'cards');  
        const data = await response.json();
        setCards(data);
    }
}

export default Cards;