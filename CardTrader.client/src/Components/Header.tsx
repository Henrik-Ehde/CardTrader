import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLinks from './UserLinks';

function Header() {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/");
    }
    return (
        <>
            <button onClick={handleHomeClick}>Home</button>
            <Link to="/Cards"> <button>Cards</button> </Link>
            <UserLinks />
        </>

    );
}

export default Header;