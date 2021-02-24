import React, { useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CustomTable from "../../../common/table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "../../LedgerEntries/GeneralLedgerEntries/reports/Print";
import { MdPrint } from "react-icons/md";
import { getProperStringFormat } from "helpers/string";
import { FilterByName } from "../../../../helpers/Filter";

export const filterIncomeStatement = (incomeStatements) => {
  return incomeStatements.map((item) => {
    if (item.debit >= item.credit) {
      return {
        ...item,
        credit: 0,
      };
    } else {
      return {
        ...item,
        debit: 0,
      };
    }
  });
};

export const getDataFromObject = (results) => {
  const data = results ? (results[0] ? results[0] : {}) : [];
  const responseArray = [];
  const accountTypes = Object.keys(data);
  accountTypes.forEach((type) => {
    if (type !== "date") {
      data[type].forEach((item) => {
        responseArray.push({
          type: getProperStringFormat(type),
          subAccountType: item.sub_account_type,
          balance: item.balance,
        });
      });
    }
  });
  return responseArray;
};

const IncomeStatement = ({ incomeStatements, filterType, searchValue }) => {
  // const [statements, setStatements] = useState([])
  const columns = [
    { path: "type", label: "Chart of Account Type" },
    { path: "subAccountType", label: "Sub Account Type" },
    { path: "balance", label: "Balance" },
  ];

  useEffect(() => {
    const response = FilterByName(
      getDataFromObject(incomeStatements),
      filterType,
      searchValue
    );
    console.log("response data", getDataFromObject(incomeStatements));
    console.log("response", response);
    console.log("response filter", filterType);
    console.log("response search", searchValue);
  }, [filterType, searchValue, incomeStatements]);

  return (
    <div>
      <Page>
        <Col align="center" className="newButton">
          <PDFDownloadLink
            document={
              <Print invoice={filterIncomeStatement(incomeStatements)} />
            }
            fileName="IncomeStatement.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button size="sm" outline>
                  ...
                </Button>
              ) : (
                <Button size="sm" outline>
                  <MdPrint /> Print
                </Button>
              )
            }
          </PDFDownloadLink>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Income Statements"
              columns={columns}
              data={FilterByName(
                getDataFromObject(incomeStatements),
                filterType,
                searchValue
              )}
            />
            <PDFDownloadLink
              document={
                <Print invoice={filterIncomeStatement(incomeStatements)} />
              }
              fileName="IncomeStatement.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <Button size="sm" outline>
                    ...
                  </Button>
                ) : (
                  <Button size="sm" outline>
                    <MdPrint /> Print Income Statement
                  </Button>
                )
              }
            </PDFDownloadLink>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default IncomeStatement;
