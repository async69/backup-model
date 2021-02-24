import React, { Fragment } from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "./styles";

const TableHeader = () => (
  <View style={styles.tableHeaderContainer}>
    <Text style={styles.tableHeaderSmall}> No.</Text>
    <Text style={styles.tableHeaderLarge}> Name</Text>
    <Text style={styles.tableHeaderMid}>Debit </Text>

    <Text style={styles.tableHeaderMid}>Credit</Text>
  </View>
);

const TableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.itemCode}>
      <View style={styles.tableRowSmall}>
        <Text>{item.account_number}</Text>
      </View>

      <View style={styles.tableRowLarge}>
        <Text style={styles.insideRowMain}>{item.name}</Text>
      </View>
      <View style={styles.tableRowMid}>
        <Text>{item.debit}</Text>
      </View>
      <View style={styles.tableRowMid}>
        <Text>{item.credit}</Text>
      </View>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

// const Signature = ({ items }) => {
//   items.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//   return (
//     <View style={styles.signBox}>
//       <Text style={styles.sign}>Signature</Text>
//     </View>
//   );
// };

const ItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <TableHeader />
    <TableRow items={invoice} />
    {/* <BlankSpace rowsCount={tableRowsCount - invoice.items.length} /> */}
    {/* <Signature items={invoice} /> */}
  </View>
);

export default ItemsTable;
