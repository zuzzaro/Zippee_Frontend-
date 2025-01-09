import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';

function PartnerTripEntryForm() {
    const [numPersone, setNumPersone] = useState('');
    const [tipoTratta, setTipoTratta] = useState('');
    const [mezzoTrasporto, setMezzoTrasporto] = useState('');
    const [cittaPartenza, setCittaPartenza] = useState('');
    const [cittaArrivo, setCittaArrivo] = useState('');
    const [dataPartenza, setDataPartenza] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const tripData = {
            numPersone,
            tipoTratta,
            mezzoTrasporto,
            cittaPartenza,
            cittaArrivo,
            dataPartenza: dataPartenza ? dataPartenza.toISOString() : null, // Converti la data in formato ISO
        };

        try {
            const response = await axios.post('http://localhost:3001/api/trips', tripData);
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
                                <FormControl fullWidth margin="normal" required>
                                    <InputLabel id="tipo-tratta-label">Type of Route</InputLabel>
                                    <Select
                                        labelId="tipo-tratta-label"
                                        id="tipo-tratta"
                                        value={tipoTratta}
                                        label="Type of Route"
                                        onChange={(e) => setTipoTratta(e.target.value)}
                                    >
                                        <MenuItem value={"andata"}>One way</MenuItem>
                                        <MenuItem value={"ritorno"}>Round trip</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth margin="normal" required>
                                    <InputLabel id="mezzo-trasporto-label">Means of Transport</InputLabel>
                                    <Select
                                        labelId="mezzo-trasporto-label"
                                        id="mezzo-trasporto"
                                        value={mezzoTrasporto}
                                        label="Means of Transport"
                                        onChange={(e) => setMezzoTrasporto(e.target.value)}
                                    >
                                        <MenuItem value={"aereo"}>Airplane</MenuItem>
                                        <MenuItem value={"treno"}>Train</MenuItem>
                                        <MenuItem value={"auto"}>Car</MenuItem>
                                        <MenuItem value={"bus"}>Bus</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Departure City"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={cittaPartenza}
                                    onChange={(e) => setCittaPartenza(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Arrival City"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={cittaArrivo}
                                    onChange={(e) => setCittaArrivo(e.target.value)}
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