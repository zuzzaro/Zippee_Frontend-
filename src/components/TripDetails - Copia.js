// zippee-frontend - File: src/components/TripDetails.js - v3
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import axios from 'axios';
import TripDetailsCommon from './TripDetailsCommon';

function TripDetails() {
    const { tripId } = useParams();
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                // Ottieni il token dal localStorage (salvato durante il login partner)
                const token = localStorage.getItem('partnerToken');
                
                if (!token) {
                    setError('Sessione scaduta. Effettua nuovamente il login.');
                    setLoading(false);
                    return;
                }

                // Ottieni il partner_id dal token decodificato (se necessario)
                const partnerId = localStorage.getItem('partnerId');
                
                const response = await axios.get(
                    `http://localhost:3000/api/partners/${partnerId}/trips/${tripId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                
                setTripDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Errore nel recupero dei dettagli del viaggio:', error);
                if (error.response?.status === 404) {
                    setError('Viaggio non trovato o non hai i permessi per visualizzarlo.');
                } else if (error.response?.status === 401) {
                    setError('Sessione scaduta. Effettua nuovamente il login.');
                    // Opzionalmente, reindirizza al login
                    // window.location.href = '/partner/login';
                } else {
                    setError('Errore nel recupero dei dettagli del viaggio. Riprova più tardi.');
                }
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    if (!tripDetails && !loading && !error) {
        return (
            <Container maxWidth="md">
                <Alert severity="warning">
                    Nessun dato disponibile per questo viaggio.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dettagli Viaggio
                </Typography>
                
                {loading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                ) : tripDetails ? (
                    <TripDetailsCommon tripDetails={tripDetails} />
                ) : null}
            </Box>
        </Container>
    );
}

export default TripDetails;
