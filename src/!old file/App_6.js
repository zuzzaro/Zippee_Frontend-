// File: src/App.js - v6
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import EcoTripCompensation from './components/EcoTripCompensation'; // Importa la nuova view

function App() {
    return (
        <Router>
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
    );
}

export default App;