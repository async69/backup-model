import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Col, Button } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import StoreRequisitionsTable from "./StoreRequisitionsTable";
import { useDispatch, useSelector } from "react-redux";
import StoreRequisitionForm from "./StoreRequisitionForm";
import { confirmAlert } from "react-confirm-alert";
import {
  loadStoreRequisitions,
  getStoreRequisitions,
  removeStoreRequisition,
  updateStoreRequisition,
} from "store/Inventory/Common/StoreRequisitions";

function StoreRequisition() {
  const dispatch = useDispatch();
  const storeRequisitions = useSelector(getStoreRequisitions);
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, storeRequisition) => {
    switch (type) {
      case "NEW": {
        setModal({
          openModal: true,

          component: <StoreRequisitionForm />,
        });
        break;
      }
      case "OPEN": {
        setModal({ openModal: true });
        break;
      }

      case "CLOSE": {
        setModal({ openModal: false, data: null });
        break;
      }
      case "VIEW": {
        setModal({
          openModal: true,
          component: (
            <StoreRequisitionForm
              storeRequisition={storeRequisition}
              disabled={true}
            />
          ),
        });
        break;
      }
      case "EDIT": {
        setModal({
          openModal: true,
          component: (
            <StoreRequisitionForm storeRequisition={storeRequisition} />
          ),
        });

        break;
      }
      case "DELETE": {
        confirmAlert({
          title: "Are you sure?",
          message: "You want to delete this Item?",
          buttons: [
            {
              label: "Yes",
              onClick: () => dispatch(removeStoreRequisition(storeRequisition)),
            },
            {
              label: "No",
            },
          ],
        });
        break;
      }
      case "POST": {
        const body = {
          id: storeRequisition.id,
          sr_lines: [],
          status: "Posted",
        };

        confirmAlert({
          title: "Are you sure?",
          message: "You want to post this Item?",
          buttons: [
            {
              label: "Yes",
              onClick: () => dispatch(updateStoreRequisition(body, true)),
            },
            {
              label: "No",
            },
          ],
        });
        break;
      }
      case "APPROVE": {
        const body = {
          id: storeRequisition.id,
          sr_lines: [],
          status: "Approved",
        };

        confirmAlert({
          title: "Are you sure?",
          message: "You want to approve this Item?",
          buttons: [
            {
              label: "Yes",
              onClick: () => dispatch(updateStoreRequisition(body, true)),
            },
            {
              label: "No",
            },
          ],
        });
        break;
      }

      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(loadStoreRequisitions());
  }, []);

  return (
    <div>
      <CommonModals
        size="xl"
        data={modal.data}
        openModal={modal.openModal}
        component={modal.component}
        title={modal.title}
        toggle={toggle}
        buttonLabel="Save Store Requisition"
      />
      <Page
        title="Store Requisition"
        breadcrumbs={[
          { name: "Warehouse Management", name1: "Common", active: true },
        ]}
      >
        <Col align="right" className="newButton">
          <Button onClick={() => toggle("NEW")} outline size="sm">
            New Store Requisition
          </Button>
        </Col>
        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Store Requisition </CardHeader>
          </Col>

          <CardBody>
            <StoreRequisitionsTable
              storeRequisitions={storeRequisitions}
              onToggle={toggle}
            />
          </CardBody>
        </Card>
      </Page>{" "}
    </div>
  );
}

export default StoreRequisition;
