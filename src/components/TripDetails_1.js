// zippee-frontend - File src/components/TripPDF.js - v2

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// Stili per il PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
    },
    header: {
        marginBottom: 20,
        borderBottom: '2px solid #000',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
    qrCode: {
        marginTop: 20,
        textAlign: 'center',
    },
    footer: {
        marginTop: 30,
        borderTop: '1px solid #000',
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 10,
        color: '#666',
    },
});

// Componente per il PDF
const TripPDF = ({ partnerId, partnerName, numPersone, dataPartenza, returnDate, ecoTripCode, qrCodeUrl }) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState('');

    // Genera il QR code come immagine PNG
    React.useEffect(() => {
        QRCode.toDataURL(qrCodeUrl, { width: 200 }, (err, url) => {
            if (err) console.error(err);
            else setQrCodeDataUrl(url);
        });
    }, [qrCodeUrl]);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Intestazione */}
                <View style={styles.header}>
                    <Text style={styles.title}>Trip Details</Text>
                </View>

                {/* Sezione Partner */}
                <View style={styles.section}>
                    <Text style={styles.label}>Partner ID:</Text>
                    <Text style={styles.value}>{partnerId}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Partner Name:</Text>
                    <Text style={styles.value}>{partnerName}</Text>
                </View>

                {/* Sezione Dettagli Viaggio */}
                <View style={styles.section}>
                    <Text style={styles.label}>Number of People:</Text>
                    <Text style={styles.value}>{numPersone}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Departure Date:</Text>
                    <Text style={styles.value}>{new Date(dataPartenza).toLocaleDateString()}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Return Date:</Text>
                    <Text style={styles.value}>{new Date(returnDate).toLocaleDateString()}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>EcoTrip Code:</Text>
                    <Text style={styles.value}>{ecoTripCode}</Text>
                </View>

                {/* QR Code */}
                {qrCodeDataUrl && (
                    <View style={styles.qrCode}>
                        <Text style={styles.label}>QR Code:</Text>
                        <Image src={qrCodeDataUrl} style={{ width: 150, height: 150, alignSelf: 'center' }} />
                    </View>
                )}

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Generated by Zippee - {new Date().toLocaleDateString()}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default TripPDF;