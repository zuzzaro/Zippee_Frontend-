// File: src/components/EcoTrip.js - v4
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
    Box,
    TableSortLabel
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EcoTrip() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [orderBy, setOrderBy] = useState('id');
    const [order, setOrder] = useState('asc');
    const navigate = useNavigate();

    // Effettua la richiesta per ottenere tutti i viaggi
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:3000/api/partners/trips',
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
                setError('Error fetching trips.');
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    // Funzione per gestire l'ordinamento
    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Funzione per ordinare i dati
    const sortedTrips = trips.sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] > b[orderBy] ? 1 : -1;
        } else {
            return a[orderBy] < b[orderBy] ? 1 : -1;
        }
    });

    // Funzione per gestire il click sulla riga
    const handleRowClick = (tripId) => {
        navigate(`/dashboard/eco-trip/${tripId}`);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" mt={5} gutterBottom>
                Eco Trip
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
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'id'}
                                        direction={orderBy === 'id' ? order : 'asc'}
                                        onClick={() => handleSort('id')}
                                    >
                                        ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'partner_id'}
                                        direction={orderBy === 'partner_id' ? order : 'asc'}
                                        onClick={() => handleSort('partner_id')}
                                    >
                                        Partner ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'company_name'}
                                        direction={orderBy === 'company_name' ? order : 'asc'}
                                        onClick={() => handleSort('company_name')}
                                    >
                                        Company Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'num_persone'}
                                        direction={orderBy === 'num_persone' ? order : 'asc'}
                                        onClick={() => handleSort('num_persone')}
                                    >
                                        N° People
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'created_at'}
                                        direction={orderBy === 'created_at' ? order : 'asc'}
                                        onClick={() => handleSort('created_at')}
                                    >
                                        Creation Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'eco_trip_code'}
                                        direction={orderBy === 'eco_trip_code' ? order : 'asc'}
                                        onClick={() => handleSort('eco_trip_code')}
                                    >
                                        Eco Trip Code
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'carbon_cancelling_code'}
                                        direction={orderBy === 'carbon_cancelling_code' ? order : 'asc'}
                                        onClick={() => handleSort('carbon_cancelling_code')}
                                    >
                                        Carbon Cancelling Code
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedTrips.map((trip) => (
                                <TableRow
                                    key={trip.id}
                                    hover
                                    onClick={() => handleRowClick(trip.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>{trip.id}</TableCell>
                                    <TableCell>{trip.partner_id}</TableCell>
                                    <TableCell>{trip.company_name}</TableCell>
                                    <TableCell>{trip.num_persone}</TableCell>
                                    <TableCell>
                                        {new Date(trip.created_at).toLocaleString()}
                                    </TableCell>
                                    <TableCell>{trip.eco_trip_code}</TableCell>
                                    <TableCell>{trip.carbon_cancelling_code}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}

export default EcoTrip;