import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Print from "./PayrollSlipPrint/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";

// Create styles

// Create Document Component
export const MyDocument = () => (
  <PDFViewer width="1000" height="600">
    <Print invoice={invoice} />
  </PDFViewer>
);
