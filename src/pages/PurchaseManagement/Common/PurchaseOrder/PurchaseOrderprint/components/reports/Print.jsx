import React, { Fragment } from "react";
import { Page, Document, Image, Text, View } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";
import logo from ".././../../../../../../assets/abs.png";
import styles from "./styles";

const Header = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.abyssinaHeading}>
      {" "}
      Abyssinya Slaughter Service {`\n`}
      House PLC
    </Text>
    <Image style={styles.logo} src={logo} />
  </View>
);

const HeaderInfo = ({ invoice }) => {
  return (
    <Fragment>
      <View style={styles.headerRight}>
        <Text>Documnent No: {invoice.invoice_no}</Text>
        <Text>Purchase Requisition No. : {invoice.trans_date} </Text>
        <Text>Order Date : {invoice.trans_date}</Text>
        <Text>Expected Delivery Date :{invoice.trans_date} </Text>
      </View>

      <View style={styles.headerRight}>
        <Text>Vendor No. : {invoice.name} </Text>
        <Text>Vendor Name: {invoice.trans_date} </Text>
        <Text>Request Department: {invoice.name}</Text>
      </View>

      <View style={styles.headerLeft}>
        <Text>Purchase Type: {invoice.name}</Text>
        <Text>Posting Date :{invoice.trans_date}</Text>
        <Text>Approved By :{invoice.trans_date}</Text>
        <Text>Approved Date :{invoice.trans_date}</Text>
      </View>
    </Fragment>
  );
};

const Print = ({ invoice }) => (
  <Document>
    <Page orientation="landscape" size="A4" style={styles.page}>
      <Header />
      <Text style={styles.reportTitle}> Purchase Order </Text>

      <View style={styles.headerInfo}>
        <HeaderInfo invoice={invoice} />
      </View>
      <ItemsTable invoice={invoice} />
    </Page>
  </Document>
);

export default Print;
