import React, { Fragment } from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";

const tableRowsCount = 11;

const TableHeader = () => (
  <View style={styles.tableHeaderContainer}>
    <Text style={styles.tableHeaderSmall}> Code</Text>
    <Text style={styles.tableHeaderLarge}> Name</Text>
    <Text style={styles.tableHeaderSmall}> Category</Text>
    <Text style={styles.tableHeaderSmall}>Fr-Location </Text>
    <Text style={styles.tableHeaderSmall}>From Bin</Text>
    <Text style={styles.tableHeader}>To - Location </Text>
    <Text style={styles.tableHeaderSmall}>To Bin</Text>
    <Text style={styles.tableHeader}>Requested - Quantity</Text>
    <Text style={styles.tableHeader}>Issued Quantity</Text>
    <Text style={styles.tableHeader}>Remaining Quantity</Text>
    <Text style={styles.tableHeader}>Received Quantity</Text>
    <Text style={styles.tableHeaderSmall}>UOM</Text>
  </View>
);

const TableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.itemCode}>
      <Text style={styles.tableRowSmall}>{item.itemCode}</Text>
      <Text style={styles.tableRowName}>{item.itemName}</Text>
      <Text style={styles.tableRowSmall}>{item.itemCategory}</Text>
      <Text style={styles.tableRowSmall}>{item.locationCode}</Text>
      <Text style={styles.tableRowSmall}>{item.binCode}</Text>
      <Text style={styles.tableRow}>{item.locationCode}</Text>
      <Text style={styles.tableRowSmall}>{item.binCode}</Text>
      <Text style={styles.tableRow}>{item.uom}</Text>
      <Text style={styles.tableRow}>{item.unitPrice}</Text>
      <Text style={styles.tableRow}>{item.totalAmount}</Text>
      <Text style={styles.tableRow}>{item.totalAmount}</Text>
      <Text style={styles.tableRowSmall}>{item.itemCode}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};
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
