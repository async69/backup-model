import React, { useReducer } from "react";
import Page from "../../../../components/Page";
import StockMovementByLocationView from "./StockMovementByLocationView";
import { Card, Button } from "reactstrap";
import { MdRemoveRedEye } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";

const StockMovementByLocation = ({ stocks }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const columns = [
    { path: "item_number", label: "Item No." },
    { path: "item", label: "Item Name" },
    { path: "warehouse", label: "Warehouse Name" },
    { path: "begining_quantity", label: "Beginning Qty" },
    { path: "unit_of_measurement", label: "Unit of Measurement" },
    {
      key: "view",
      label: "Actions",
      content: (stocks) => (
        <Button
          className="m-1"
          size="sm"
          outline
          color="blue"
          onClick={() => {
            _toggle(
              {
                type: "VIEW",
                Component: StockMovementByLocationView,
                data: stocks,
                title: "View Stock Movement",
                size: "xl",
              },
              dispatch
            );
          }}
        >
          <MdRemoveRedEye />
        </Button>
      ),
    },
  ];

  return (
    <Page>
      <CommonModals
        size={state.size}
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
        title={state.title}
      />
      <Card className="mainTable">
        <CustomTable title="Stock Movement" columns={columns} data={stocks} />
      </Card>
    </Page>
  );
};

export default StockMovementByLocation;
