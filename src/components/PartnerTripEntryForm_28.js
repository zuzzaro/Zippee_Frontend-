// zippee-frontend - File src/components/PartnerTripEntryForm.js - v25

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
import { pdf } from '@react-pdf/renderer';
import TripPDF from './TripPDF';

function PartnerTripEntryForm() {
    const [numPersone, setNumPersone] = useState('');
    const [dataPartenza, setDataPartenza] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [ecoTripCode, setEcoTripCode] = useState('');
    const [tripId, setTripId] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [decodedToken, setDecodedToken] = useState(null);

    // Funzione per convertire SVG in immagine
    const convertSvgToImage = (svgElement) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            // Converti SVG in data URL
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(svgUrl);
                resolve(canvas.toDataURL('image/png'));
            };
            
            img.src = svgUrl;
        });
    };

    // Effetto per convertire il QR code in immagine quando l'URL cambia
    useEffect(() => {
        if (qrCodeUrl) {
            const svgElement = document.querySelector('.qr-code-svg');
            if (svgElement) {
                convertSvgToImage(svgElement).then(dataUrl => {
                    setQrCodeDataUrl(dataUrl);
                });
            }
        }
    }, [qrCodeUrl]);

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
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setDecodedToken(decoded);
        const partnerId = decoded.partner_id;

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

            const partnerResponse = await axios.get(`http://localhost:3000/api/partners/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setPartnerName(partnerResponse.data.name);

            // Aspetta che il QR code sia convertito in immagine
            await new Promise(resolve => setTimeout(resolve, 100));

            const pdfBlob = await pdf(
                <TripPDF
                    partnerId={decodedToken ? decodedToken.partner_id : ''}
                    partnerName={partnerName}
                    numPersone={numPersone}
                    dataPartenza={dataPartenza}
                    returnDate={returnDate}
                    ecoTripCode={code}
                    qrCodeUrl={qrCodeDataUrl}
                />
            ).toBlob();

            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            reader.onloadend = async () => {
                const base64Data = reader.result.split(',')[1];

                const saveResponse = await axios.post(
                    'http://localhost:3000/api/save-pdf',
                    {
                        fileName: `${code}.pdf`,
                        pdfData: base64Data,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                setQrCodeUrl(saveResponse.data.pdfUrl);
            };
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
                                            className="qr-code-svg"
                                        />
                                        <Box mt={2}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={async () => {
                                                    // Aspetta che il QR code sia convertito in immagine
                                                    await new Promise(resolve => setTimeout(resolve, 100));
                                                    
                                                    const pdfBlob = await pdf(
                                                        <TripPDF
                                                            partnerId={decodedToken ? decodedToken.partner_id : ''}
                                                            partnerName={partnerName}
                                                            numPersone={numPersone}
                                                            dataPartenza={dataPartenza}
                                                            returnDate={returnDate}
                                                            ecoTripCode={ecoTripCode}
                                                            qrCodeUrl={qrCodeDataUrl}
                                                        />
                                                    ).toBlob();
                                                    window.open(URL.createObjectURL(pdfBlob), '_blank');
                                                }}
                                            >
                                                Print
                                            </Button>
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