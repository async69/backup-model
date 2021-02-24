import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Col, Button } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import TransferOrderReceivesTable from "./TransferOrderReceivesTable";
import { useDispatch, useSelector } from "react-redux";
import TransferOrderReceiveForm from "./TransferOrderReceiveForm";
import { confirmAlert } from "react-confirm-alert";
import {
  loadTransferOrderReceives,
  getTransferOrderReceives,
  removeTransferOrderReceive,
  updateTransferOrderReceive,
} from "store/Inventory/Common/TransferOrderReceives";
import { MdEdit, MdPrint } from "react-icons/md";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Print from "./TORprint/components/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";

function TransferOrderReceive() {
  const dispatch = useDispatch();
  const transferOrderReceives = useSelector(getTransferOrderReceives);
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, transferOrderReceive) => {
    switch (type) {
      case "NEW": {
        setModal({
          openModal: true,

          component: <TransferOrderReceiveForm />,
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
            <TransferOrderReceiveForm
              transferOrderReceive={transferOrderReceive}
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
            <TransferOrderReceiveForm
              transferOrderReceive={transferOrderReceive}
            />
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
              onClick: () =>
                dispatch(removeTransferOrderReceive(transferOrderReceive)),
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
          id: transferOrderReceive.id,
          sr_lines: [],
          status: "Posted",
        };

        confirmAlert({
          title: "Are you sure?",
          message: "You want to post this Item?",
          buttons: [
            {
              label: "Yes",
              onClick: () => dispatch(updateTransferOrderReceive(body, true)),
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
          id: transferOrderReceive.id,
          sr_lines: [],
          status: "Approved",
        };

        confirmAlert({
          title: "Are you sure?",
          message: "You want to approve this Item?",
          buttons: [
            {
              label: "Yes",
              onClick: () => dispatch(updateTransferOrderReceive(body, true)),
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
    dispatch(loadTransferOrderReceives());
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
        buttonLabel="Save Transfer Order Receive"
      />
      <Page
        title="Transfer Order Receive"
        breadcrumbs={[
          { name: "Warehouse Management", name1: "Common", active: true },
        ]}
      >
        <Col align="right" className="newButton">
          <Button onClick={() => toggle("NEW")} outline size="sm">
            New Transfer Order Receive
          </Button>
        </Col>
        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">
              Transfer Order Receive{" "}
            </CardHeader>
          </Col>

          <CardBody>
            <TransferOrderReceivesTable
              transferOrderReceives={transferOrderReceives}
              onToggle={toggle}
            />
            <PDFDownloadLink
              document={
                <Print
                  orientation="landscape"
                  className="app"
                  invoice={invoice}
                />
              }
              fileName="TOR.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <Button className="ml-3" size="sm" outline color="primary">
                    Loading ...
                  </Button>
                ) : (
                  <Button className="ml-3" size="sm" outline color="primary">
                    <MdPrint />
                  </Button>
                )
              }
            </PDFDownloadLink>
          </CardBody>
        </Card>
      </Page>{" "}
    </div>
  );
}

export default TransferOrderReceive;
