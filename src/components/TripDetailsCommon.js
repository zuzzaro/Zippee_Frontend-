// File: src/components/TripDetailsCommon.js - v1
import React from 'react';
import {
    Typography,
    Paper,
    Box,
    Grid,
    TextField,
    IconButton
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';

function TripDetailsCommon({ tripDetails, isEditable, onEditClick, onCarbonCancellingCodeChange, carbonCancellingCode }) {
    if (!tripDetails) {
        return <Typography>No trip details available.</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Grid container spacing={2}>
                {/* Colonna sinistra: Dettagli del viaggio */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {/* ID */}
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    ID:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                                    {tripDetails.id}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Partner ID e Company Name */}
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Partner:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    {tripDetails.partner_id} - {tripDetails.company_name}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* N° People */}
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    N° People:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                                    {tripDetails.num_persone}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Creation Date */}
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Creation Date:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    {new Date(tripDetails.created_at).toLocaleString()}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Eco Trip Code */}
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Eco Trip Code:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    {tripDetails.eco_trip_code}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Date Departure */}
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Date Departure:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    {tripDetails.date_departure}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Date Return */}
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Date Return:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    {tripDetails.return_date}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Carbon Cancelling Code */}
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Carbon Cancelling Code:
                                </Typography>
                                {isEditable ? (
                                    <TextField
                                        size="small"
                                        value={carbonCancellingCode}
                                        onChange={onCarbonCancellingCodeChange}
                                        sx={{ ml: 1 }}
                                    />
                                ) : (
                                    <Typography variant="body1" sx={{ ml: 1 }}>
                                        {tripDetails.carbon_cancelling_code}
                                    </Typography>
                                )}
                                {isEditable && (
                                    <IconButton onClick={onEditClick} sx={{ ml: 1 }}>
                                        <EditIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Colonna destra: QR Code (solo su schermi grandi) */}
                <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="flex-start">
                    <Box mt={{ xs: 3, md: 0 }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            QR Code
                        </Typography>
                        <QRCodeSVG value={JSON.stringify(tripDetails)} size={200} />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default TripDetailsCommon;