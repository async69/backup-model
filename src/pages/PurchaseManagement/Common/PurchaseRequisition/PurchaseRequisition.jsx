import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import CustomerForm from "./PurchaseRequisitionForm";
import { MdRemoveRedEye, MdEdit, MdDelete, MdClose } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import { getDateFormat } from "../../../../helpers/date";
import statusTypes from "../../../../config/statusTypes";
import { MdPrint } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "./PurchaseRequisitionprint/components/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";
import { IoIosSend } from "react-icons/io";

const PurchaseRequisition = ({
  purchaseRequisitions,
  addPurchaseRequisition,
  editPurchaseRequisition,
  deletePurchaseRequisition,
  sendForApproval,
  approvePurchaseRequisition,
  rejectPurchaseRequisition,
  doneAdd,
  doneEdit,
  itemMasterDatas,
  UOMs,
  vendors,
  itemCategories,
  currencies,
  purchaseTypes,
  employees,
  departments,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "requested_by", label: "Requested By" },
    { path: "vendor_detail.name", label: "Vendor Name" },
    { path: "approved_date", label: "Approved Date" },
    { path: "status", label: "Status" },

    {
      key: "view",
      label: "Actions",
      content: (purchaseRequisition) => (
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
                  Component: CustomerForm,
                  data: purchaseRequisition,
                  title: "View Purchase Requisitions",
                  options: {
                    itemMasterDatas,
                    UOMs,
                    vendors,
                    itemCategories,
                    currencies,
                    purchaseTypes,
                    employees,
                    departments,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {purchaseRequisition.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(purchaseRequisition)}
            >
              {/* Send For Approval */}
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {purchaseRequisition.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              color="success"
              onClick={() => approvePurchaseRequisition(purchaseRequisition)}
            >
              <IoIosSend /> Approve
            </Button>
          ) : (
            <></>
          )}
          {purchaseRequisition.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              color="danger"
              onClick={() => rejectPurchaseRequisition(purchaseRequisition)}
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {purchaseRequisition.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: CustomerForm,
                    submit: editPurchaseRequisition,
                    isEdit: true,
                    data: purchaseRequisition,
                    title: "Edit Purchase Requisitions",
                    options: {
                      itemMasterDatas,
                      UOMs,
                      vendors,
                      itemCategories,
                      currencies,
                      purchaseTypes,
                      employees,
                      departments,
                    },
                  },
                  dispatch
                );
              }}
            >
              <MdEdit />
            </Button>
          ) : (
            <></>
          )}
          {purchaseRequisition.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="danger"
              onClick={() => {
                _toggle(
                  {
                    type: "DELETE",
                    deleteOptions: {
                      okCallback: okDelete,
                      title: "Are you sure?",
                      id: purchaseRequisition.id,
                      message: "",
                    },
                  },
                  dispatch
                );
              }}
            >
              <MdDelete />
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deletePurchaseRequisition(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div>
      <Page>
        <CommonModals
          size="xl"
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          toggle={_toggle}
          dispatch={dispatch}
          title={state.title}
        />
        <Col align="right" className="newButton">
          <Button
            onClick={() => {
              _toggle(
                {
                  type: "ADD",
                  Component: CustomerForm,
                  submit: addPurchaseRequisition,
                  isEdit: true,
                  data: {},
                  options: {
                    itemMasterDatas,
                    UOMs,
                    vendors,
                    itemCategories,
                    currencies,
                    purchaseTypes,
                    employees,
                    departments,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Purchase Requisition
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Purchase Requisitions"
            columns={columns}
            data={reverse(
              purchaseRequisitions.map((item) => ({
                ...item,
                approved_date: getDateFormat(item.approved_date),
                posting_date: getDateFormat(item.posting_date),
                expected_delivery_date: getDateFormat(
                  item.expected_delivery_date
                ),
                updated_at: getDateFormat(item.updated_at),
              }))
            )}
          />
          <PDFDownloadLink
            document={
              <Print
                orientation="landscape"
                className="app"
                invoice={invoice}
              />
            }
            fileName="PurchaseRequsition.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button className="ml-3" size="sm" outline color="info">
                  Loading ...
                </Button>
              ) : (
                <Button className="ml-3" size="sm" outline color="info">
                  <MdPrint />
                </Button>
              )
            }
          </PDFDownloadLink>

          {/* <PDFViewer width="1000" height="600">
              <Print invoice={invoice} />
            </PDFViewer> */}
        </Card>
      </Page>
    </div>
  );
};

export default PurchaseRequisition;
