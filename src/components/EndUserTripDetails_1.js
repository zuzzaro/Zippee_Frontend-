// zippee-frontend - File src/components/EndUserTripDetails.js - v1

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const { tripId } = useParams(); // Ottieni l'ID del viaggio dall'URL
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Effetto per recuperare i dettagli del viaggio
    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/trips/${tripId}`);
                setTripDetails(response.data);
                setLoading(false);
            } catch (err) {
                setError('Errore durante il recupero dei dettagli del viaggio.');
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    // Se è in corso il caricamento, mostra uno spinner
    if (loading) {
        return (
            <Container>
                <Box mt={5} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    // Se c'è un errore, mostra un messaggio di errore
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

    // Se i dettagli del viaggio sono stati recuperati, mostra la pagina
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