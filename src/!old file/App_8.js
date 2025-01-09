// File: src/App.js - v7
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import themeZippee from './theme-zippee'; // Tema chiaro
import themeDark from './theme-dark'; // Tema scuro
import Header from './components/Header'; // Header con il menu a tendina
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ManagerPartnerDetail from './components/ManagerPartnerDetail';
import AddPartner from './components/AddPartner';
import DashboardLayout from './layouts/DashboardLayout';
import PartnerDashboard from './components/PartnerDashboard';
import PartnerTripEntryForm from './components/PartnerTripEntryForm';
import PartnerAggregatedData from './components/PartnerAggregatedData';
import PartnerTripHistory from './components/PartnerTripHistory';
import PartnerProfileManagement from './components/PartnerProfileManagement';
import PartnerLogin from './components/PartnerLogin';
import ProtectedRoute from './components/ProtectedRoute';
import PartnerHome from './components/PartnerHome';
import EcoTrip from './components/EcoTrip';
import EcoTripCompensation from './components/EcoTripCompensation';

function App() {
    // Stato per il tema corrente
    const [currentTheme, setCurrentTheme] = useState(themeZippee);

    // Funzione per cambiare tema
    const handleThemeChange = (themeKey) => {
        switch (themeKey) {
            case 'dark':
                setCurrentTheme(themeDark);
                break;
            case 'zippee':
            default:
                setCurrentTheme(themeZippee);
                break;
        }
    };

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline /> {/* Applica il tema globale */}
            <Router>
                <Header onChangeTheme={handleThemeChange} /> {/* Header con il menu a tendina */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/partner/login" element={<PartnerLogin />} />
                    <Route path="/" element={<Login />} /> {/* Route predefinita */}

                    {/* Route per i manager */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                        <Route path="partners" element={<Dashboard />} />
                        <Route path="partner/:id" element={<ManagerPartnerDetail />} />
                        <Route path="add-partner" element={<AddPartner />} />
                        <Route path="eco-trip" element={<EcoTrip />} /> {/* Route per la tabella Eco Trip */}
                        <Route path="eco-trip/:tripId" element={<EcoTripCompensation />} /> {/* Nuova route per i dettagli del viaggio */}
                    </Route>

                    {/* Route per i partner */}
                    <Route path="/partner" element={<ProtectedRoute><PartnerDashboard /></ProtectedRoute>}>
                        <Route path="dashboard" element={<PartnerHome />} />
                        <Route path="trip-entry" element={<PartnerTripEntryForm />} />
                        <Route path="aggregated-data" element={<PartnerAggregatedData />} />
                        <Route path="trip-history" element={<PartnerTripHistory />} />
                        <Route path="profile-management" element={<PartnerProfileManagement />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;