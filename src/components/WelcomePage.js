// zippee-frontend - File src/components/WelcomePage.js - v2

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
    CircularProgress,
} from '@mui/material';

function WelcomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ecoTripCode = queryParams.get('ecoTripCode'); // Ottieni l'EcoTrip Code dall'URL

    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/enduser/trips/${ecoTripCode}`);
                setTripDetails(response.data);
                setLoading(false);
            } catch (err) {
                setError('Errore durante il recupero dei dettagli del viaggio.');
                setLoading(false);
            }
        };

        if (ecoTripCode) {
            fetchTripDetails();
        } else {
            setError('EcoTrip Code non valido.');
            setLoading(false);
        }
    }, [ecoTripCode]);

    const handleViewDetails = () => {
        navigate(`/enduser/trip/${ecoTripCode}`);
    };

    if (loading) {
        return (
            <Container>
                <Box mt={5} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Box mt={5} textAlign="center">
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Grazie per aver scelto un viaggio sostenibile! 🌱
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Il tuo viaggio con <strong>{tripDetails.company_name}</strong> è confermato per il <strong>{new Date(tripDetails.date_departure).toLocaleDateString()}</strong>.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        EcoTrip Code: <strong>{tripDetails.eco_trip_code}</strong>
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