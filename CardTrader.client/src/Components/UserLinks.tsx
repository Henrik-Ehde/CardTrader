import React, {} from 'react';
import LogoutLink from "../Components/LogoutLink.tsx";
import { LoggedIn } from "../Components/LoggedInUser.tsx";
import { Link, } from "react-router-dom";

function UserLinks() {  
    const loggedIn = LoggedIn();

    return (
        <>
            {loggedIn != null
                ? < span >
                    <Link to='Cards'> <button>Cards</button> </Link>
                    <Link to='MyListings'> <button> My Listings</button> </Link>
                    <Link to='MyOrders'> <button>My Orders</button> </Link>
                    <LogoutLink> Logout </LogoutLink>
                </span >

                : <span>
                    <Link to='register'> <button>Register</button> </Link>
                    <Link to='login'> <button>Log In</button> </Link>
                </span>               
            }
        </>

  );
}

export default UserLinks;