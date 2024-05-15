import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import AddCard from './Pages/AddCard.tsx';
import Header from './Components/Header.tsx';
import CardListings from './Pages/CardListings.tsx';
import Listings from './Components/Listings.tsx';
import CardManager from './Components/CardManager.tsx';


function App() {
    return (
        <>
            

            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/addCard" element={<AddCard />} />
                    <Route path="/Card/:cardId" element={<CardListings />} />
                    <Route path="/Cards" element={<CardManager />} />
                    <Route path="/Listings" element={<Listings />} />                   

                    <Route path="/" element={<Home />} />
                    

                </Routes>
            </BrowserRouter>
        </>

    );

}
export default App;