import React, { Fragment } from "react";
import { Page, Document, Image, Text, View } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";
import logo from ".././../../../../../assets/abs.png";
import styles from "./styles";

const Header = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.confidentialContainer}>
      Confidential
    </Text>
    <Text style={styles.abyssinaHeading}>
    Abyssinya Slaughter
      {"\n"}
      Service House PLC
    </Text>
    <View style={styles.logoContainer}>
      <Image style={styles.logo} src={logo} />
    </View>
  </View>
);

const HeaderInfo = ({ invoice }) => {
  return (
    <Fragment>
      <View style={styles.secondtitleContainer}>
        <Text style={styles.reportTitle}> Salary Slip   </Text>
        <Text style={styles.headerDate}  >Date :{invoice.trans_date}</Text>
      </View>
    </Fragment>
  );
};

const Print = ({ invoice }) => (
  <Document>
    <Page orientation="portrait" size="A4" style={styles.page}>
      <Header />
      <View style={styles.headerInfo}>
        <HeaderInfo invoice={invoice} />
      </View>
      <ItemsTable invoice={invoice} />
    </Page>
  </Document>
);

export default Print;
