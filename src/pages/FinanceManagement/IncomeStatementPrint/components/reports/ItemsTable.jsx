import React, { Fragment } from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";

const TableRow = () => {
  // const rows = items.map((item) => (
  return (
    <Fragment>
      {/* this is for sales  */}
      <View
        style={styles.row}
        // key={item.itemCode}
      >
        <View style={styles.tableRowLarge}>
          <Text style={styles.insideRowMain}>Sales</Text>
          <Text style={styles.insideRow}>Cost of Goods sold </Text>
          <Text style={styles.insideRow}>Materials </Text>
          <Text style={styles.insideRow}>Labour</Text>
          <Text style={styles.insideRow}>Overhead</Text>
          <Text style={styles.insideRowMain}>Gross Profit </Text>
        </View>

        <View style={styles.tableRow}>
          <Text> - </Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          {/* <Text > 999,999,999</Text> */}
        </View>

        <View style={styles.tableRow}>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text>  999,999,999 </Text>
          <Text>  999,999,999 </Text>
        </View>
      </View>

      {/* this is for Operating Expense   */}

      <View
        style={styles.row}
        // key={item.itemCode}
      >
        <View style={styles.tableRowLarge}>
          <Text style={styles.insideRowMain}>Operating Expense </Text>
          <Text style={styles.insideRow}> Selling Expense </Text>
          <Text style={styles.insideRow}>Administratie Expense </Text>
          <Text style={styles.insideRow}>Depeciation and Amortization </Text>
          <Text style={styles.insideRowMain}>Operating Income </Text>
        </View>

        <View style={styles.tableRow}>
          <Text> - </Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          {/* <Text > 999,999,999</Text> */}
        </View>

        <View style={styles.tableRow}>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text>  999,999,999 </Text>
        </View>
      </View>

      {/* this is for other Income and  Expense   */}

      <View
        style={styles.row}
        // key={item.itemCode}
      >
        <View style={styles.tableRowLarge}>
          <Text style={styles.insideRowMain}>Other Income and Expense </Text>
          <Text style={styles.insideRow}> Intrest Revenue </Text>
          <Text style={styles.insideRow}>Intrest Expense </Text>
          <Text style={styles.insideRow}>Extraordinary Items </Text>
        </View>

        <View style={styles.tableRow}>
          <Text> - </Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          {/* <Text > 999,999,999</Text> */}
        </View>

        <View style={styles.tableRow}>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
          {/* <Text >  999,999,999 </Text> */}
        </View>
      </View>

      {/* this is for Income Before Tax   */}

      <View
        style={styles.row}
        // key={item.itemCode}
      >
        <View style={styles.tableRowLarge}>
          <Text style={styles.insideRowMain}>Income Before Tax </Text>
          <Text style={styles.insideRow}> Income Tax (at 35 %) </Text>
        </View>

        <View style={styles.tableRow}></View>

        <View style={styles.tableRow}>
          <Text> 999,999,999</Text>
          <Text> 999,999,999</Text>
        </View>
      </View>

      {/* this is for Net Income   */}

      <View
        style={styles.row}
        // key={item.itemCode}
      >
        <View style={styles.tableRowLarge}>
          <Text style={styles.insideRowMain}>Net Income </Text>
        </View>

        <View style={styles.tableRow}></View>

        <View style={styles.tableRow}>
          <Text> 999,999,999</Text>
        </View>
      </View>
    </Fragment>
  );

  // ));
  // return <Fragment>{rows}</Fragment>;
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
    {/* <TableHeader /> */}
    <TableRow items={invoice.items} />
    {/* <BlankSpace rowsCount={tableRowsCount - invoice.items.length} /> */}
    <Signature items={invoice.items} />
  </View>
);

export default ItemsTable;
