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
        <Text>Location Code: {invoice.trans_date} </Text>
      </View>

      <View style={styles.headerRight}>
        <Text>Bin : this texxttt</Text>
        <Text>Type: this texxttt </Text>
      </View>

      <View style={styles.headerLeft}>
        <Text>Requested By : {invoice.name}</Text>
        <Text>Requested Date: {invoice.trans_date}</Text>
      </View>
      <View style={styles.headerLeft}>
        <Text>Approved By: {invoice.name}</Text>
        <Text>Approved Date :{invoice.trans_date}</Text>
      </View>
    </Fragment>
  );
};

const Print = ({ invoice }) => (
  <Document>
    <Page orientation="landscape" size="A4" style={styles.page}>
      <Header />
      <Text style={styles.reportTitle}> Store Requisition</Text>

      <View style={styles.headerInfo}>
        <HeaderInfo invoice={invoice} />
      </View>
      <ItemsTable invoice={invoice} />
    </Page>
  </Document>
);

export default Print;
