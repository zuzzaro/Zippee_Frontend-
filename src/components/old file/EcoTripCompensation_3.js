// File: src/components/EcoTripCompensation.js - v4
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    CircularProgress,
    Button,
    TextField,
    Grid
} from '@mui/material';
import axios from 'axios';

function EcoTripCompensation() {
    const { tripId } = useParams(); // Ottieni l'ID del viaggio dall'URL
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Stato per abilitare la modifica
    const [carbonCancellingCode, setCarbonCancellingCode] = useState(''); // Stato per il campo modificabile
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
                setCarbonCancellingCode(response.data.carbon_cancelling_code); // Inizializza il campo
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trip details:', error);
                setError('Errore durante il recupero dei dettagli del viaggio.');
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    // Funzione per abilitare la modifica del campo
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Funzione per salvare le modifiche
    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:3000/api/partners/trips/${tripId}/update-carbon-cancelling`,
                { carbon_cancelling_code: carbonCancellingCode },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            // Aggiorna i dettagli del viaggio con i nuovi dati
            setTripDetails(response.data);
            setIsEditing(false); // Disabilita la modifica
        } catch (error) {
            console.error('Error updating carbon cancelling code:', error);
            setError('Errore durante l\'aggiornamento del Carbon Cancelling Code.');
        }
    };

    // Funzione per tornare alla view Eco Trip
    const handleExit = () => {
        navigate('/dashboard/eco-trip');
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" mt={5} gutterBottom>
                Eco Trip Details
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">ID: {tripDetails.id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Partner ID: {tripDetails.partner_id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">N° People: {tripDetails.num_persone}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Creation Date: {new Date(tripDetails.created_at).toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Eco Trip Code: {tripDetails.eco_trip_code}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Date Departure: {tripDetails.date_departure}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Date Return: {tripDetails.return_date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    label="Carbon Cancelling Code"
                                    value={carbonCancellingCode}
                                    onChange={(e) => setCarbonCancellingCode(e.target.value)}
                                />
                            ) : (
                                <Typography variant="h6">
                                    Carbon Cancelling Code: {tripDetails.carbon_cancelling_code}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Box mt={3} display="flex" justifyContent="space-between">
                        {isEditing ? (
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleEditClick}>
                                Edit Carbon Cancelling
                            </Button>
                        )}
                        <Button variant="contained" color="secondary" onClick={handleExit}>
                            Exit
                        </Button>
                    </Box>
                </Paper>
            ) : null}
        </Container>
    );
}

export default EcoTripCompensation;