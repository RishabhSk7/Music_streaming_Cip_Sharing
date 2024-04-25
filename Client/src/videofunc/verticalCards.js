import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios";

const NextCard = ({ id, change }) => {

    const StyledCard = styled(Card)({
        width: '100%',
        margin: "20px",
        maxHeight: "120px",
        borderRadius: '7px',
        overflow: 'hidden', // Ensure content doesn't overflow
        position: 'relative', // Ensure positioning context for absolute positioning of content
    });

    const Image = styled('img')({
        width: '100%', // Image takes up 100% width
        height: '100%', // Image takes up 100% height
        objectFit: 'cover',
        filter: "contrast(69%)",
    });

    const Content = styled(CardContent)({
        position: 'absolute', // Position content absolutely
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1, // Ensure content appears above the image
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem', // Adjust padding as needed
        color: '#fff', // Text color
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for readability
    });

    const [name, setName] = useState("");

    useEffect(() => {
        axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet',
                id: id,
                key: 'Enter_Your_API_key',
            },
        })
            .then(response => {
                setName(response.data.items[0].snippet.title);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);
    const handleClick = (event) => {
        change(id);
    }

    return (
        <StyledCard onClick={handleClick}>
            <Image src={`https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="Card background" />
            <Content>
                {/* saving api credit */}
                <h4 style={{ fontFamily: "'Press Start 2P', system-ui"}}>
                    {name}
                </h4>
            </Content>
        </StyledCard>
    );
};

export default NextCard;
