import './App.css';
import React, { useState, useEffect } from 'react';
import FinalWidget from "./videofunc/finalWidget";
import VideoSharing from "./sharingFunc/mainComponent";


function App() {

    const [yid, setYid] = useState([]);

    return(
    <div style={{display: "flex", flexDirection: "column",  minHeight: "100vh"}}>
    <header>
        Stream. Play. Share.
    </header>

    <div class="hostJoinCard">
        <FinalWidget yid={yid} setY = {setYid}/>
    </div>
    <VideoSharing />
    
    {/* <Welcome></Welcome> */}

    </div>
)
}

export default App;
