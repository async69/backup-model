import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PaymentJournalsTable from "./PaymentJournalsTable";
import { useDispatch, useSelector } from "react-redux";
import PaymentJournalForm from "./PaymentJournalForm";
import {
  loadPaymentJournals,
  getPaymentJournals,
} from "store/Finance/Journals/paymentJournals";

function PaymentJournals() {
  const dispatch = useDispatch();
  const paymentJournals = useSelector(getPaymentJournals);
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, paymentJournal) => {
    switch (type) {
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
            <PaymentJournalForm
              paymentJournal={paymentJournal}
              disabled={true}
            />
          ),
        });
        break;
      }
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(loadPaymentJournals());
  }, []);

  return (
    <div>
      <CommonModals
        size="xl"
        data={modal.data}
        openModal={modal.openModal}
        component={modal.component}
        toggle={toggle}
        buttonLabel="Save Payment Journal"
      />
      <Page>
        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Payment Journal </CardHeader>
          </Col>

          <CardBody>
            <PaymentJournalsTable
              paymentJournals={paymentJournals}
              onToggle={toggle}
            />
          </CardBody>
        </Card>
      </Page>{" "}
    </div>
  );
}

export default PaymentJournals;
