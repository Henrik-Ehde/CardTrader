import React, { useEffect, useState } from 'react';
import LogoutLink from "../Components/LogoutLink.tsx";
import { LoggedIn } from "../Components/LoggedInUser.tsx";
import { useNavigate } from "react-router-dom";

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
            {loggedIn ? < span >
                {/*<button> User Page </button>*/}
                <LogoutLink /*setter={/setloggedIn}*/ >Logout </LogoutLink></span >

                : <span>
                    <button onClick={handleRegisterClick}>Register</button>
                    <button onClick={handleLoginClick}>Go to Login</button>
                    </span>
                
            }
        </>

  );
}

export default UserLinks;