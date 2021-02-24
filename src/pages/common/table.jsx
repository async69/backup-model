import React, { useContext, useEffect } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import TableFooter from "./TableFooter";
import {
  Table as ReactstrapTable,
  CardHeader,
  Card,
  CardFooter,
} from "reactstrap";
import { MainContext } from "../../context/Main/";
import { connect } from "react-redux";

const Table = ({ columns, data, title, state, getLoading }) => {
  // let objectSet = {};
  useEffect(() => {
    if (typeof getLoading === "function") {
      // const result = status(state)
      // console.log("result", getLoading(state, { isPatch: true }));
    }
  }, [state, getLoading]);
  const { rootState } = useContext(MainContext);

  useEffect(() => {
    try {
      // setCurrenctTab(activeTab)
    } catch (err) {}
  }, [rootState]);

  return (
    <Card className="p-2 border-0">
      <CardHeader className="tableHeaders border-0">
        <div>{"" + title ? title : ""}</div>
      </CardHeader>
      <ReactstrapTable size="md" responsive hover>
        <TableHeader columns={columns} />
        <TableBody data={data} columns={columns} />
      </ReactstrapTable>
      <CardFooter>
        <TableFooter />
      </CardFooter>
    </Card>
  );
};
const mapStateToProps = (state, ownProps) => ({ state, ...ownProps });

export default connect(mapStateToProps)(Table);
