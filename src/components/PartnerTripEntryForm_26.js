// zippee-frontend - File src/components/PartnerTripEntryForm.js - v26

import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Grid,
    LinearProgress
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
    const [isLoading, setIsLoading] = useState(false);

    const convertSvgToImage = async (svgElement) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);

        return new Promise((resolve) => {
            img.onload = () => {
                canvas.width = 256;
                canvas.height = 256;
                ctx.drawImage(img, 0, 0, 256, 256);
                URL.revokeObjectURL(svgUrl);
                resolve(canvas.toDataURL('image/png'));
            };
            img.src = svgUrl;
        });
    };

    useEffect(() => {
        if (qrCodeUrl) {
            const svgElement = document.querySelector('.qr-code-svg');
            if (svgElement) {
                convertSvgToImage(svgElement).then(setQrCodeDataUrl);
            }
        }
    }, [qrCodeUrl]);

    const generateEcoTripCode = () => {
        const timestamp = new Date().getTime();
        const randomSuffix = Math.floor(Math.random() * 1000);
        return `ECO-${timestamp}-${randomSuffix}`;
    };

    const generatePDF = async () => {
        if (!qrCodeDataUrl) {
            console.error('QR code image not ready');
            return null;
        }

        return pdf(
            <TripPDF
                partnerId={decodedToken?.partner_id || ''}
                partnerName={partnerName}
                numPersone={numPersone}
                dataPartenza={dataPartenza}
                returnDate={returnDate}
                ecoTripCode={ecoTripCode}
                qrCodeUrl={qrCodeDataUrl}
            />
        ).toBlob();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const code = generateEcoTripCode();
            setEcoTripCode(code);

            const token = localStorage.getItem('token');
            const decoded = JSON.parse(atob(token.split('.')[1]));
            setDecodedToken(decoded);
            const partnerId = decoded.partner_id;

            const tripData = {
                numPersone: parseInt(numPersone, 10),
                return_date: returnDate?.toISOString() || null,
                eco_trip_code: code,
                date_departure: dataPartenza?.toISOString() || null,
            };

            const response = await axios.post(
                `http://localhost:3000/api/partners/${partnerId}/trips`,
                tripData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const tripId = response.data.id;
            setTripId(tripId);

            const url = `http://localhost:3001/trip/${tripId}`;
            setQrCodeUrl(url);

            const partnerResponse = await axios.get(
                `http://localhost:3000/api/partners/me`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPartnerName(partnerResponse.data.name);

            const svgElement = document.querySelector('.qr-code-svg');
            if (svgElement) {
                const dataUrl = await convertSvgToImage(svgElement);
                setQrCodeDataUrl(dataUrl);
            }

            const pdfBlob = await generatePDF();
            if (pdfBlob) {
                const reader = new FileReader();
                reader.readAsDataURL(pdfBlob);
                reader.onloadend = async () => {
                    const base64Data = reader.result.split(',')[1];

                    const saveResponse = await axios.post(
                        'http://localhost:3000/api/save-pdf',
                        { fileName: `${code}.pdf`, pdfData: base64Data },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    setQrCodeUrl(saveResponse.data.pdfUrl);
                };
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = async () => {
        setIsLoading(true);
        try {
            const pdfBlob = await generatePDF();
            if (pdfBlob) {
                window.open(URL.createObjectURL(pdfBlob), '_blank');
            }
        } finally {
            setIsLoading(false);
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
                                    onChange={setDataPartenza}
                                    slotProps={{
                                        textField: { fullWidth: true, margin: 'normal', required: true },
                                    }}
                                />
                                <DatePicker
                                    label="Return Date"
                                    value={returnDate}
                                    onChange={setReturnDate}
                                    slotProps={{
                                        textField: { fullWidth: true, margin: 'normal', required: true },
                                    }}
                                />
                                <Box mt={2}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                                        {isLoading ? <LinearProgress /> : 'Confirm Data'}
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
                                                onClick={handlePrint}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <LinearProgress /> : 'Print'}
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