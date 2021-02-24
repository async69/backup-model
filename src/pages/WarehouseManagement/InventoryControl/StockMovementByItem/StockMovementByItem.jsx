import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import Page from "../../../../components/Page";
import CustomTable from "../../../common/table";
import CommonModals from "../../../../components/CommonModal";

const StockMovementByItem = ({ stocks, doneAdd }) => {
  const columns = [
    { path: "posting_date", label: "Posting Date" },
    { path: "item_number", label: "Item Number" },
    { path: "item", label: "Item Name" },
    { path: "current_quantity", label: "Remaining Quantity" },
    { path: "unit_of_measurement", label: "Unit of Measurement" },
    { path: "unit_price", label: "Unit Price" },
    { path: "warehouse", label: "Warehouse Name" },
  ];

  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, data) => {
    switch (type) {
      case "OPEN": {
        setModal({ openModal: true });
        break;
      }

      case "CLOSE": {
        setModal({ openModal: false, data: null });
        break;
      }
      default:
        return data;
    }
  };

  useEffect(() => {
    if (doneAdd) toggle("CLOSE");
  }, [doneAdd, toggle]);

  return (
    <div>
      <CommonModals
        size="xl"
        data={modal.data}
        openModal={modal.openModal}
        component={modal.component}
        title={modal.title}
        toggle={toggle}
        buttonLabel="Save Stock Movement By Item"
      />

      <Page>
        <Card className="mainTable">
          <CustomTable
            title="Stock Movement By Item"
            columns={columns}
            data={stocks}
          />
        </Card>
      </Page>
    </div>
  );
};
export default StockMovementByItem;
