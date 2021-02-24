import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import SalesJournalsTable from "./SalesJournalsTable";
import { useDispatch, useSelector } from "react-redux";
import SalesJournalForm from "./SalesJournalForm";
import {
  loadSalesJournals,
  getSalesJournals,
} from "store/Finance/Journals/salesJournals";

function SalesJournals() {
  const dispatch = useDispatch();
  const salesJournals = useSelector(getSalesJournals);
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, salesJournal) => {
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
            <SalesJournalForm salesJournal={salesJournal} disabled={true} />
          ),
        });
        break;
      }
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(loadSalesJournals());
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
        buttonLabel="Save Sales Journal"
      />
      <Page>
        <Card className="border-0">
          <CardBody>
            <SalesJournalsTable
              salesJournals={salesJournals}
              onToggle={toggle}
            />
          </CardBody>
        </Card>
      </Page>{" "}
    </div>
  );
}

export default SalesJournals;
