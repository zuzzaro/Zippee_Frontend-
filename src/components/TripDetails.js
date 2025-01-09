// zippee-frontend - File: src/components/TripDetails.js - v3
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTripDetails = async () => {
            // Debug info
            console.log('TripDetails - Debug Info:');
            console.log('tripId:', tripId);
            console.log('token:', localStorage.getItem('token'));
            console.log('partnerId:', localStorage.getItem('partnerId'));

            try {
                const token = localStorage.getItem('token');
                const partnerId = localStorage.getItem('partnerId');
                
                if (!token) {
                    console.log('Token mancante');
                    setError('Sessione scaduta. Effettua nuovamente il login.');
                    setLoading(false);
                    return;
                }

                if (!partnerId) {
                    console.log('PartnerId mancante');
                    setError('Informazioni partner mancanti. Effettua nuovamente il login.');
                    setLoading(false);
                    return;
                }

                // Costruisci l'URL completo
                const apiUrl = `http://localhost:3000/api/trips/${tripId}`;
                console.log('Calling API:', apiUrl);

                const response = await axios.get(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log('API Response:', response.data);
                setTripDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Errore dettagliato:', {
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data,
                    config: {
                        url: error.config?.url,
                        method: error.config?.method,
                        headers: error.config?.headers
                    }
                });

                if (error.response?.status === 401) {
                    setError('Sessione scaduta. Effettua nuovamente il login.');
                } else if (error.response?.status === 404) {
                    setError('Viaggio non trovato o non hai i permessi per visualizzarlo.');
                } else {
                    setError(`Errore nel recupero dei dettagli del viaggio: ${error.message}`);
                }
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

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
