// File: src/components/EcoTripCompensation.js - v1
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    CircularProgress,
    Button
} from '@mui/material';
import axios from 'axios';

function EcoTripCompensation() {
    const { tripId } = useParams(); // Ottieni l'ID del viaggio dall'URL
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Effettua la richiesta per ottenere i dettagli del viaggio
    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:3000/api/partners/trips/${tripId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                setTripDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trip details:', error);
                setError('Errore durante il recupero dei dettagli del viaggio.');
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    // Funzione per tornare alla tabella
    const handleBack = () => {
        navigate('/ecotrip');
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" mt={5} gutterBottom>
                Dettagli Eco Trip
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" align="center" color="error">
                    {error}
                </Typography>
            ) : tripDetails ? (
                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6">ID: {tripDetails.id}</Typography>
                    <Typography variant="h6">Partner ID: {tripDetails.partner_id}</Typography>
                    <Typography variant="h6">N° People: {tripDetails.num_persone}</Typography>
                    <Typography variant="h6">
                        Creation Date: {new Date(tripDetails.created_at).toLocaleString()}
                    </Typography>
                    <Typography variant="h6">Eco Trip Code: {tripDetails.eco_trip_code}</Typography>
                    <Typography variant="h6">Date Departure: {tripDetails.date_departure}</Typography>
                    <Typography variant="h6">Date Return: {tripDetails.return_date}</Typography>
                    <Typography variant="h6">
                        Carbon Cancelling Code: {tripDetails.carbon_cancelling_code}
                    </Typography>
                    <Box mt={3}>
                        <Button variant="contained" onClick={handleBack}>
                            Torna alla Tabella
                        </Button>
                    </Box>
                </Paper>
            ) : null}
        </Container>
    );
}

export default EcoTripCompensation;