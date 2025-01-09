// zippee-frontend - File src/components/EndUserTripDetails.js - v6

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams per ottenere l'EcoTrip Code dall'URL
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    Button,
    CircularProgress,
    Paper,
    Grid,
} from '@mui/material';

function EndUserTripDetails() {
    const { ecoTripCode } = useParams(); // Ottieni l'EcoTrip Code dall'URL
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                // Utilizza l'EcoTrip Code passato tramite URL
                const response = await axios.get(`http://localhost:3000/api/enduser/trips/${ecoTripCode}`);
                console.log('Risposta dell\'API:', response.data); // Log di debug
                setTripDetails(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Errore durante la richiesta:', err); // Log di debug
                setError('Errore durante il recupero dei dettagli del viaggio.');
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [ecoTripCode]); // Esegui l'effetto quando ecoTripCode cambia

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
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Trip Details
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Partner ID:</Typography>
                            <Typography>{tripDetails.partner_id}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Partner Name:</Typography>
                            <Typography>{tripDetails.company_name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Number of People:</Typography>
                            <Typography>{tripDetails.num_persone}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Departure Date:</Typography>
                            <Typography>{new Date(tripDetails.date_departure).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">EcoTrip Code:</Typography>
                            <Typography>{tripDetails.eco_trip_code}</Typography>
                        </Grid>
                    </Grid>

                    <Box mt={4} textAlign="center">
                        <Button
                            variant="contained"
                            color="primary"
                            href={`http://localhost:3001/pdf/${tripDetails.eco_trip_code}.pdf`}
                            target="_blank"
                        >
                            Download PDF
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default EndUserTripDetails;