import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../assets/images/logo/logo.png'; // Ensure this path is correct

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    color: '#333333',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 160,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginTop: 20,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalAmount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const InvoiceComponent = ({ username, trainer, slot,slotDate, bookingDate, bookingAmount }) => {
  const formattedAmount = `Rs. ${bookingAmount.toFixed(2)} `;
  const formattedTime = `${slot[0]?.startTime} - ${slot[0]?.endTime} `;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Invoice Title */}
        <View style={styles.container}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>SPORTZONE</Text>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <View>
            <Text style={styles.header}>Invoice</Text>
            <Text style={styles.text}>Invoice number: 000000000</Text>
          </View>
          <View>
            <Text style={styles.text}>Kochi</Text>
            <Text style={styles.text}>Ernakulam</Text>
            <Text style={styles.text}>Kerala, India.</Text>
          </View>
        </View>

        {/* User Address */}
        <View style={styles.section}>
          <View>
            <Text style={styles.subHeader}>Bill To</Text>
            <Text style={styles.text}>{username}</Text>
            
          </View>
          <View>
            <Text style={styles.text}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Trainer Details */}
        <View style={styles.section}>
          <View>
            <Text style={styles.subHeader}>Payment To</Text>
            <Text style={styles.text}>Trainer: {trainer.username?trainer.username:trainer.userName}</Text>
            <Text style={styles.text}>Department: {trainer?.department}</Text>
            <Text style={styles.text}>Email: {trainer?.email}</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <View>
            <Text style={styles.subHeader}>Booking Details</Text>
            <Text style={styles.text}>Booked on: {bookingDate}</Text>
            <Text style={styles.text}>Booking Amount: {formattedAmount} / Hour</Text>
            <Text style={styles.text}>Slot Date: {slotDate}</Text>
            <Text style={styles.text}>Time: {formattedTime}</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.footer}>
          <Text style={styles.totalAmount}>Total Amount: {formattedAmount}/-</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceComponent;
