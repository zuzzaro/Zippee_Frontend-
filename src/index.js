// zippee-frontend - File src/index.js - v2

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import darkTheme from './theme';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Importa il service worker

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
);

// Registra il service worker solo per la parte enduser
if (window.location.pathname.startsWith('/enduser')) {
    serviceWorkerRegistration.register();
} else {
    serviceWorkerRegistration.unregister();
}