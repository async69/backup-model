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

const HeaderInfo = () => {
  return (
    <Fragment>
      <View style={styles.headerRight}>
        <Text>For the Years Ending [Dec 31, 2020 and Dec 31, 2019 </Text>
      </View>
    </Fragment>
  );
};

const Print = ({ invoice }) => (
  <Document>
    <Page orientation="portrait" size="A4" style={styles.page}>
      <Header />
      <Text style={styles.reportTitle}> Income Statement </Text>

      <View style={styles.headerInfo}>
        <HeaderInfo invoice={invoice} />
      </View>
      <ItemsTable invoice={invoice} />
    </Page>
  </Document>
);

export default Print;
