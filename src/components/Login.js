// zippee-frontend - File:src/components/Login.js - v1
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Inserisci email e password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                 navigate('/dashboard/partners');
            } else {
                setError('Login fallito. Controlla le credenziali.');
            }
        } catch (error) {
           if (error.response) {
                setError('Email o password errati.');
            } else {
                setError('Errore di rete. Riprova più tardi.');
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
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
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Box>
                    {error && (
                        <Typography variant="body2" color="error" align="center" mt={2}>
                            {error}
                        </Typography>
                    )}
                </form>
            </Box>
        </Container>
    );
}

export default Login;