// File: src/components/AddPartner.js - v2
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';

function AddPartner() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [manager_message, setManagerMessage] = useState('Welcome to Zippee! We are excited to have you as a partner.'); // Default Message
    const [error, setError] = useState('');

    const handleAddPartner = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3000/api/partners', {
                name,
                email,
                password,
                companyName: company_name,
                address,
                phoneNumber: phone_number,
                userName: name,
                 manager_message: manager_message // Include message
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                navigate('/dashboard/partners');
            }
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            setError(error.response?.data?.error || 'Error adding partner');
        }
    };

    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Partner
                </Typography>

                <Box mt={4}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleAddPartner}>
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
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            label="Manager Message"
                            fullWidth
                            margin="normal"
                            value={manager_message}
                            onChange={(e) => setManagerMessage(e.target.value)}
                            multiline // Allow multi-line text
                            rows={3}
                        />
                        <TextField
                            label="Phone Number"
                            fullWidth
                            margin="normal"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Add Partner
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default AddPartner;