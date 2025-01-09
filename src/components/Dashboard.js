import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Dashboard() {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [error, setError] = useState('');

    // Effettua il logout e rimuove il token
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Recupera la lista dei partner al caricamento della pagina
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            axios.get('http://localhost:3000/api/partners', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setPartners(response.data);
            })
            .catch((error) => {
                console.error(error);
                setError('Errore nel recupero della lista dei partner');
            });
        }
    }, [navigate]);

    // Gestisce il clic su una riga della tabella per navigare ai dettagli del partner
    const handleRowClick = (partnerId) => {
        navigate(`/dashboard/partner/${partnerId}`);
    };

    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Dashboard Manager
                </Typography>

                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Partner List
                    </Typography>
                    {error && (
                        <Typography variant="body2" color="error" align="center" mt={2}>
                            {error}
                        </Typography>
                    )}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Company Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {partners.map(partner => (
                                    <TableRow
                                        key={partner.id}
                                        hover
                                        onClick={() => handleRowClick(partner.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{partner.id}</TableCell>
                                        <TableCell>{partner.company_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Container>
    );
}

export default Dashboard;