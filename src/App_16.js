// zippee-frontend - File src/App.js - v16

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import themeZippee from './theme';
import themeDark from './theme-dark';
import Header from './components/Header';
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
import TripDetails from './components/TripDetails';
import EndUserTripDetails from './components/EndUserTripDetails'; // Nuovo componente

function App() {
    const [currentTheme, setCurrentTheme] = useState(themeZippee);

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
            <CssBaseline />
            <Router>
                <Header onChangeTheme={handleThemeChange} />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/partner/login" element={<PartnerLogin />} />
                    <Route path="/" element={<Login />} />

                    {/* Route per i manager */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout onChangeTheme={handleThemeChange} /></ProtectedRoute>}>
                        <Route path="partners" element={<Dashboard />} />
                        <Route path="partner/:id" element={<ManagerPartnerDetail />} />
                        <Route path="add-partner" element={<AddPartner />} />
                        <Route path="eco-trip" element={<EcoTrip />} />
                        <Route path="eco-trip/:tripId" element={<EcoTripCompensation />} />
                    </Route>

                    {/* Route per i partner */}
                    <Route path="/partner" element={<ProtectedRoute><PartnerDashboard onChangeTheme={handleThemeChange} /></ProtectedRoute>}>
                        <Route path="dashboard" element={<PartnerHome />} />
                        <Route path="trip-entry" element={<PartnerTripEntryForm />} />
                        <Route path="aggregated-data" element={<PartnerAggregatedData />} />
                        <Route path="trip-history" element={<PartnerTripHistory />} />
                        <Route path="profile-management" element={<PartnerProfileManagement />} />
                    </Route>

                    {/* Route pubbliche */}
                    <Route path="/trip/:tripId" element={<TripDetails />} />
                    <Route path="/enduser/trip/:tripId" element={<EndUserTripDetails />} /> {/* Nuova route per enduser */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;