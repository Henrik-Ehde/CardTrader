import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserLinks from './UserLinks';

function Header() {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/");
    }
    return (
        <>
            <button onClick={handleHomeClick}>Home</button>
            <UserLinks />
        </>

    );
}

export default Header;