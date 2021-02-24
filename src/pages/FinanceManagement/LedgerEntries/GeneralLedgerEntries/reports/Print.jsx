import React, { Fragment } from "react";
import { Page, Document, Image, Text, View } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";
import logo from ".././../../../../assets/abs.png";
import styles from "./styles";


const Header = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.abyssinaHeading}>
    Abyssinya Slaughter Service House PLC
    </Text>
    <Image style={styles.logo} src={logo} />
  </View>
);


const HeaderInfo = ({ invoice }) => {
  return (
    <Fragment>
      <View style={styles.headerRight}>
        <Text>Printed On :{new Date().getFullYear()}</Text>
      </View>
      <View style={styles.headerRight}>
        <Text>From : {new Date().getFullYear()} </Text>
      </View>
      <View style={styles.headerLeft}>
        <Text>To :{new Date().getFullYear()}</Text>
      </View>
    </Fragment>
  );
};

const Print = ({ invoice }) => (
  <Document>
    <Page orientation="landscape" size="A4" style={styles.page}>
      <Header />
      <Text style={styles.reportTitle}> General Ledger Trial Balance </Text>
      <View style={styles.headerInfo}>
        <HeaderInfo invoice={invoice} />
      </View>
      <ItemsTable invoice={invoice} />
    </Page>
  </Document>
);

export default Print;
