// File: src/components/PartnerProfileManagement.js - v3
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    CircularProgress,
    Box
} from '@mui/material';
import axios from 'axios';

function PartnerProfileManagement() {
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Effettua la richiesta per ottenere i dettagli del partner
    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:3000/api/partners/me',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                setPartner(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching partner details:', error);
                setError('Errore durante il recupero dei dettagli del partner.');
                setLoading(false);
            }
        };

        fetchPartnerDetails();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" mt={5} gutterBottom>
                Partner Profile Management
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" align="center" color="error">
                    {error}
                </Typography>
            ) : partner ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell>{partner.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell>{partner.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Company Name</strong></TableCell>
                                <TableCell>{partner.company_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Phone Number</strong></TableCell>
                                <TableCell>{partner.phone_number}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Address</strong></TableCell>
                                <TableCell>{partner.address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Creation Date</strong></TableCell>
                                <TableCell>
                                    {new Date(partner.created_at).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" align="center">
                    Nessun dato trovato.
                </Typography>
            )}
        </Container>
    );
}

export default PartnerProfileManagement;