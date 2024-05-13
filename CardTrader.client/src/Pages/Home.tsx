import CardManager from "../Components/CardManager.tsx";
import Listings from "../Components/Listings.tsx";
import CardListings from "./CardListings.tsx";

//import { useState } from "react";

function Home() {



    return (

        <>
            <CardManager />
            <Listings />
            <CardListings cardId={4} />
        </>


    );
}

export default Home;