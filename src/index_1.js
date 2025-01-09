// File: src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Importa CssBaseline
import App from './App';
import darkTheme from './theme';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline /> {/* Aggiungi questa linea */}
        <App />
    </ThemeProvider>
);