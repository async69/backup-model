import React, { useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import ViewMovement from "./ViewMovement";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";

const StockMovements = ({ stockMovements }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "transaction_type", label: "Transaction Type" },
    { path: "item_number", label: "Item Number" },
    { path: "item", label: "Item Name" },

    // { path: "purchase_receipt_qty", label: "Purchase Receipt Qty" },
    // { path: "unit_of_measurement", label: "Unit of Measurement" },
    // { path: "purchase_receive_amount", label: "Purchase Receive Amount" },
    // { path: "sales_issue_order_qty", label: "Sales Issue Order Quantity" },
    // { path: "sales_issue_order_amount", label: "Sales Issue Order Amount" },
    // { path: "positive_adjustment_qty", label: "Posetive Adjustment Quantity" },
    // { path: "positive_adjustment_amount", label: "Posetive Adjustment Amount" },
    // { path: "negative_adjustment_qty", label: "Negative Adjustment Quantity" },
    // { path: "negative_adjustment_amount", label: "Negative Adjustment Amount" },
    // { path: "transfer_receive_qty", label: "Transfer Receive Quantity" },
    // { path: "transfer_receive_amount", label: "Transfer Receive Amount" },
    // { path: "transfer_issue_qty", label: "Transfer Issue Quantity" },
    // { path: "transfer_issue_amount", label: "Transfer Issue Amount" },
    // { path: "purchase_return_qty", label: "Purchase Return Quantity" },
    // { path: "purchase_return_amount", label: "Purchase Return Amount" },
    // { path: "sales_return_qty", label: "Sales Return Quantity" },
    // { path: "sales_return_amount", label: "Sales Return Amount" },
    // { path: "consumption_qty", label: "Consumption Quantity" },
    // { path: "consumption_amount", label: "Consumption Amount" },
    // { path: "disposal_qty", label: "Disposal Quantity" },
    // { path: "disposal_amount", label: "Disposal Amount" },
    // { path: "posting_date", label: "Posting Date" },
    {
      key: "view",
      label: "Actions",
      content: (stock) => (
        <>
          <Button
            className="m-1"
            size="sm"
            outline
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  data: stock,
                  Component: ViewMovement,
                  title: "Stock Movement",
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <CommonModals
        size="xl"
        title={state.title}
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
      />

      <Page>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Stock Movements"
              columns={columns}
              data={reverse(stockMovements)}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default StockMovements;
