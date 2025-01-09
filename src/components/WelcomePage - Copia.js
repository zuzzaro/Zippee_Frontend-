// zippee-frontend - File src/components/WelcomePage.js - v1

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
} from '@mui/material';

function WelcomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { ecoTripCode, partnerName, departureDate } = location.state || {};

    const handleViewDetails = () => {
        navigate(`/enduser/trip/${ecoTripCode}`);
    };

    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Grazie per aver scelto un viaggio sostenibile! 🌱
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Il tuo viaggio con <strong>{partnerName}</strong> è confermato per il <strong>{new Date(departureDate).toLocaleDateString()}</strong>.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        EcoTrip Code: <strong>{ecoTripCode}</strong>
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleViewDetails}
                    >
                        Visualizza Dettagli del Viaggio
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}

export default WelcomePage;