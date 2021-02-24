import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import { _toggle } from "../../../common/ModalOptions";
import { columns, data as sampleData, schema } from "./example";
import { initialState, reducer, addLine } from "./InLineEditableTable";
import { InlineTable } from "./InLineEditableTable/render";

const GeneralProductPostingSetup = ({ doneAdd, doneEdit }) => {
  const [, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div>
      <CommonModals size="xl" toggle={_toggle} dispatch={dispatch} />

      <Page>
        <Col align="right" className="newButton">
          <Button onClick={() => addLine(dispatch)} outline size="sm">
            New General Product Posting Setup
          </Button>
          <Button
            onClick={() => {
              // console.log(getData(state))
            }}
            outline
            size="sm"
          >
            Get Data
          </Button>
        </Col>
        <Card className="border-0">
          <CardHeader className="border-0">
            General Product Posting Setup{" "}
          </CardHeader>

          <CardBody>
            <InlineTable
              callback={() => null}
              columns={columns}
              schema={schema}
              data={sampleData}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default GeneralProductPostingSetup;
