// File: src/components/EcoTripCompensation.js - v11
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
    Alert,
    IconButton
} from '@mui/material';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

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
                        {/* Colonna sinistra: Dettagli del viaggio */}
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                {/* ID */}
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            ID:
                                        </Typography>
                                        <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                                            {tripDetails.id}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Partner ID e Company Name */}
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Partner:
                                        </Typography>
                                        <Typography variant="body1" sx={{ ml: 1 }}>
                                            {tripDetails.partner_id} - {tripDetails.company_name}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* N° People */}
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            N° People:
                                        </Typography>
                                        <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                                            {tripDetails.num_persone}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Creation Date */}
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Creation Date:
                                        </Typography>
                                        <Typography variant="body1" sx={{ ml: 1 }}>
                                            {new Date(tripDetails.created_at).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Eco Trip Code */}
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Eco Trip Code:
                                        </Typography>
                                        <Typography variant="body1" sx={{ ml: 1 }}>
                                            {tripDetails.eco_trip_code}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Date Departure */}
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Date Departure:
                                        </Typography>
                                        <Typography variant="body1" sx={{ ml: 1 }}>
                                            {tripDetails.date_departure}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Date Return */}
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Date Return:
                                        </Typography>
                                        <Typography variant="body1" sx={{ ml: 1 }}>
                                            {tripDetails.return_date}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Carbon Cancelling Code */}
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Carbon Cancelling Code:
                                        </Typography>
                                        {isEditing ? (
                                            <TextField
                                                size="small"
                                                value={carbonCancellingCode}
                                                onChange={(e) => setCarbonCancellingCode(e.target.value)}
                                                sx={{ ml: 1 }}
                                            />
                                        ) : (
                                            <Typography variant="body1" sx={{ ml: 1 }}>
                                                {tripDetails.carbon_cancelling_code}
                                            </Typography>
                                        )}
                                        <IconButton onClick={handleEditClick} sx={{ ml: 1 }}>
                                            Edit
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Colonna destra: QR Code (solo su schermi grandi) */}
                        {areAllFieldsValid() && (
                            <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="flex-start">
                                <Box mt={{ xs: 3, md: 0 }}>
                                    <Typography variant="h6" align="center" gutterBottom>
                                        QR Code
                                    </Typography>
                                    <QRCodeSVG value={generateQRContent()} size={200} />
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleExit}
                            sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.600' } }}
                        >
                            Exit
                        </Button>
                        {isEditing && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        )}
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