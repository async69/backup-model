import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "reactstrap";
import Page from "../../../../components/Page";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye } from "react-icons/md";
import CommonModals from "../../../../components/CommonModal";
import PurchaserAdd from "../../Modals/PurchaserAdd";

const Purchaser = ({ purchasers, doneAdd, addPurchaser }) => {
  const columns = [
    { path: "purchase_name", label: "Purchaser Name" },
    { path: "lastModified", label: "Last Modified Date" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (account) => (
        <Button
          size="sm"
          outline
          color="info"
          // onClick={() => this.toggle("viewAccount", account)}
        >
          <MdRemoveRedEye />
        </Button>
      ),
    },
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
        buttonLabel="Save Purchaser"
      />
      <Page
        title="Purchasers"
        breadcrumbs={[
          {
            name: "Purchase Management",
            name1: "Sales",
            active: true,
          },
        ]}
      >
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                ...modal,
                openModal: true,

                component: <PurchaserAdd addPurchaser={addPurchaser} />,
              })
            }
            outline
            size="sm"
          >
            New Purchaser
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Purchasers"
            columns={columns}
            data={reverse(purchasers)}
          />
        </Card>
      </Page>
    </div>
  );
};
export default Purchaser;
