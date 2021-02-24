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
        <Text>Transfer Order Issue No.: {invoice.invoice_no} </Text>
      </View>

      <View style={styles.headerRight}>
        <Text>From Location : {invoice.name} </Text>
        <Text>From Bin: {invoice.trans_date} </Text>
      </View>

      <View style={styles.headerLeft}>
        <Text>To Location : {invoice.invoice_no}</Text>
        <Text>To Bin :{invoice.invoice_no} </Text>
      </View>
      <View style={styles.headerLeft}>
        <Text>Received By: {invoice.name}</Text>
        <Text>Posting Date :{invoice.trans_date}</Text>
      </View>
    </Fragment>
  );
};

const Print = ({ invoice }) => (
  <Document>
    <Page orientation="landscape" size="A4" style={styles.page}>
      <Header />
      <Text style={styles.reportTitle}> Transfer Order Receive </Text>

      <View style={styles.headerInfo}>
        <HeaderInfo invoice={invoice} />
      </View>
      <ItemsTable invoice={invoice} />
    </Page>
  </Document>
);

export default Print;
