import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Row, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
// import Employee2Filter from "./Employee2Filter";
import DepartmentWidget from "../../HRComponents/DepartmentsWidget";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDepartments,
  Fetch as fetchDepartments,
} from "store/HR/Setup/Department";

export default function Departments() {
  const dispatch = useDispatch();
  const dipartments = useSelector(selectDepartments);
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dipartments]);

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

  return (
    <div>
      <CommonModals
        size="xl"
        data={modal.data}
        openModal={modal.openModal}
        component={modal.component}
        title={modal.title}
        toggle={toggle}
        buttonLabel="Save"
      />

      <Page
        title="Departments "
        breadcrumbs={[
          { name: "Human Resource", name1: "Resource Managemnt", active: true },
        ]}
      >
        <Row>
          {dipartments.map((dipartment) => (
            <Col md={4} sm={6} xs={12}>
              <div>
                <DepartmentWidget
                  departmentName={dipartment.name}
                  managerName="manager name "
                  DepartmentDescription=" some text for description"
                  noEmployees="30"
                  activeSinceDate="22/22/2222"
                />
              </div>
            </Col>
          ))}
        </Row>
      </Page>
    </div>
  );
}
