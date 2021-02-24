import React, { useState, useEffect } from "react";
import Page from "../../../components/Page";
import { Button, Card, CardBody, CardHeader, Col } from "reactstrap";
import ItemCategoriesTable from "./ItemCategoriesTable";
import {
  selectItemCategories,
  Remove as removeItemCategory,
  selectDeleteStatus,
} from "../../../store/Inventory/MasterData/itemCategories";
import ItemCategoryForm from "./ItemCategoryForm";
import CommonModals from "../../../components/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { reduxStatus } from "constants/reduxStatus";
import { toast } from "react-toastify";

function ItemCategory(props) {
  const dispatch = useDispatch();
  const itemCategories = useSelector(selectItemCategories);
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
      toast.success("Deleted Item Category");
    }
  }, [deleteStatus]);
  const toggle = async (type, itemCategory) => {
    switch (type) {
      case "NEW": {
        setModal({
          openModal: true,

          component: <ItemCategoryForm />,
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
            <ItemCategoryForm itemCategory={itemCategory} disabled={true} />
          ),
        });
        break;
      }
      case "EDIT": {
        setModal({
          openModal: true,
          component: <ItemCategoryForm itemCategory={itemCategory} />,
        });
        break;
      }
      case "DELETE": {
        confirmAlert({
          title: "Are you sure?",
          message: "You want to delete this Category?",
          buttons: [
            {
              label: "Yes",
              onClick: () => dispatch(removeItemCategory(itemCategory.id)),
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
        buttonLabel="Save item category"
      />
      <Page
        title="Item Categories"
        breadcrumbs={[
          { name: "Warehouse Management", name1: "Master Data", active: true },
        ]}
      >
        <Col align="right" className="newButton">
          <Button onClick={() => toggle("NEW")} outline size="sm">
            New Item Category
          </Button>
        </Col>
        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Item Categories list </CardHeader>
          </Col>
          <CardBody>
            <ItemCategoriesTable
              itemCategories={itemCategories}
              onToggle={toggle}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}

export default ItemCategory;
