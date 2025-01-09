// zippee-frontend - File: src/components/ManagerPartnerDetail.js - v3
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, CircularProgress, Grid } from '@mui/material';

function ManagerPartnerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [company_name, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
     const [fixedPrice, setFixedPrice] = useState('');
    const [fixedPriceDescription, setFixedPriceDescription] = useState('');
    const [managerMessage, setManagerMessage] = useState(''); // Stato per il messaggio del manager
    const [error, setError] = useState('');
      const [initialValues, setInitialValues] = useState(null); // Stato per i valori iniziali


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            axios.get(`http://localhost:3000/api/partners/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setPartner(response.data);
                setCompanyName(response.data.company_name);
                setAddress(response.data.address);
                setPhoneNumber(response.data.phone_number);
                 setFixedPrice(response.data.fixed_price);
                 setFixedPriceDescription(response.data.fixed_price_description);
                 setManagerMessage(response.data.manager_message);
                 setInitialValues(response.data)
            })
            .catch((error) => {
                console.error(error);
                setError('Error fetching partner details');
            });
        }
    }, [id, navigate]);

      // Gestisce l'aggiornamento del partner
    const handleUpdate = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const updatedFields = {};

        if (company_name !== initialValues.company_name) {
            updatedFields.company_name = company_name;
         }
        if (address !== initialValues.address) {
            updatedFields.address = address;
         }
         if (phone_number !== initialValues.phone_number) {
            updatedFields.phone_number = phone_number;
         }
         if (fixedPrice !== initialValues.fixed_price) {
            updatedFields.fixedPrice = fixedPrice;
         }
         if (fixedPriceDescription !== initialValues.fixed_price_description) {
           updatedFields.fixedPriceDescription = fixedPriceDescription
         }
         if (managerMessage !== initialValues.manager_message) {
            updatedFields.managerMessage = managerMessage;
        }

        try {
             const response = await axios.put(`http://localhost:3000/api/partners/${id}`, updatedFields, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                navigate('/dashboard/partners');
            }
        } catch (error) {
            console.error(error);
            setError('Error updating partner');
        }
    };


    // Gestisce l'eliminazione del partner
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this partner?");
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.delete(`http://localhost:3000/api/partners/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    navigate('/dashboard/partners');
                }
            } catch (error) {
                console.error(error);
                setError('Error deleting partner');
            }
        }
    };

     if (!partner) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
                <Typography variant="body1" ml={2}>Loading...</Typography>
            </Box>
        );
    }


    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Manager Partner Detail
                </Typography>

                <Box mt={4}>
                    <form onSubmit={handleUpdate}>
                         <Grid container spacing={3}>
                             <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Company Name"
                                    fullWidth
                                    margin="normal"
                                     value={company_name}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                />
                            </Grid>
                           <Grid item xs={12} sm={6}>
                               <TextField
                                label="Phone Number"
                                    fullWidth
                                    margin="normal"
                                     value={phone_number}
                                     onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                           </Grid>
                           <Grid item xs={12} sm={12}>
                              <TextField
                                label="Address"
                                    fullWidth
                                    margin="normal"
                                     value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                             </Grid>
                            <Grid item xs={12} sm={6}>
                                 <TextField
                                label="Fixed Price"
                                    fullWidth
                                    margin="normal"
                                     value={fixedPrice}
                                     onChange={(e) => setFixedPrice(e.target.value)}
                                />
                            </Grid>
                             <Grid item xs={12} sm={6}>
                                  <TextField
                                    label="Fixed Price Description"
                                    fullWidth
                                    margin="normal"
                                     value={fixedPriceDescription}
                                     onChange={(e) => setFixedPriceDescription(e.target.value)}
                                 />
                             </Grid>
                             <Grid item xs={12} sm={12}>
                                <TextField
                                 label="Message for Partner"
                                    fullWidth
                                    margin="normal"
                                     value={managerMessage}
                                     onChange={(e) => setManagerMessage(e.target.value)}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                         </Grid>
                        {error && (
                            <Typography variant="body2" color="error" align="center" mt={2}>
                                {error}
                            </Typography>
                        )}
                        <Box mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mr: 2 }}
                            >
                                Update Partner
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ mr: 2 }}
                                onClick={handleDelete}
                            >
                                Delete Partner
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/dashboard/partners')}
                            >
                                Exit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default ManagerPartnerDetail;