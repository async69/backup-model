import React, { useReducer } from "react";
import Page from "../../../../components/Page";
import ItemAvailabilityByLocationView from "./ItemAvailabilityByLocationView";
import { Card, Button } from "reactstrap";
import { MdRemoveRedEye } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";

const ItemAvailabilityByLocation = ({ ItemAvailabilityByLocations }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const columns = [
    { path: "item", label: "Item Number" },
    { path: "item_code", label: "Item Name" },
    { path: "warehouse_code", label: "Warehouse Code" },
    { path: "warehouse_name", label: "Warehouse Name" },
    { path: "quantity", label: "Current Quantity" },
    {
      key: "view",
      label: "Actions",
      content: (ItemAvailabilityByLocations) => (
        <Button
          className="m-1"
          size="sm"
          outline
          color="blue"
          onClick={() => {
            _toggle(
              {
                type: "VIEW",
                Component: ItemAvailabilityByLocationView,
                data: ItemAvailabilityByLocations,
                title: "View Item Availability By Location",
                size: "md",
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
        <CustomTable
          title="Item Availability By Location"
          columns={columns}
          data={ItemAvailabilityByLocations}
        />
      </Card>
    </Page>
  );
};

export default ItemAvailabilityByLocation;
