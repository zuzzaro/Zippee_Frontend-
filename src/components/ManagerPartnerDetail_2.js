// zippee-frontend - File: src/components/ManagerPartnerDetail.js - v2
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, CircularProgress } from '@mui/material';

function ManagerPartnerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [user_name, setUserName] = useState('');
     const [fixedPrice, setFixedPrice] = useState('');
    const [fixedPriceDescription, setFixedPriceDescription] = useState('');
    const [password, setPassword] = useState(''); // Stato per la password
    const [managerMessage, setManagerMessage] = useState(''); // Stato per il messaggio del manager
    const [error, setError] = useState('');

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
                setName(response.data.name);
                setEmail(response.data.email);
                setCompanyName(response.data.company_name);
                setAddress(response.data.address);
                setPhoneNumber(response.data.phone_number);
                 setCreatedAt(response.data.created_at);
                 setUserName(response.data.user_name)
                  setFixedPrice(response.data.fixed_price);
                 setFixedPriceDescription(response.data.fixed_price_description);
                 setManagerMessage(response.data.manager_message)
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
        try {
            const response = await axios.put(`http://localhost:3000/api/partners/${id}`, {
                name,
                email,
                 company_name,
                address,
                phone_number,
                 fixedPrice,
                fixedPriceDescription,
                 managerMessage
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Aggiorna la password se il campo non è vuoto
             if (password) {
                await axios.put(`http://localhost:3000/api/partners/${id}/password`, {
                    password,
                }, {
                   headers: {
                        'Authorization': `Bearer ${token}`
                    }
               });
            }
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
                         <TextField
                            label="ID"
                            fullWidth
                            margin="normal"
                            value={partner.id}
                            disabled
                        />
                          <TextField
                            label="User Name"
                            fullWidth
                            margin="normal"
                            value={user_name}
                            disabled
                        />
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={name}
                             onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                           <TextField
                            label="Company Name"
                            fullWidth
                            margin="normal"
                             value={company_name}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                         <TextField
                            label="Address"
                            fullWidth
                            margin="normal"
                             value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                           <TextField
                            label="Phone Number"
                            fullWidth
                            margin="normal"
                             value={phone_number}
                             onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                         <TextField
                            label="Fixed Price"
                            fullWidth
                            margin="normal"
                             value={fixedPrice}
                             onChange={(e) => setFixedPrice(e.target.value)}
                        />
                          <TextField
                            label="Fixed Price Description"
                            fullWidth
                            margin="normal"
                             value={fixedPriceDescription}
                             onChange={(e) => setFixedPriceDescription(e.target.value)}
                        />
                         <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                         />
                         <TextField
                             label="Message for Partner"
                             fullWidth
                             margin="normal"
                              value={managerMessage}
                              onChange={(e) => setManagerMessage(e.target.value)}
                           />
                           <TextField
                            label="Created At"
                            fullWidth
                            margin="normal"
                             value={createdAt}
                            disabled
                        />
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