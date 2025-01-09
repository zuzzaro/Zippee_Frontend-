// File: src/components/PartnerTripHistory.js - v3
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Box
} from '@mui/material';
import axios from 'axios';

function PartnerTripHistory() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Effettua la richiesta per ottenere i viaggi del partner
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica il token JWT
                const partnerId = decodedToken.partner_id;

                const response = await axios.get(
                    `http://localhost:3000/api/partners/${partnerId}/trips`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                setTrips(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trips:', error);
                setError('Errore durante il recupero dei viaggi.');
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" mt={5} gutterBottom>
                Partner Trip History
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" align="center" color="error">
                    {error}
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Number of People</TableCell>
                                <TableCell>Creation Date</TableCell>
                                <TableCell>Eco trip code</TableCell> {/* Nuova colonna */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell>{trip.id}</TableCell>
                                    <TableCell>{trip.num_persone}</TableCell>
                                    <TableCell>
                                        {new Date(trip.created_at).toLocaleString()}
                                    </TableCell>
                                    <TableCell>{trip.eco_trip_code}</TableCell> {/* Nuova colonna */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}

export default PartnerTripHistory;