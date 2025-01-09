// File: src/components/EcoTripCompensation.js - v7
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
    Grid,
    Snackbar,
    Alert
} from '@mui/material';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react'; // Importa QRCodeSVG

function EcoTripCompensation() {
    const { tripId } = useParams();
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [carbonCancellingCode, setCarbonCancellingCode] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
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
                setCarbonCancellingCode(response.data.carbon_cancelling_code);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trip details:', error);
                setError('Error fetching trip details.');
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    // Funzione per mostrare il messaggio
    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // Funzione per chiudere il messaggio
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Funzione per abilitare la modifica del campo
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Funzione per salvare le modifiche
    const handleSubmit = async () => {
        if (window.confirm('Are you sure you want to save the changes?')) {
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

                setTripDetails(response.data);
                setIsEditing(false);
                showSnackbar('Changes saved successfully!');
            } catch (error) {
                console.error('Error updating carbon cancelling code:', error);
                setError('Error updating Carbon Cancelling Code.');
                showSnackbar('Error updating Carbon Cancelling Code.');
            }
        }
    };

    // Funzione per tornare alla view Eco Trip
    const handleExit = () => {
        navigate('/dashboard/eco-trip');
    };

    // Verifica se tutti i campi obbligatori sono compilati
    const areAllFieldsValid = () => {
        return (
            tripDetails &&
            tripDetails.id &&
            tripDetails.partner_id &&
            tripDetails.num_persone &&
            tripDetails.created_at &&
            tripDetails.eco_trip_code &&
            tripDetails.date_departure &&
            tripDetails.return_date &&
            tripDetails.carbon_cancelling_code
        );
    };

    // Genera il contenuto del QR code
    const generateQRContent = () => {
        if (!tripDetails) return '';
        return JSON.stringify({
            id: tripDetails.id,
            partner_id: tripDetails.partner_id,
            eco_trip_code: tripDetails.eco_trip_code,
            carbon_cancelling_code: tripDetails.carbon_cancelling_code,
        });
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
                        {/* Campi del viaggio */}
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

                        {/* QR Code */}
                        {areAllFieldsValid() && (
                            <Grid item xs={12} display="flex" justifyContent="center">
                                <Box mt={3}>
                                    <Typography variant="h6" align="center" gutterBottom>
                                        QR Code
                                    </Typography>
                                    <QRCodeSVG value={generateQRContent()} size={200} /> {/* Usa QRCodeSVG */}
                                </Box>
                            </Grid>
                        )}
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

            {/* Snackbar per i messaggi */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default EcoTripCompensation;