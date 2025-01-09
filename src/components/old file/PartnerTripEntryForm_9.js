// File: src/components/PartnerTripEntryForm.js - v8
import React, { useState } from 'react';
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

function PartnerTripEntryForm() {
    const [numPersone, setNumPersone] = useState('');
    const [dataPartenza, setDataPartenza] = useState(null);
    const [dateOfStay, setDateOfStay] = useState(null); // Nuovo stato per Date of Stay
    const [ecoTripCode, setEcoTripCode] = useState(''); // Nuovo stato per EcoTrip Code

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
            date_of_stay: dateOfStay ? dateOfStay.toISOString() : null, // Invia la data di soggiorno
            eco_trip_code: code, // Invia il codice EcoTrip
        };

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
            console.log('Trip created:', response.data);
        } catch (error) {
            console.error('Error creating trip:', error);
        }
    };

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
                                    value={dateOfStay}
                                    onChange={(newValue) => setDateOfStay(newValue)}
                                    slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
                                />
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
                            <Grid item xs={12}>
                                <Box mt={2}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </LocalizationProvider>
    );
}

export default PartnerTripEntryForm;