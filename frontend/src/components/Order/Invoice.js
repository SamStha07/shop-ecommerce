import React from 'react';

import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

const Invoice = ({ order }) => {
  const orderDate = order.createdAt;
  const date = orderDate.slice(0, 10);
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          {' '}
          ~ {new Date().toLocaleString()}
        </Text>
        <Text style={styles.title}>Order Invoices</Text>
        <Text style={styles.author}>Shop Ecommerce</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
          </TableHeader>
        </Table>

        <Table data={order.orderItems}>
          <TableBody>
            <DataTableCell getContent={(x) => x.name} />
            <DataTableCell getContent={(x) => x.price} />
            <DataTableCell getContent={(x) => x.qty} />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          <Text>Ordered Date: {date}</Text>
          {'\n'}
          {'\n'}
          <Text>Order Id: {order._id}</Text>
          {'\n'}
          {'\n'}
          <Text>
            Order Status: {order.isDelivered ? 'Delivered' : 'Pending'}
          </Text>
          {'\n'}
          {'\n'}
          <Text>Payment Method: {order.paymentMethod}</Text>
          {'\n'}
          {'\n'}
          <Text>Total Paid: Rs.{order.totalPrice}</Text>
        </Text>

        <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export default Invoice;
