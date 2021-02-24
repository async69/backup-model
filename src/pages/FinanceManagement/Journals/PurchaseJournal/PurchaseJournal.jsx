import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PurchaseJournalsTable from "./PurchaseJournalsTable";
import { useDispatch, useSelector } from "react-redux";
import PurchaseJournalForm from "./PurchaseJournalForm";
import {
  loadPurchaseJournals,
  getPurchaseJournals,
} from "store/Finance/Journals/purchaseJournals";

function PurchaseJournals() {
  const dispatch = useDispatch();
  const purchaseJournals = useSelector(getPurchaseJournals);
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, purchaseJournal) => {
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
            <PurchaseJournalForm
              purchaseJournal={purchaseJournal}
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
    dispatch(loadPurchaseJournals());
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
        buttonLabel="Save Purchase Journal"
      />
      <Page>
        <Card className="border-0">
          <CardBody>
            <PurchaseJournalsTable
              purchaseJournals={purchaseJournals}
              onToggle={toggle}
            />
          </CardBody>
        </Card>
      </Page>{" "}
    </div>
  );
}

export default PurchaseJournals;
