import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Col, Button } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import TransferOrderIssuesTable from "./TransferOrderIssuesTable";
import { useDispatch, useSelector } from "react-redux";
import TransferOrderIssueForm from "./TransferOrderIssueForm";
import { confirmAlert } from "react-confirm-alert";
import {
  loadTransferOrderIssues,
  getTransferOrderIssues,
  removeTransferOrderIssue,
  updateTransferOrderIssue,
} from "store/Inventory/Common/TransferOrderIssues";

function TransferOrderIssue() {
  const dispatch = useDispatch();
  const transferOrderIssues = useSelector(getTransferOrderIssues);
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, transferOrderIssue) => {
    switch (type) {
      case "NEW": {
        setModal({
          openModal: true,

          component: <TransferOrderIssueForm />,
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
            <TransferOrderIssueForm
              transferOrderIssue={transferOrderIssue}
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
            <TransferOrderIssueForm transferOrderIssue={transferOrderIssue} />
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
                dispatch(removeTransferOrderIssue(transferOrderIssue)),
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
          id: transferOrderIssue.id,
          sr_lines: [],
          status: "Posted",
        };

        confirmAlert({
          title: "Are you sure?",
          message: "You want to post this Item?",
          buttons: [
            {
              label: "Yes",
              onClick: () => dispatch(updateTransferOrderIssue(body, true)),
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
          id: transferOrderIssue.id,
          sr_lines: [],
          status: "Approved",
        };

        confirmAlert({
          title: "Are you sure?",
          message: "You want to approve this Item?",
          buttons: [
            {
              label: "Yes",
              onClick: () => dispatch(updateTransferOrderIssue(body, true)),
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
    dispatch(loadTransferOrderIssues());
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
        buttonLabel="Save Transfer Order Issue"
      />
      <Page
        title="Transfer Order Issue"
        breadcrumbs={[
          { name: "Warehouse Management", name1: "Common", active: true },
        ]}
      >
        <Col align="right" className="newButton">
          <Button onClick={() => toggle("NEW")} outline size="sm">
            New Transfer Order Issue
          </Button>
        </Col>
        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Transfer Order Issue </CardHeader>
          </Col>

          <CardBody>
            <TransferOrderIssuesTable
              transferOrderIssues={transferOrderIssues}
              onToggle={toggle}
            />
          </CardBody>
        </Card>
      </Page>{" "}
    </div>
  );
}

export default TransferOrderIssue;
