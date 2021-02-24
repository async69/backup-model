import React, { useState } from "react";
import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  Col,
  Row,
  CardHeader,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Doughnut, Pie } from "@reactchartjs/react-chart.js";
import { chartjs } from "./dashboardPage";
import VenTable from "./VenTable";
import ProductOutTable from "./ProductOutTable";

const DDButton = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        color="success"
        className="shadow"
        size="lg"
        style={{ margin: "1rem" }}
        outline
        caret
      >
        2019
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>2020</DropdownItem>
        <DropdownItem>2019</DropdownItem>
        <DropdownItem>2018</DropdownItem>
        <DropdownItem>2017</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

const DDButton2 = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        color="danger"
        className="shadow"
        size="lg"
        style={{ margin: "1rem" }}
        outline
        caret
      >
        Feburary
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>January</DropdownItem>
        <DropdownItem>Feburary</DropdownItem>
        <DropdownItem>March</DropdownItem>
        <DropdownItem>April</DropdownItem>
        <DropdownItem>May</DropdownItem>
        <DropdownItem>June</DropdownItem>
        <DropdownItem>July</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

const ProductionBatch = () => (
  <div>
    <DDButton />
    <DDButton2 />
    <Button
      className="shadow"
      color="primary"
      outline
      //   contained
      id="toggler"
      size="lg"
      style={{ margin: "1rem" }}
    >
      Batch Week 1
    </Button>
    <Button
      className="shadow"
      color="primary"
      contained
      size="lg"
      id="toggler2"
      style={{ margin: "1rem" }}
    >
      Batch Week 2
    </Button>
    <Button
      className="shadow"
      color="primary"
      outline
      size="lg"
      id="toggle3"
      style={{ margin: "1rem" }}
    >
      Batch Week 3
    </Button>
    <Button
      className="shadow"
      color="primary"
      outline
      size="lg"
      id="toggler4"
      style={{ margin: "1rem" }}
    >
      Batch Week 4
    </Button>
    <UncontrolledCollapse toggler="#toggler">
      <Row>
        <Col lg={3} md={6} sm={6} xs={12}>
          <Card className="shadow  radius">
            <CardHeader className="shadow">Raw Materials</CardHeader>
            <CardBody>
              <Doughnut
                width="25%"
                height="35%"
                data={chartjs.rawMaterial.data}
              />
            </CardBody>
          </Card>
        </Col>

        <Col lg={3} md={6} sm={6} xs={12}>
          <Card className="shadow  radius">
            <CardHeader className="shadow ">Vendors </CardHeader>
            <CardBody>
              <VenTable />
            </CardBody>
          </Card>
        </Col>

        <Col lg={3} md={6} sm={6} xs={12}>
          <Card className="shadow  radius">
            <CardHeader className="shadow"> Warehouse </CardHeader>
            <CardBody>
              <Pie
                width="25%"
                height="35%"
                data={chartjs.warehousePieChart.data}
              />
            </CardBody>
          </Card>
        </Col>

        <Col lg={3} md={6} sm={6} xs={12}>
          <Card className="shadow  radius">
            <CardHeader className="shadow">Products </CardHeader>
            <CardBody>
              <ProductOutTable />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </UncontrolledCollapse>
  </div>
);

export default ProductionBatch;
