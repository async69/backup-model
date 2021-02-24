import React, { Fragment } from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";

const TableRow = () => {
  // const rows = items.map((item) => (
  return (
    <Fragment>
      {/* this is foremployee details   */}

      <View style={styles.titleContainer}>
        <View style={styles.boxContainer}>
          <Text style={styles.insideRowMain}>Name </Text>
          <Text style={styles.insideRowMain}>ID </Text>
        </View>

        <View style={styles.boxContainer}>
          <Text>thisname last name </Text>
          <Text>ID,999,999</Text>
        </View>

        <View style={styles.boxContainer}>
          <Text style={styles.insideRowMain}>Position </Text>
          <Text style={styles.insideRowMain}>Department </Text>
        </View>

        <View style={styles.boxContainer}>
          <Text>this.Position.Nmae </Text>
          <Text>this.Department.name1</Text>
        </View>
      </View>

      <View style={styles.tableHeaderContainer}>
        <Text style={styles.tableHeaderLarge}> Description </Text>
        <Text style={styles.tableHeader}> Earnings</Text>
        <Text style={styles.tableHeader}> Deductions</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.tableRowLarge}>some description </Text>
        <Text style={styles.tableRow}>898989</Text>
        <Text style={styles.tableRow}>8989898</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.tableRowLarge}>some description </Text>
        <Text style={styles.tableRow}>898989</Text>
        <Text style={styles.tableRow}>8989898</Text>
      </View>

      <View style={styles.tableHeaderContainer}>
        <Text style={styles.tableHeaderLarge}> Total </Text>
        <Text style={styles.tableHeader}> 99,999</Text>
        <Text style={styles.tableHeader}> 99,999</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.tableRowLarge}>Bank Nmae </Text>
        <Text style={styles.tableRowLarge}>Some Bank Nmae </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.tableRowLarge}>Account No. </Text>
        <Text style={styles.tableRowLarge}>00000000000000 </Text>
      </View>

      <View style={styles.tableHeaderContainer}>
        <Text style={styles.tableHeaderLarge}> Net Pay </Text>
        <Text style={styles.tableHeaderLarge}> 99,999</Text>
        {/* <Text style={styles.tableHeader}> 99,999</Text> */}
      </View>
    </Fragment>
  );
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
    <TableRow items={invoice.items} />
    <Signature items={invoice.items} />
  </View>
);

export default ItemsTable;
