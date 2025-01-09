// zippee-frontend - File:src/components/PartnerHome.js - v1
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

function PartnerHome() {
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchPartnerData = async () => {
            const token = localStorage.getItem('token');
             if (!token) {
                 setError("Non autenticato");
                setLoading(false)
                return
            }
            try {
                const response = await axios.get('http://localhost:3000/api/auth/me', {
                     headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                 if(!response.data.partner_id){
                    setError("Non sei un partner");
                   setLoading(false)
                   return;
                 }
                const partnerId  = response.data.partner_id
                 const partnerResponse = await axios.get(`http://localhost:3000/api/partners/${partnerId}`, {
                     headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPartner(partnerResponse.data);
                 setLoading(false);
            } catch (error) {
                 console.error(error)
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
                 <Box mt={2} p={3} bgcolor="#f0f0f0" borderRadius={2}>
                    <Typography variant="body1" >
                        {"No new messages from your manager"}
                    </Typography>
                 </Box>
            </Box>
        </Container>
    );
}

export default PartnerHome;