import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const NextCard = ({ imageUrl, title }) => {
    const StyledCard = styled(Card)({
        width: '100%',
        margin: "20px", 
        maxHeight: "100px",
        borderRadius: '7px',
        overflow: 'hidden', // Ensure content doesn't overflow
    });

    const Image = styled('img')({
        width: '100%', // Image takes up 100% width
        height: '100%', // Image takes up 100% height
        objectFit: 'cover',
        filter: "contrast(69%)",
    });

    const Content = styled(CardContent)({
        flex: '1', // Allow content to grow
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem', // Adjust padding as needed
    });

    return (
        <StyledCard>
            <Image src={imageUrl} alt="Card background" />
            <Content>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
            </Content>
        </StyledCard>
    );
};

export default NextCard;
