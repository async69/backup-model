import { StyleSheet } from "@react-pdf/renderer";

const borderColor = "#222222";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#222222",
  },
  tableHeaderContainer: {
    flexDirection: "row",
    borderBottomColor: "#222222",
    backgroundColor: "#d4d4d4",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  tableHeader: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  tableHeaderSmall: {
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  tableHeaderLarge: {
    width: "25%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "borderColor",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  emptyRow: {
    flexDirection: "row",
    borderBottomColor: "#222222",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    color: "white",
  },
  tableRow: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
  },
  tableRowName: {
    width: "25%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "left",
  },
  tableRowSmall: {
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
  },
  tableRowLarge: {
    width: "25%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
  },
  sign: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  signBox: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  page: {
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    display: "flex",
  },
  titleContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 1,
  },
  reportTitle: {
    letterSpacing: 2,
    fontSize: 25,
    textAlign: "left",
    textTransform: "uppercase",
    textDecoration: "underline",
    justifyContent: "center",
    marginLeft: 230,
  },
  abyssinaHeading: {
    letterSpacing: 4,
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
    justifyContent: "flex-start",
  },
  logo: {
    width: 110,
    height: 80,
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  headerInfo: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 5,
    fontSize: 12,
    textAlign: "left",
  },

  headerRight: {
    alignSelf: "flex-start",
  },
  headerLeft: {
    alignSelf: "flex-end",
  },
});

export default styles;
