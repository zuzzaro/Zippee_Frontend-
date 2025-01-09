// File: src/components/PartnerLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';

function PartnerLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login-partner', {
                email,
                password,
            });
            if (response.data.token) {
               localStorage.setItem('token', response.data.token);
                 navigate('/partner/dashboard');
              } else {
                setError('Invalid credentials');
            }

        } catch (error) {
              console.error(error);
             setError('Invalid credentials');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={8} textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Partner Login
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleLogin}>
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
                    <Box mt={3}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default PartnerLogin;