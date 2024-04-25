import VideoPlayer from "./mainvideo";
import NextCard from "./verticalCards";
import IconButton from "@mui/material/IconButton";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";

const FinalWidget = (yids) => {
    const [inputValue, setInputValue] = useState('');
    const [queue, setQueue] = useState(null);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };


    // sample url: https://www.youtube.com/watch?v=w4TNGhSj2tc&list=PL6NdkXsPL07KN01gH2vucrHCEyyNmVEx4
    const addPlaylist = () => {
        if (inputValue.match(/\?v=([^&]+)&list=([^&]+)/)) {
        fetch('http://localhost:8000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputValue: inputValue.split("list=")[1] })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                yids["setY"](data);
                // we will convert the array data to object, to keep track of which is the current playing track
                const playlist = new Object();
                data.forEach(element => {
                    playlist[element]=0;
                });
                //make 1st track current
                playlist[data[0]] = 1;
                setInputValue("");
                setQueue(playlist);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
        else {
            alert("Please enter a valid playlist url!");
        }
    };

    // function that will be passed to vertical cards. They'll call this with id as param on click
    // why we are not passing setQueue is due to some reason, i dont remember, idk rethink smthng
    const updateQueue = (id) => {
        let playlist = queue;
        Object.keys(playlist).forEach(element => {
            playlist[element]=0;
        })
        playlist[id] = 1;
        setQueue(playlist);
    }

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Press+Start+2P&display=swap" rel="stylesheet"></link>
            <div className="leftContent" style={{ maxWidth: "600px", marginRight: "50px" }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: "7px", margin: "0px 0px 20px 0px", backgroundColor: "rgba(255,255,255,0.6)" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter playlist url"
                        inputProps={{ 'aria-label': 'Enter Playlist URL' }}
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <IconButton type="button" sx={{ p: '12px' }} onClick={addPlaylist} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                {/* video player */}
                <VideoPlayer queue={queue} setQ={setQueue}/>
    
            </div>

            <Divider orientation="vertical" variant="middle" flexItem />

            {/* upcoming songs queue */}
            <div className="RightContent" style={{maxHeight: "55vh", marginLeft: "20px", overflowY: "auto" }}>
                {queue ? (
                    Object.keys(queue).map(element => (
                        <NextCard id ={element} change={updateQueue} imageUrl={`https://i3.ytimg.com/vi/${element}/maxresdefault.jpg`} />
                    ))
                ) : (
                    <div style={{ display: 'flex', width: "100%", alignItems: "Center", color: "white", fontSize: "30px", fontFamily: "'Press Start 2P', system-ui", WebkitTextStroke: "1px rgb(46, 46, 46)" }}>
                            Please enter a playlist url</div>
                )}
                    {/* <IconButton aria-label="next" style={{ position: "absolute", right: "25px", top: "47%" }}>
                        <ChevronRightIcon sx={{ color: "white", fontSize: "3rem" }} />
                    </IconButton> */}
            </div>
        </div>
    );
}


export default FinalWidget;
