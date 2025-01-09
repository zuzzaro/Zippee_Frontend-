// zippee-frontend - File:src/components/PartnerHome.js - v4
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, useTheme } from '@mui/material';

function PartnerHome() {
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
     const theme = useTheme();

    useEffect(() => {
        const fetchPartnerData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Non autenticato");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get('http://localhost:3000/api/partners/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPartner(response.data);
                 setLoading(false);
            } catch (error) {
                console.error(error);
                setError("Errore nel recupero delle informazioni");
                setLoading(false);
            }
        };
        fetchPartnerData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h6" align="center" color="error" gutterBottom>
                        {error}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome, {partner && partner.name}
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Here are some important messages from Zippee:
                </Typography>
                 <Box mt={2} p={3}  borderRadius={2}
                 sx={{
                     bgcolor: theme.palette.mode === 'dark' ? '#333' : '#f0f0f0',
                     color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                 }}
                 >
                    <Typography variant="body1" >
                        {partner && partner.manager_message}
                    </Typography>
                 </Box>
            </Box>
        </Container>
    );
}

export default PartnerHome;