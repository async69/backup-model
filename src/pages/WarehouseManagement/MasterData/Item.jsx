import React, { useState, useEffect } from "react";
import Page from "../../../components/Page";
import { Button, Card, CardBody, CardHeader, Col } from "reactstrap";
import { confirmAlert } from "react-confirm-alert"; // Import

import CommonModals from "components/CommonModal";
import ItemsTable from "./ItemsTable";
import {
  selectItemMasterDatas as getItems,
  Remove as removeItem,
  selectDeleteStatus,
} from "store/Inventory/MasterData/items";
import ItemForm from "./ItemForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "constants/reduxStatus";
function Item(props) {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const deleteStatus = useSelector(selectDeleteStatus);
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure) {
      toast.error(deleteStatus.errors.errors.detail[0]);
    } else if (status === reduxStatus.success) {
      toast.success("Deleted Item");
    }
  }, [deleteStatus]);

  const toggle = (type, item) => {
    switch (type) {
      case "NEW": {
        setModal({
          openModal: true,

          component: <ItemForm />,
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
          component: <ItemForm item={item} disabled={true} />,
        });
        break;
      }
      case "EDIT": {
        setModal({ openModal: true, component: <ItemForm item={item} /> });
        break;
      }
      case "DELETE": {
        confirmAlert({
          title: "Are you sure?",
          message: "You want to delete this Item?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                await dispatch(removeItem(item.id));
                console.log("fasil", deleteStatus);
                // if (deleteStatus.status === "success") {
                //   toast.success("item deleted successfully");
                // }
              },
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
  return (
    <div>
      <CommonModals
        size="xl"
        data={modal.data}
        openModal={modal.openModal}
        component={modal.component}
        title={modal.title}
        toggle={toggle}
        buttonLabel="Save Goods Receiving Note"
      />
      <Page
        title="Item"
        breadcrumbs={[
          { name: "Warehouse Management", name1: "Master Data", active: true },
        ]}
      >
        <Col align="right" className="newButton">
          <Button onClick={() => toggle("NEW")} outline size="sm">
            New Item
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Item list </CardHeader>
          </Col>
          <CardBody>
            <ItemsTable items={items} onToggle={toggle} />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}

export default Item;
