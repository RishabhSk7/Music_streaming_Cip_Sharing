import YouTube, { YouTubeProps } from "react-youtube";
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/system';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReactDOM from 'react-dom';

const VideoPlayer = args => {           /* args is object */
    const theme = useTheme();
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const StyledCard = styled(Card)({
        maxWidth: 300,
        maxHeight: 536,
    });

    const Image = styled('img')({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    });

    const [title, setTitle] = useState("-");
    const [isPaused, setIsPaused] = useState(true);         /* react-youtube is supposed to keep track of this, but it does not do that, event.data is empty */
    const [eventTarget, setEventTarget] = useState(null);

    const getCurrentState = () => {
        if (eventTarget) {
            // console.log(eventTarget);
            const state = eventTarget.getPlayerState();
            console.log('Current player state:', eventTarget.getPlayerState());
        }
    };  

    // setInterval(() => {
    //     getCurrentState();
    // }, 4000);

    const pausePlayMedia = () => {
        if (isPaused) {
            eventTarget.playVideo();
            setIsPaused(false);}
        else {
            eventTarget.pauseVideo();
            setIsPaused(true);
        }
    }

    const Ready = (event) => {
        setTitle(event.target["videoTitle"]);
        setEventTarget(event.target);

    };

    return(
        <div>
            <YouTube videoId={args["id"][0]} opts={opts} style={{ display: "none" }} onReady={Ready} />
            <StyledCard sx={{ minWidth: "400px", display: 'block', backgroundColor: "rgba(144, 86, 144, 0.6)", borderRadius:"7px", color:"white"}}>

                <CardMedia
                    component="img"
                    sx={{ maxWidth: "410px", maxHeight:"500px", marginTop: "20px", borderRadius: "7px", fontFamily: "Montserrat", objectFit: "cover" }}
                    image={args["id"][0] ? (`https://i3.ytimg.com/vi/${args["id"][0]}/maxresdefault.jpg`) : (`https://piktochart.com/wp-content/uploads/2023/05/large-157.jpg`)}
                    alt={`${title}`}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:"Center"}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography  variant="h4" component="h1" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.3rem", overflowX:"clip"}}>
                            {title.charAt(0).toUpperCase() + title.substr(1).toLowerCase()}
                        </Typography>
                        <Typography variant="subtitle1" color="text" component="div">
                            {/* insert artist name if you can get it */}
                        </Typography>
                    </CardContent>

                    <Box id="mediaControl" sx={{ display: 'flex', alignItems: 'center', marginLeft: "auto", marginRight: "auto", pb: 1 }}>
                        <IconButton aria-label="previous" >
                            <SkipPreviousIcon sx={{ color: "white", fontSize: "3rem" }} />
                        </IconButton>
                        <IconButton id="playPause" aria-label="play/pause" disabled={!eventTarget} onClick={() => {pausePlayMedia()}} >
                            {(isPaused && args["id"][0] )? (
                                <PlayArrowIcon sx={{ color: "white", fontSize: "3rem" }} />
                            ) : (
                                <PauseIcon sx={{ color: "white", fontSize: "3rem" }} />
                            )}
                        </IconButton>
                        <IconButton aria-label="next" size="large">
                            <SkipNextIcon sx={{ color: "white", fontSize: "3rem" }} />
                        </IconButton>
                    </Box>
                </Box>

            </StyledCard>
        </div>
        )
    }

export default VideoPlayer;