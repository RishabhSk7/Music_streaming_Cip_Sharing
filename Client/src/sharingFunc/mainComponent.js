import {React, useRef, useEffect} from "react";
import { Card, CardContent, CardMedia, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import { useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SquareCard from "./cards";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VideoSharing = () => {
    const MainBody = styled(Card)(
        {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "25px",
            padding: "20px 30px",
            flexWrap: "wrap",
            backgroundColor: "rgba(170, 170, 170, 0.3)",
            margin: "10px 20px 20px 20px",
            filter: "blur(10%)",
            display: "flex",
            alignItems: "Center",
            justifyContent: "left",
            backdropFilter: "blur(5px)",
            OverflowX: "auto"
        }
    )

    const inputRef = useRef(null);

    const handleFileClick = (event) => {
        inputRef.current.click();       /* gives inputref is null if done directly */
    }


    const handleUpload = () => {
        const file = inputRef.current.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('http://127.0.0.1:8000/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    toast("File Uploaded.");
                    console.log(response);

                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        }
    };

    const redirectToPage = () => {
        // Redirect to the angular webpage
        window.location.href = "http://127.0.0.1:8000/showVideos";
    };

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const countResponse = await fetch('http://127.0.0.1:8000/count');
                const countData = await countResponse.json();
                const videoCount = countData.ids;
                const fetchedVideos = [];

                const fetchVideo = async (index) => {
                    if (index < videoCount.length) {
                        try {
                            const response = await fetch('http://127.0.0.1:8000/getVideo', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id: videoCount[index] })
                            });
                            const fileName = await fetch('http://127.0.0.1:8000/getVideoTitle', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id: videoCount[index] })
                            });
                            const name = await fileName.text();
                            const videoBlob = await response.blob();
                            const videoUrl = URL.createObjectURL(videoBlob);
                            const video = { src: videoUrl, name:name};
                            fetchedVideos.push(video);
                            setVideos([...fetchedVideos]);
                            fetchVideo(index + 1); // Fetch next video
                        } catch (error) {
                            console.error('Error receiving file:', error);
                        }
                    }
                };

                if (videoCount) {
                fetchVideo(0); // Start fetching videos
                }
            } catch (error) {
                console.error('Error fetching video count:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <MainBody>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Press+Start+2P&display=swap" rel="stylesheet"></link>
            <div style={{ flex: "0 0 100%", margin:"0.5% 0%"}}>
                <div style={{ fontSize: "25px", fontFamily: "'Press Start 2P', system-ui", color:"whitesmoke", WebkitTextStroke:"1px rgb(46, 46, 46)" }}>
                    Uploaded Clips
                </div>
                <button onClick={redirectToPage}
                    style={{
                        position: "fixed", right: "30px", width: "50px", height: "50px", borderRadius: "50%", color: "white", backgroundColor: "#87CEEB", display: 'flex',
                        alignItems: "Center", justifyContent: "Center", padding: "5px"
                    }}
                >
                    See all</button>
            </div>
            <Card style={{ height: '100%', minWidth: 345, padding: '0px 0px 0px 5px', marginLeft: '0px', marginRight: '20px', borderRadius: '25px', backgroundColor:"rgba(255,255,255,0.7)" }}>
                <CardMedia
                    alt="Upload Image"
                    style={{ width: '40.5%', height: '180px' }}
                    component={FileUploadIcon}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Upload a file.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <input
                            ref={inputRef}
                            type="file"
                            id="fileInput"
                            accept="video/*"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="fileInput" onClick={handleFileClick} style={{cursor:"pointer", color:"darkred"}}>
                            Click to upload a file.
                        </label>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleUpload}>Upload</Button>
                </CardActions>
            </Card>

            <Divider orientation="vertical" flexItem variant="middle" sx={{width:"5px", backgroundColor:"puprle", marginRight:"20px", borderRadius: "25px"}}/>

            <Stack direction="row" style={{ overflowX:"auto"}}>
                {videos.map((video, index) => (
                    <SquareCard key={index} videoUrl={video.src} name={video.name} />
                ))}
            </Stack>

        </MainBody>
    )
}

export default VideoSharing;