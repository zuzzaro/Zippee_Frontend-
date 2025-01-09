// zippee-frontend - File src/components/PartnerTripEntryForm.js - v19

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
import { QRCodeSVG } from 'qrcode.react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TripPDF from './TripPDF'; // Importa il componente PDF

function PartnerTripEntryForm() {
    const [numPersone, setNumPersone] = useState('');
    const [dataPartenza, setDataPartenza] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [ecoTripCode, setEcoTripCode] = useState('');
    const [tripId, setTripId] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [partnerName, setPartnerName] = useState(''); // Stato per il nome del partner

    // Funzione per generare il codice EcoTrip
    const generateEcoTripCode = () => {
        const timestamp = new Date().getTime();
        const randomSuffix = Math.floor(Math.random() * 1000);
        return `ECO-${timestamp}-${randomSuffix}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const code = generateEcoTripCode();
        setEcoTripCode(code);

        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const partnerId = decodedToken.partner_id;

        const tripData = {
            numPersone: parseInt(numPersone, 10),
            return_date: returnDate ? returnDate.toISOString() : null,
            eco_trip_code: code,
            date_departure: dataPartenza ? dataPartenza.toISOString() : null,
        };

        try {
            const response = await axios.post(
                `http://localhost:3000/api/partners/${partnerId}/trips`,
                tripData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            const tripId = response.data.id;
            const url = `http://localhost:3001/trip/${tripId}`;
            setTripId(tripId);
            setQrCodeUrl(url);

            // Recupera il nome del partner (esempio)
            const partnerResponse = await axios.get(`http://localhost:3000/api/partners/${partnerId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setPartnerName(partnerResponse.data.name);
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
                            {/* Colonna di sinistra: Form */}
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
                                <DatePicker
                                    label="Departure Date"
                                    value={dataPartenza}
                                    onChange={(newValue) => setDataPartenza(newValue)}
                                    slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
                                />
                                <DatePicker
                                    label="Return Date"
                                    value={returnDate}
                                    onChange={(newValue) => setReturnDate(newValue)}
                                    slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
                                />
                                <Box mt={2}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Confirm Data
                                    </Button>
                                </Box>
                            </Grid>

                            {/* Colonna di destra: EcoTrip Code e QR Code */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="EcoTrip Code"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={ecoTripCode}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                {qrCodeUrl && (
                                    <Box mt={4} textAlign="center">
                                        <Typography variant="h6" gutterBottom>
                                            QR Code per il Viaggio
                                        </Typography>
                                        <QRCodeSVG
                                            value={qrCodeUrl}
                                            size={256}
                                        />
                                        <Box mt={2}>
                                            {/* Bottone per scaricare il PDF */}
                                            <PDFDownloadLink
                                                document={
                                                    <TripPDF
                                                        partnerId={decodedToken.partner_id}
                                                        partnerName={partnerName}
                                                        numPersone={numPersone}
                                                        dataPartenza={dataPartenza}
                                                        returnDate={returnDate}
                                                        ecoTripCode={ecoTripCode}
                                                        qrCodeUrl={qrCodeUrl}
                                                    />
                                                }
                                                fileName="trip_details.pdf"
                                            >
                                                {({ loading }) =>
                                                    loading ? 'Generating PDF...' : 'Print'
                                                }
                                            </PDFDownloadLink>
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </LocalizationProvider>
    );
}

export default PartnerTripEntryForm;