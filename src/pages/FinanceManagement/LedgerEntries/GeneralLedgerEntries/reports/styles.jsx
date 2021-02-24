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
    height: 34,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  tableHeader: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  tableHeaderSmall: {
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 2
  },
  tableHeaderMid: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },

  tableHeaderLarge: {
    width: "55%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "borderColor",
    borderBottomWidth: 1,
    alignItems: "center",
    // height: 20,
    // fontStyle: "bold",
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
    width: "35%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "center",
  },


  insideRowMain: {
    marginLeft: 5,
  },
  insideRow: {
    marginLeft: 35,
  },

  tableRowMid: {
    width: "20%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "center",
  },
  tableRowSmall: {
    width: "5%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "center",
  },
  tableRowLarge: {
    width: "55%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "left",
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
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 1,
  },
  reportTitle: {
    // letterSpacing: 2,
    fontSize: 15,
    marginTop: 1,
    textAlign: "left",
    textTransform: "uppercase",
    // textDecoration: "underline",
    // justifyContent: "center",
    // marginLeft: 230,
  },
  abyssinaHeading: {
    letterSpacing: 4,
    fontSize: 15,
    textAlign: "left",
    textTransform: "uppercase",
    justifyContent: "flex-start",

  },
  logo: {
    width: 40,
    height: 30,
    justifyContent: "flex-end",
    // marginLeft: "auto",
  },
  headerInfo: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 1,
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
