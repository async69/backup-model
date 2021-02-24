import React, { Fragment } from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";

const tableRowsCount = 11;

const TableHeaderSale = () => (
  <Fragment>
    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderSmall}> Sale</Text>
      <Text style={styles.tableHeader2}>50,000,000 ETB </Text>
    </View>

    <View>
      <Text style={styles.tableHeaderSmall}>Costs of goods sold</Text>
      <Text style={styles.tableHeader}>Materials :  8,000,000 </Text>
      <Text style={styles.tableHeader}>Labor :11,000,000 </Text>
      <Text style={styles.tableHeader}>Overhead 6,000,000  </Text>
    </View>

    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderSmall}> Gross Margin</Text>
      <Text style={styles.tableHeader2}>25,000,000 ETB </Text>
    </View>

    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderSmall2}> Operating Expences </Text>
      {/* <Text style={styles.tableHeader2}>50,000,000 ETB </Text> */}
    </View>

    <View>
      <Text style={styles.tableHeader}>selling expence  :  9,000,000 </Text>
      <Text style={styles.tableHeader}>Adminstrative Expence  :6,000,000 </Text>
      <Text style={styles.tableHeader}>Depreciation and amortization 5,000,000  </Text>
      <Text style={styles.tableHeader}>   20,000,000  </Text>
    </View>

    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderSmall}> Operating INcome </Text>
      <Text style={styles.tableHeader2}>5,000,000 ETB </Text>
    </View>


    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderSmall2}> Other income and Expences </Text>
    </View>

    <View>
      <Text style={styles.tableHeader}>Intrest Revenue :  500,000 </Text>
      <Text style={styles.tableHeader}>Intrest Expence :-1,000,000 </Text>
      <Text style={styles.tableHeader}>Extraordinary Items  2,000,000  </Text>
      <Text style={styles.tableHeader}>   1,500,000  </Text>
    </View>


    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderSmall}> Income Before Tax</Text>
      <Text style={styles.tableHeader2}>6,500,000 ETB </Text>
    </View>

    <View>
      <Text style={styles.tableHeader}>Income Tax (35 %) :  2,275,000 </Text>
    </View>

    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderSmall}> Net Income </Text>
      <Text style={styles.tableHeader2}>4,225,000 ETB </Text>
    </View>

  </Fragment>
);

// const TableRow = ({ items }) => {
//   const rows =  (

//   );
//   return <Fragment>{rows}</Fragment>;
// };

const BlankSpace = ({ rowsCount }) => {
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((x, i) => (
    <View style={styles.emptyRow} key={`BR${i}`}>
      <Text style={styles.tableHeaderSmall}> -</Text>
      <Text style={styles.tableHeaderLarge}> -</Text>
      <Text style={styles.tableHeader}> -</Text>
      <Text style={styles.tableHeader}>- -</Text>
      <Text style={styles.tableHeaderSmall}>-</Text>
      <Text style={styles.tableHeader}>- -</Text>
      <Text style={styles.tableHeaderSmall}>-</Text>
      <Text style={styles.tableHeader}> - </Text>
      <Text style={styles.tableHeader}> -</Text>
      <Text style={styles.tableHeader}>- </Text>
      <Text style={styles.tableHeaderSmall}>-</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

const Signature = ({ items }) => {
  return (
    <View style={styles.signBox}>
      <Text style={styles.sign}>Signature</Text>
    </View>
  );
};

const ItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <TableHeaderSale />
    {/* <TableRow items={invoice.items} /> */}
    {/* <BlankSpace rowsCount={tableRowsCount - invoice.items.length} /> */}
    {/* <Signature  /> */}
  </View>
);

export default ItemsTable;
