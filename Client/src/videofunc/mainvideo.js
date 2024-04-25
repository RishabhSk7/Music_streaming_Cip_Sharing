import YouTube, { YouTubeProps } from "react-youtube";
import React, { useState, useEffect } from 'react';
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

const VideoPlayer = ({ queue, setQ }) => {
    const [title, setTitle] = useState("-");
    const [isPaused, setIsPaused] = useState(false);         /* react-youtube is supposed to keep track of this, but it does not do that, event.data is empty */
    const [eventTarget, setEventTarget] = useState(null);
    const [rerender, dorerender] = useState(null);      /* strictly for forcing a rerender */

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };


    const [current, setCurrent] = useState(null);        /* since we need to midfy its value at lower level, but still require to declare it for initial rendering */
    useEffect(() => {
        if (queue) {            /* if sentence necessary, else will give error on initialisation since args["queue is enpty"] */
        console.log(queue);
            Object.keys(queue).forEach(element => {                 /* btw see object keys  */
                if (queue[element]===1) {
                    console.log("render");
                    setCurrent(element);
                }
            });
        }
    }, [queue, rerender]);

    const StyledCard = styled(Card)({
        maxWidth: 300,
        maxHeight: 536,
    });

    const Image = styled('img')({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    });

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

    const next = (event) => {
        if (queue) {
            console.log(queue);
            console.log(current);
            const keys = Object.keys(queue);
            const currentIndex = keys.findIndex(key => queue[key] === 1);
            const nextIndex = (currentIndex + 1) % keys.length; // Wrap around if last item

            // Update current index to 0
            queue[keys[currentIndex]] = 0;

            // If the current index is the last item, set the first item to 1
            if (nextIndex === 0) {
                queue[keys[currentIndex]] = 0; // Set current item to 0
                queue[keys[0]] = 1; // Set first item to 1
            } else {
                // Update next index to 1
                queue[keys[nextIndex]] = 1;
            }
            setQ(queue);
            console.log(queue);
            console.log(current);
            dorerender(!rerender);             /* need to rerender the element. doesnt seem to re render with queue idk why */
        }
    };

    const Previous = () => {
        const keys = Object.keys(queue);
        const currentIndex = keys.findIndex(key => queue[key] === 1);

        // If the current index is the first item, wrap around to the last item
        const previousIndex = currentIndex === 0 ? keys.length - 1 : currentIndex - 1;

        // Update previous index to 1
        queue[keys[previousIndex]] = 1;

        // Update current index to 0
        queue[keys[currentIndex]] = 0;
        setQ(queue);
        dorerender(!rerender); 
        
    };

    const Ready = (event) => {
        setTitle(event.target["videoTitle"]);
        setEventTarget(event.target);

    };

    return(
        <div>
            <YouTube videoId={current} opts={opts} style={{ display: "none" }} onReady={Ready} />
            <StyledCard sx={{ minWidth: "400px", display: 'block', backgroundColor: "rgba(144, 86, 144, 0.6)", borderRadius:"7px", color:"white"}}>

                <CardMedia
                    component="img"
                    sx={{ maxWidth: "410px", maxHeight:"500px", marginTop: "20px", borderRadius: "7px", fontFamily: "Montserrat", objectFit: "cover" }}
                    image={current ? (`https://i3.ytimg.com/vi/${current}/maxresdefault.jpg`) : (`https://img.freepik.com/premium-vector/arcade-machines-chill-lo-fi-background-vintage-gaming-devices-entertainment-2d-vector-cartoon-interior-illustration-purple-lofi-wallpaper-desktop-sunset-aesthetic-90s-retro-art-dreamy-vibes_151150-18105.jpg`)}
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
                        <IconButton aria-label="previous" onClick={Previous}>
                            <SkipPreviousIcon sx={{ color: "white", fontSize: "3rem" }} />
                        </IconButton>

                        <IconButton id="playPause" aria-label="play/pause" disabled={!eventTarget} onClick={() => {pausePlayMedia()}} >
                            {(current) ? (
                                (isPaused) ? (<PlayArrowIcon sx={{ color: "white", fontSize: "3rem" }} />)
                                    : (
                                        <PauseIcon sx={{ color: "white", fontSize: "3rem" }} />
                                    ) 
                            ) : (
                                <PlayArrowIcon sx={{ color: "white", fontSize: "3rem" }} />
                            )}
                        </IconButton>
                        <IconButton aria-label="next" size="large" onClick={next}>
                            <SkipNextIcon sx={{ color: "white", fontSize: "3rem" }} />
                        </IconButton>
                    </Box>
                </Box>

            </StyledCard>
        </div>
        )
    }

export default VideoPlayer;