import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import AddCard from './Pages/AddCard.tsx';
import Header from './Components/Header.tsx';


function App() {
    return (
        <>
            

            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/addCard" element={<AddCard />} />
                </Routes>
            </BrowserRouter>
        </>

    );

}
export default App;