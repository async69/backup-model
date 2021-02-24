// @ts-nocheck
import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import SalesPersonForm from "./SalesPersonForm";
import { useDispatch, useSelector } from "react-redux";
import { getSalesPersons, loadSalesPersons } from "store/Sales/salesPersons";
import SalesPersonsTable from "./SalesPersonsTable";

export default function SalesPerson() {
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
  const dispatch = useDispatch();
  const salesPersons = useSelector(getSalesPersons);
  useEffect(() => {
    dispatch(loadSalesPersons());
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
        buttonLabel="Save Sales Person"
      />

      <Page
        title="Sales Person"
        breadcrumbs={[
          { name: "Sales Management", name1: "Master Data", active: true },
        ]}
      >
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                openModal: true,

                component: <SalesPersonForm />,
              })
            }
            outline
            size="sm"
          >
            New Sales Person
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Sales Person </CardHeader>
          </Col>
          <CardBody>
            <SalesPersonsTable salesPersons={salesPersons} />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
