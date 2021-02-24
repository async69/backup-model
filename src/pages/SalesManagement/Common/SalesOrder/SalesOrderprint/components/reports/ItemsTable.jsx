import React, { Fragment } from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";

const TableHeader = () => (
  <View style={styles.tableHeaderContainer}>
    {/* <Text style={styles.tableHeaderSmall}> Code</Text> */}
    <Text style={styles.tableHeaderLarge}>Name</Text>
    <Text style={styles.tableHeader}>Category</Text>
    <Text style={styles.tableHeader}>Quantity </Text>
    <Text style={styles.tableHeaderSmall}>Unit Price </Text>

    <Text style={styles.tableHeader}>Discount </Text>
    <Text style={styles.tableHeader}>Discount Method </Text>
    <Text style={styles.tableHeaderSmall}> Total Excluding VAT</Text>

    <Text style={styles.tableHeaderSmall}>VAT</Text>
    <Text style={styles.tableHeader}>Net Amount </Text>

    <Text style={styles.tableHeader}>Currency</Text>
    <Text style={styles.tableHeaderSmall}>UOM</Text>
  </View>
);

const TableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.itemCode}>
      {/* <Text style={styles.tableHeaderSmall}>{item.itemCode}</Text> */}
      <Text style={styles.tableRowLarge}>{item.itemName}</Text>
      <Text style={styles.tableRow}>{item.itemCategory}</Text>
      <Text style={styles.tableRow}>{item.quantity}</Text>
      <Text style={styles.tableRowSmall}>{item.unitPrice}</Text>

      <Text style={styles.tableRow}>{item.discount}</Text>
      <Text style={styles.tableRow}>{item.discountMethod}</Text>
      <Text style={styles.tableRowSmall}>{item.totalExcludingVAT}</Text>

      <Text style={styles.tableRowSmall}>{item.vat}</Text>
      <Text style={styles.tableRow}>{item.totalAmount}</Text>

      <Text style={styles.tableRow}>{item.currency}</Text>
      <Text style={styles.tableRowSmall}>{item.unit_of_measurement}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

const Signature = ({ items }) => {
  items.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <View style={styles.signBox}>
      <Text style={styles.sign}>Signature</Text>
    </View>
  );
};

const ItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <TableHeader />
    <TableRow items={invoice.items} />
    {/* <BlankSpace rowsCount={tableRowsCount - invoice.items.length} /> */}
    <Signature items={invoice.items} />
  </View>
);

export default ItemsTable;
