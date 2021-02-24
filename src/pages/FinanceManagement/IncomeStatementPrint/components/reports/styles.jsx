import { StyleSheet } from "@react-pdf/renderer";

const borderColor = "#ffffff";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    // borderWidth: 1,
    borderColor: "#ffffff",
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
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  tableHeaderSmall: {
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  tableHeaderMid: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },

  tableHeaderLarge: {
    width: "35%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "borderColor",
    borderBottomWidth: 1,
    alignItems: "center",
    marginTop:5
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
    width: "20%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "center",
  },

  tableRowEnd :{
    width: "20%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "center",
    alignSelf: "flex-end",

  },


  insideRowMain: {
    marginLeft: 5,
    fontWeight:"bold",
    // fontSize:15
  },

  numRowBig:{
    fontWeight:"bold",
    fontSize:13
  },

  insideRow: {
    marginLeft: 35,
  },

  tableRowMid: {
    width: "10%",
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
    width: "60%",
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
    letterSpacing: 3,
    fontSize: 15,
    textAlign: "left",
    textTransform: "uppercase",
    justifyContent: "flex-start",

  },
  logo: {
    width: 50,
    height: 35,
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
