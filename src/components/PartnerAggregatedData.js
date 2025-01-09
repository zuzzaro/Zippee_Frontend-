// File: src/components/PartnerAggregatedData.js -v1

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Paper, Grid } from '@mui/material';
import axios from 'axios';

function PartnerAggregatedData() {
    const [aggregatedData, setAggregatedData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Effettua la richiesta per ottenere i dati aggregati
    useEffect(() => {
        const fetchAggregatedData = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica il token JWT
                const partnerId = decodedToken.partner_id;

                const response = await axios.get(
                    `http://localhost:3000/api/partners/${partnerId}/aggregated-data`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                setAggregatedData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching aggregated data:', error);
                setError('Errore durante il recupero dei dati aggregati.');
                setLoading(false);
            }
        };

        fetchAggregatedData();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" mt={5} gutterBottom>
                Partner Aggregated Data
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" align="center" color="error">
                    {error}
                </Typography>
            ) : aggregatedData ? (
                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                    <Grid container spacing={3}>
                        {/* Numero di viaggi inseriti */}
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography variant="h6" gutterBottom>
                                    Total Trips
                                </Typography>
                                <Typography variant="h4" color="primary">
                                    {aggregatedData.totalTrips}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Viaggi con Carbon Cancelling Code */}
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography variant="h6" gutterBottom>
                                    Trips with Carbon Code
                                </Typography>
                                <Typography variant="h4" color="secondary">
                                    {aggregatedData.tripsWithCarbonCode}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Totale numero di persone */}
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography variant="h6" gutterBottom>
                                    Total People
                                </Typography>
                                <Typography variant="h4" color="success">
                                    {aggregatedData.totalPeople}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <Typography variant="body1" align="center">
                    Nessun dato trovato.
                </Typography>
            )}
        </Container>
    );
}

export default PartnerAggregatedData;