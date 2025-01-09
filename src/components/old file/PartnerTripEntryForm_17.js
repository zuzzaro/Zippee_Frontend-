// File: src/components/PartnerTripEntryForm.js - v17
import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react'; // Import per il codice QR

function PartnerTripEntryForm() {
    const [numPersone, setNumPersone] = useState('');
    const [dataPartenza, setDataPartenza] = useState(null);
    const [returnDate, setReturnDate] = useState(null); // Nuovo stato per Return Date
    const [ecoTripCode, setEcoTripCode] = useState(''); // Stato per EcoTrip Code
    const [tripId, setTripId] = useState(null); // Stato per l'ID del viaggio
    const [qrCodeUrl, setQrCodeUrl] = useState(''); // Stato per l'URL del codice QR

    // Funzione per generare il codice EcoTrip
    const generateEcoTripCode = () => {
        const timestamp = new Date().getTime(); // Ottieni il timestamp corrente
        const randomSuffix = Math.floor(Math.random() * 1000); // Aggiungi un suffisso casuale
        return `ECO-${timestamp}-${randomSuffix}`; // Formato del codice
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Genera il codice EcoTrip
        const code = generateEcoTripCode();
        setEcoTripCode(code); // Visualizza il codice a video

        // Ottieni l'ID del partner dal token JWT
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica il token JWT
        const partnerId = decodedToken.partner_id;

        // Prepara i dati da inviare
        const tripData = {
            numPersone: parseInt(numPersone, 10), // Converti in numero
            return_date: returnDate ? returnDate.toISOString() : null, // Usiamo return_date
            eco_trip_code: code, // Invia il codice EcoTrip
            date_departure: dataPartenza ? dataPartenza.toISOString() : null, // Invia la data di partenza
        };
        console.log('Dati inviati al backend:', tripData); // Stampa i dati inviati

        try {
            const response = await axios.post(
                `http://localhost:3000/api/partners/${partnerId}/trips`, // Usa il nuovo endpoint
                tripData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Invia il token JWT
                    },
                }
            );
            console.log('Trip created:', response.data); // Stampa la risposta del backend

            // Salva l'ID del viaggio e genera l'URL per il codice QR
            const tripId = response.data.id; // Verifica che l'ID sia presente nella risposta
            console.log('Trip ID:', tripId); // Stampa l'ID del viaggio
            const url = `http://localhost:3001/trip/${tripId}`; // Usa un URL fisso per il debug
            console.log('QR Code URL:', url); // Stampa l'URL del codice QR
            setTripId(tripId);
            setQrCodeUrl(url);
        } catch (error) {
            console.error('Error creating trip:', error);
        }
    };

    // Debug per lo stato qrCodeUrl
    useEffect(() => {
        console.log('QR Code URL updated:', qrCodeUrl); // Stampa l'URL del codice QR quando cambia
    }, [qrCodeUrl]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Trip Entry Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Number of People"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    value={numPersone}
                                    onChange={(e) => setNumPersone(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    label="Departure Date"
                                    value={dataPartenza}
                                    onChange={(newValue) => setDataPartenza(newValue)}
                                    slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    label="Return Date"
                                    value={returnDate}
                                    onChange={(newValue) => setReturnDate(newValue)}
                                    slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box mt={2}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="EcoTrip Code"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={ecoTripCode}
                                    InputProps={{
                                        readOnly: true, // Rendi il campo di sola lettura
                                    }}
                                />
                            </Grid>

                            {/* Visualizzazione del codice QR */}
                            {qrCodeUrl && (
                                <Grid item xs={12}>
                                    <Box mt={4} textAlign="center">
                                        <Typography variant="h6" gutterBottom>
                                            QR Code per il Viaggio
                                        </Typography>
                                        <QRCodeSVG
                                            value={qrCodeUrl}
                                            size={256}
                                        />
                                        <Box mt={2}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => window.print()} // Opzione per stampare il QR code
                                            >
                                                Stampa QR Code
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </Box>
            </Container>
        </LocalizationProvider>
    );
}

export default PartnerTripEntryForm;