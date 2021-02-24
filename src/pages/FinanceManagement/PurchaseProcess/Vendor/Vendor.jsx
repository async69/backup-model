import React, { useReducer, useEffect } from "react";
import { Card, CardHeader, Button, Col } from "reactstrap";
import Page from "../../../../components/Page";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye } from "react-icons/md";
import VendorAdd from "./VendorAdd";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import { getDateFormat } from "../../../../helpers/date";

const Vendor = ({
  vendors,
  currencies,
  VAT_Posting_Groups,
  Vendor_Posting_Groups,
  General_Business_Posting_Groups,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Vendor Number" },
    { path: "name", label: "Vendor Name" },
    { path: "tin_number", label: "Tin No." },

    {
      key: "view",
      label: "Actions",
      content: (vendor) => (
        <>
          <Button
            className="m-1"
            size="sm"
            outline
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: VendorAdd,
                  data: vendor,
                  title: "View Vendor",
                  options: {
                    currencies,
                    VAT_Posting_Groups,
                    Vendor_Posting_Groups,
                    General_Business_Posting_Groups,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div>
      <CommonModals
        size="xl"
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        title={state.title}
        toggle={_toggle}
        dispatch={dispatch}
        title={state.title}
      />
      <Page>
        <Col align="right" className="newButton">
          {
            // Only purchase people add vendors
          }
          {(
            <Button
              onClick={() =>
                _toggle(
                  {
                    type: "ADD",
                    Component: VendorAdd,
                    data: {},
                    title: "Add Vendor",
                    // submit: (data) => addVendor(data),
                    options: {
                      currencies,
                      VAT_Posting_Groups,
                      Vendor_Posting_Groups,
                      General_Business_Posting_Groups,
                    },
                  },
                  dispatch
                )
              }
              outline
              size="sm"
            >
              New Vendor
            </Button>
          ) && false}
        </Col>
        <Card className="mainTable">
          <CustomTable
            title="Vendors"
            columns={columns}
            data={reverse(
              vendors.map((vendor) => ({
                ...vendor,
                updated_at: getDateFormat(vendor.updated_at),
              }))
            )}
          />
        </Card>
      </Page>
    </div>
  );
};
export default Vendor;
