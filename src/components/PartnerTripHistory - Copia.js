// File: src/components/PartnerTripHistory.js - v4
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
    Select,
    MenuItem,
    Pagination,
    Button,
    FormControl,
    InputLabel
} from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver'; // Libreria per il download dei file

function PartnerTripHistory() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [filter, setFilter] = useState('all'); // Filtro: all, with_code, without_code
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    // Funzione per ordinare i viaggi
    const sortedTrips = React.useMemo(() => {
        let sortableTrips = [...trips];
        if (sortConfig.key) {
            sortableTrips.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableTrips;
    }, [trips, sortConfig]);

    // Funzione per gestire il filtro
    const filteredTrips = React.useMemo(() => {
        return sortedTrips.filter(trip => {
            if (filter === 'with_code') {
                return trip.carbon_cancelling_code !== null;
            } else if (filter === 'without_code') {
                return trip.carbon_cancelling_code === null;
            } else {
                return true; // Mostra tutti i viaggi
            }
        });
    }, [sortedTrips, filter]);

    // Funzione per gestire il cambio di pagina
    const paginatedTrips = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTrips.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTrips, currentPage]);

    // Funzione per esportare i dati in CSV
    const exportToCSV = () => {
        const headers = ['ID', 'Number of People', 'Creation Date', 'Eco trip code'];
        const csvData = [
            headers.join(','),
            ...filteredTrips.map(trip => [
                trip.id,
                trip.num_persone,
                new Date(trip.created_at).toLocaleString(),
                trip.eco_trip_code
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'trips.csv');
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" mt={5} gutterBottom>
                Partner Trip History
            </Typography>

            {/* Filtro e pulsante di esportazione */}
            <Box display="flex" justifyContent="space-between" mb={3}>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel>Filtra viaggi</InputLabel>
                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        label="Filtra viaggi"
                    >
                        <MenuItem value="all">Tutti i viaggi</MenuItem>
                        <MenuItem value="with_code">Con certificato</MenuItem>
                        <MenuItem value="without_code">Senza certificato</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={exportToCSV}>
                    Esporta CSV
                </Button>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" align="center" color="error">
                    {error}
                </Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell onClick={() => setSortConfig({ key: 'id', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                                        ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </TableCell>
                                    <TableCell onClick={() => setSortConfig({ key: 'num_persone', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                                        Number of People {sortConfig.key === 'num_persone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </TableCell>
                                    <TableCell onClick={() => setSortConfig({ key: 'created_at', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                                        Creation Date {sortConfig.key === 'created_at' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </TableCell>
                                    <TableCell onClick={() => setSortConfig({ key: 'eco_trip_code', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                                        Eco trip code {sortConfig.key === 'eco_trip_code' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedTrips.map((trip) => (
                                    <TableRow key={trip.id}>
                                        <TableCell>{trip.id}</TableCell>
                                        <TableCell>{trip.num_persone}</TableCell>
                                        <TableCell>
                                            {new Date(trip.created_at).toLocaleString()}
                                        </TableCell>
                                        <TableCell>{trip.eco_trip_code}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Paginazione */}
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Pagination
                            count={Math.ceil(filteredTrips.length / itemsPerPage)}
                            page={currentPage}
                            onChange={(event, page) => setCurrentPage(page)}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </Container>
    );
}

export default PartnerTripHistory;