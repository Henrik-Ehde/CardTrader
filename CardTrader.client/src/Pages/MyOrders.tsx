import { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import ReturnButton from '../Components/ReturnButton';
import { LoggedIn } from '../Components/LoggedInUser';

interface Card {
    id: number;
    title: string;
    text: string;
    listings: Listing[]
}

interface Listing {
    id: number;
    card: Card;
    price: number;
    quantity: number;
    user: User;
    datePosted: Date;
    buyQuantity: number;
}

interface User {
    name: string;
    listings: Listing[]
}
function MyOrders() {
    const [user, setUser] = useState();
    const loggedInUser = LoggedIn();

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser == null) navigate("/");
        else if (loggedInUser.name != undefined) GetUser(loggedInUser.name);
    }, [loggedInUser]);

    const contents = user === undefined
        ? <p><em>Loading your Orders</em></p>
        : <div>
             <h2>Your Purchases</h2>
            {user.buyOrders.map(order =>
                <>
                    <div className="containerbox">
                        <span className="big">
                            <span className="big">
                                <strong> {"Seller: "} </strong> <Link to={`/BuyFromUser/${order.seller.name}`}>  {order.seller.name} </Link>
                                <span className="right-align"> {order.date} </span>
                                <p><strong>{"Status:"} </strong> {order.status}</p>
                            </span>
                        </span>

                        <table className="table table-striped" aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th> Card </th>
                                    <th> Quantity </th>
                                    <th> price </th>
                                </tr>


                            </thead>
                            <tbody>
                                {order.orderItems.map(item => <>
                                    <tr key={item.id}>
                                        <td> {item.card.title} </td>
                                        <td> {item.quantity} </td>
                                        <td> {item.subTotal} </td>


                                    </tr>
                                </>)}

                                <tr>
                                    <td />
                                    <td><strong>Total:</strong></td>
                                    <td><strong>{order.total}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                </>
                
            )}

            <h2>Your Sales</h2>
            {user.sellOrders.map(order =>
                <>
                    <div className="containerbox">
                        <span className="big">
                            Buyer: <Link to={`/BuyFromUser/${order.buyer.name}`}>  {order.buyer.name} </Link>
                            <span className="right-align"> {order.date} </span>
                            <p><strong>{"Status:"} </strong> {order.status}</p>
                        </span>

                        <table className="table table-striped" aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th> Card </th>
                                    <th> Quantity </th>
                                    <th> price </th>
                                </tr>


                            </thead>
                            <tbody>
                                {order.orderItems.map(item => <>
                                    <tr key={item.id}>
                                        <td> {item.card.title} </td>
                                        <td> {item.quantity} </td>
                                        <td> {item.subTotal} </td>


                                    </tr>
                                </>)}

                                <tr>
                                    <td />
                                    <td><strong>Total:</strong></td>
                                    <td><strong>{order.total}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                </>

            )}


        </div>

  return (
      <div>
          {contents}
          <ReturnButton />
      </div>
    );

    async function GetUser(userName: string) {
        const response = await fetch(import.meta.env.VITE_API_URL + 'users/' + userName);

///*        For Debugging*/
//        console.log('awaiting data')
//        const dataText = await response.text();
//        console.log(dataText);
   
        const data = await response.json();
        setUser(data);
    }
}

export default MyOrders;