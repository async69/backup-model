import React, { Fragment } from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";

const TableHeader = () => (
  <View style={styles.tableHeaderContainer}>
    <Text style={styles.tableHeader}> Code</Text>
    <Text style={styles.tableHeaderLarge}> Name</Text>
    <Text style={styles.tableHeader}> Category</Text>
    <Text style={styles.tableHeader}>Quantity </Text>

    <Text style={styles.tableHeader}>Est. unit price</Text>
    <Text style={styles.tableHeaderLarge}> Est. net ammount</Text>
    <Text style={styles.tableHeader}>Currency</Text>
    <Text style={styles.tableHeader}>UOM</Text>
  </View>
);

const TableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.itemCode}>
      <Text style={styles.tableRow}>{item.itemCode}</Text>
      <Text style={styles.tableRowName}>{item.itemName}</Text>
      <Text style={styles.tableRow}>{item.itemCategory}</Text>
      <Text style={styles.tableRow}>{item.locationCode}</Text>

      <Text style={styles.tableRow}>{item.binCode}</Text>
      <Text style={styles.tableRowName}>{item.locationCode}</Text>
      <Text style={styles.tableRow}>{item.locationCode}</Text>
      <Text style={styles.tableRow}>{item.binCode}</Text>
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
