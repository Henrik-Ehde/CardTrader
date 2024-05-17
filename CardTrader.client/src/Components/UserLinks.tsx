import React, { useEffect, useState } from 'react';
import LogoutLink from "../Components/LogoutLink.tsx";
import { LoggedIn } from "../Components/LoggedInUser.tsx";
import { Link, useNavigate } from "react-router-dom";

function UserLinks() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/login");
    }
   
    //const [loggedIn, setloggedIn] = useState<boolean>(true);
    const loggedIn = LoggedIn();

    //useEffect(() => {
    //    if (LoggedIn()) setloggedIn(true);
    //    else setloggedIn(false);
    //}, []);
    
    const handleRegisterClick = () => {
        navigate("/register");
    }

    return (
        <>
            {loggedIn != null ? < span >
                <> <Link to={`/MyListings`}> <button> My Listings</button> </Link> </>
                <Link to="/MyOrders"> <button>My Orders</button> </Link>

                <LogoutLink> Logout </LogoutLink></span >

                : <span>
                    
                    <button onClick={handleRegisterClick}>Register</button>
                    <button onClick={handleLoginClick}>Login</button>
                    </span>
                
            }
        </>

  );
}

export default UserLinks;