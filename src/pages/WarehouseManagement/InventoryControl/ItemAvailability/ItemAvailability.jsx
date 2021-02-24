import React from "react";
import Page from "../../../../components/Page";
import { Card } from "reactstrap";
import CustomTable from "../../../common/table";

const ItemAvailabilities = ({ ItemAvailabilities }) => {
  const columns = [
    { path: "item_number", label: "Item Number" },
    { path: "item__name", label: "Item Name" },
    { path: "basic_unit_of_measurement", label: "Basic UOM" },
    { path: "quantity", label: "Current Quantity" },
  ];

  return (
    <div>
      <Page>
        <Card className="mainTable">
          <CustomTable
            title="Item Availabilities"
            columns={columns}
            data={ItemAvailabilities}
          />
        </Card>
      </Page>
    </div>
  );
};

export default ItemAvailabilities;
