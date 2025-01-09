// File: src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50', // Verde principale
            light: '#81C784', // Verde chiaro
            dark: '#388E3C', // Verde scuro
            contrastText: '#FFFFFF', // Testo in contrasto (bianco)
        },
        secondary: {
            main: '#8BC34A', // Verde secondario
            light: '#AED581', // Verde secondario chiaro
            dark: '#689F38', // Verde secondario scuro
            contrastText: '#000000', // Testo in contrasto (nero)
        },
        background: {
            default: '#F5F5F5', // Grigio chiaro per lo sfondo
            paper: '#FFFFFF', // Bianco per le carte (Paper)
        },
        text: {
            primary: '#212121', // Testo principale (grigio scuro)
            secondary: '#757575', // Testo secondario (grigio)
        },
        success: {
            main: '#4CAF50', // Verde per messaggi di successo
        },
        error: {
            main: '#F44336', // Rosso per messaggi di errore
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 500,
        },
        subtitle1: {
            fontWeight: 500,
        },
        body1: {
            fontWeight: 400,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Bordi arrotondati per i pulsanti
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // Bordi arrotondati per le carte (Paper)
                },
            },
        },
    },
});

export default theme;