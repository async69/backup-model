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

  confidentialContainer: {
    width: "20%",
    color: "#ffffff",
    backgroundColor: "#222222",
    fontSize:12,
    justifyContent:"center",
    alignItems: "center",
    textAlign: "center",


  },
  tableHeader: {
    width: "25%",
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
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },

  tableHeaderNetPay: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
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


  tableRowLarge: {
    width: "50%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "center",
  },

  tableRow: {
    width: "25%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "center",
  },

  tableRowEnd: {
    width: "20%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "center",
    alignSelf: "flex-end",

  },


  insideRowMain: {
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 15
  },

  numRowBig: {
    fontWeight: "bold",
    fontSize: 13
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
  boxContainer: {
    width: "25%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "left",
  },

  boxContainer2: {
    width: "50%",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "left",
  },

  row: {
    flexDirection: "row",
    borderBottomColor: "borderColor",
    borderBottomWidth: 1,
    alignItems: "center",
    marginTop: 5
    // height: 20,
    // fontStyle: "bold",
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
    marginBottom:5,
  },
  secondtitleContainer:{
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
    marginBottom:5,
  },


  reportTitle: {
    width:"70%",
    fontSize: 20,
    marginTop: 1,
    textAlign: "left",
    textTransform: "uppercase",
  },

  headerDate:{
    width:"30%",
    fontSize: 15,
    marginTop: 1,
    textAlign: "left",
    // textTransform: "uppercase",
  },
  abyssinaHeading: {
    width: "60%",
    letterSpacing: 3,
    fontSize: 15,
    textAlign: "center",
    textTransform: "uppercase",
    justifyContent: "flex-start",

  },
  logoContainer: {
    width: "10%"
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
