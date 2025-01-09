// zippee-frontend - File:src/components/PartnerProfileManagement.js - v1
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
    CircularProgress
} from '@mui/material';

function PartnerProfileManagement() {
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

    if(loading){
         return  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
             <CircularProgress />
            </Box>
    }

    if(error) {
         return <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h6" align="center" color="error" gutterBottom>
                    {error}
                </Typography>
            </Box>
        </Container>
    }


      return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Profile Management
                </Typography>
                {partner && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={partner.name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                         <Grid item xs={12} sm={6}>
                            <TextField
                                label="Company Name"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={partner.company_name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                         <Grid item xs={12} sm={6}>
                            <TextField
                                label="Address"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={partner.address}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                             <TextField
                                label="Phone Number"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={partner.phone_number}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                             <TextField
                                label="User Name"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={partner.user_name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                         <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fixed Price"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={partner.fixed_price}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                              <TextField
                                label="Fixed Price Description"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={partner.fixed_price_description}
                                InputProps={{ readOnly: true }}
                                multiline
                                rows={4}
                            />
                        </Grid>

                    </Grid>

                )}
            </Box>
        </Container>
    );
}

export default PartnerProfileManagement;