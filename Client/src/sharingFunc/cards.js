import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SquareCard(key, videoUrl) {
    console.log(key);
    return (
        <Card sx={{ Height: 330, backgroundColor: "rgba(255,255,255,0.7)", minWidth: 345, maxWidth: 345, marginLeft: "0px", marginRight: "20px",borderRadius:"25px" }}>
            <CardMedia
                alt="video_cover"
                component='video'
                image={key["videoUrl"]}
                controls
                style={{padding:"2.5%", width:"95%", borderRadius:"25px"}}
            />
            <CardContent style={{overflow: "auto" }}>
                <Typography gutterBottom variant="h6" component="div" style={{fontSize:"15px"}}>
                    Name: {key["name"]}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" style={{position:"absolute",  bottom:"7%"}}>Share</Button>
            </CardActions>
        </Card>
    );
}