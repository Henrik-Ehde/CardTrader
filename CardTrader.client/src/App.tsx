import './App.css';

import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import AddCard from './Pages/AddCard.tsx';
import Header from './Components/Header.tsx';
import CardListings from './Pages/CardListings.tsx';
import Listings from './Components/Listings.tsx';
import CardManager from './Components/CardManager.tsx';
import AddListing from './Pages/AddListing.tsx';
import AuthorizeView from './Components/AuthorizeView.tsx';
import DeleteCard from './Pages/DeleteCard.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditCard from './Pages/EditCard.tsx';
import DeleteListing from './Pages/DeleteListing.tsx';
import EditListing from './Pages/EditListing.tsx';
import BuyFromUser from './Pages/BuyFromUser.tsx';
import MyListings from './Pages/MyListings.tsx';
import MyOrders from './Pages/MyOrders.tsx';


function App() {
    return (
        <>
            

            <HashRouter>
                <Header />

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/Cards" element={<CardManager />} />
                    <Route path="/Card/:cardId" element={<CardListings />} />
                    <Route path="/addCard" element={<AddCard />} />
                    <Route path="/DeleteCard/:cardId" element={<DeleteCard />} />
                    <Route path="/EditCard/:cardId" element={<EditCard />} />


                    <Route path="/Listings" element={<Listings />} />
                    <Route path="/AddListing/:initialId" element={<AuthorizeView> <AddListing /> </AuthorizeView>} />                   
                    <Route path="/AddListing" element={<AuthorizeView> <AddListing /> </AuthorizeView>} />   
                    <Route path="/DeleteListing/:listingId" element={<DeleteListing />} />
                    <Route path="/EditListing/:listingId" element={<EditListing />} />

                    <Route path="/BuyFromUser/:userId" element={<BuyFromUser />} />
                    <Route path="/MyListings" element={<MyListings />} />

                    <Route path="/MyOrders" element={<MyOrders />} />

                    <Route path="/" element={<Home />} />
                    

                </Routes>
            </HashRouter>
        </>

    );

}
export default App;