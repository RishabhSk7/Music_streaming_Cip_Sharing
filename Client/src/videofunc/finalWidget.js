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

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };


    const addPlaylist = () => {
        console.log(inputValue);
        fetch('http://localhost:5000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputValue: inputValue })
        })
            .then(response => response.json())
            .then(data => {
                yids["setY"](data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
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
                <VideoPlayer id={yids["yid"]}/>
    
            </div>

            <Divider orientation="vertical" variant="middle" flexItem />

            {/* upcoming songs queue */}
            <div className="RightContent" style={{maxHeight: "55vh", marginLeft: "20px", overflowY: "auto" }}>
                {yids["yid"].slice(1).map((value, index) => (
                    <div style={{ display: 'flex'}}>
                        <NextCard imageUrl={`https://i3.ytimg.com/vi/${value}/maxresdefault.jpg`}></NextCard>
                    </div>  
                ))}
                    {/* <IconButton aria-label="next" style={{ position: "absolute", right: "25px", top: "47%" }}>
                        <ChevronRightIcon sx={{ color: "white", fontSize: "3rem" }} />
                    </IconButton> */}
            </div>
        </div>
    );
}


export default FinalWidget;
