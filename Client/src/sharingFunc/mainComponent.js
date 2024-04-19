import {React} from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from "react";

const VideoSharing = () => {
    const MainBody = styled(Card)(
        {
            border: "2px dashed black",
            borderRadius: "25px",
            flex: "1",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0)",
            margin: "10px 20px 20px 20px",
            filter: "blur(10%)",
            display: "flex",
            alignItems: "Center",
            justifyContent: "Center",
            backdropFilter: "blur(5px)"
        }
    )
    
    const [content, hasContent] = useState(0);


    return (
        <MainBody>
            {!content ? (<Typography variant="h5" component="h2" style={{ fontFamily: "Montserrat, sans-serif"}}>
                No clips have been uploaded yet.
            </Typography>) : ""
}
        </MainBody>
    )
}

export default VideoSharing;