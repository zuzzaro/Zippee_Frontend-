// zippee-frontend - File:src/App.js - v1
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ManagerPartnerDetail from './components/ManagerPartnerDetail';
import AddPartner from './components/AddPartner';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
    return (
        <Router>
            <Routes>
                 <Route path="/login" element={<Login />} />
                 <Route path="/" element={<Login />} /> {/* Route predefinita */}
                 <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route path="partners" element={<Dashboard />} />
                    <Route path="partner/:id" element={<ManagerPartnerDetail />} />
                    <Route path="add-partner" element={<AddPartner />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;