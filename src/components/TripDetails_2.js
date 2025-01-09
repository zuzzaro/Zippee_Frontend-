// File: src/components/TripDetails.js - v1

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import TripDetailsCommon from './TripDetailsCommon'; // Importa il componente condiviso

function TripDetails() {
    const { tripId } = useParams(); // Ottieni l'ID del viaggio dall'URL
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Effettua la richiesta per ottenere i dettagli del viaggio
    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/trips/${tripId}`
                );

                setTripDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trip details:', error);
                setError('Error fetching trip details.');
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" mt={5} gutterBottom>
                Trip Details
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" align="center" color="error">
                    {error}
                </Typography>
            ) : (
                <TripDetailsCommon
                    tripDetails={tripDetails}
                    isEditable={false} // Imposta isEditable su false per la view pubblica
                />
            )}
        </Container>
    );
}

export default TripDetails;