import React, { useState, useReducer, useEffect, useContext } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import SalesOrderForm from "./SalesOrderForm";
import { MdRemoveRedEye, MdEdit, MdDelete, MdClose } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { IoIosCheckmark, IoIosSend } from "react-icons/io";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import statusTypes from "../../../../config/statusTypes";
import routes from "../../../../config/routes/index";
import { Redirect } from "react-router-dom";
import { MainContext } from "../../../../context/Main";
import {
  getState,
  defaultPermissions,
} from "../../../../context/Main/States/Department";
import { DownloadLink } from "../../../../components/DownloadLink";
import { printMapper } from "./SalesOrderprint/PrintMapper";
import Print from "./SalesOrderprint/components/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";

const FEATURE = "SALES ORDER";
const SalesOrder = ({
  salesOrders,
  addSalesOrder,
  editSalesOrder,
  deleteSalesOrder,
  sendForApproval,
  approveSalesOrder,
  rejectSalesOrder,
  invoiceSalesOrder,
  doneAdd,
  doneEdit,
  salesRegions,
  customers,
  itemCategories,
  items,
  UOMs,
  currencies,
  employees,
  status,
  getLoading,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [redirect, setRedirect] = useState("");
  const { rootState } = useContext(MainContext);
  const [permissions, setPermissions] = useState(defaultPermissions);

  useEffect(() => {
    const state = getState(rootState);
    if (state) {
      if (state.permissions) {
        setPermissions(state.permissions[FEATURE]);
      }
    }
  }, [rootState]);

  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "posting_date", label: "Posting Date " },
    { path: "customer.customer_number", label: "Customer No" },
    { path: "customer.name", label: "Customer Name " },
    // { path: "sales_region.name", label: "Sales Region" },
    // { path: "approved_by", label: "Approved By" },
    { path: "approved_date", label: "Approved Date" },
    { path: "status", label: "Status" },
    {
      key: "view",
      label: "Actions",
      content: (salesOrder) => (
        <>
          <Button
            size="sm"
            outline
            color="info"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: SalesOrderForm,
                  data: salesOrder,
                  title: "View Sales Order",
                  options: {
                    salesRegions,
                    customers,
                    itemCategories,
                    items,
                    UOMs,
                    currencies,
                    employees,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>

          {salesOrder.status ? (
            <DownloadLink
              Print={Print}
              fileName="sales-order"
              data={printMapper(salesOrder, invoice)}
            />
          ) : (
            <></>
          )}
          {salesOrder.status === statusTypes.OPEN && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(salesOrder)}
            >
              <IoIosSend />
            </Button>
          )}
          {salesOrder.status === statusTypes.SENT_FOR_APPROVAL && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => approveSalesOrder(salesOrder)}
            >
              <IoIosCheckmark /> Approve
            </Button>
          )}
          {salesOrder.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="danger"
              onClick={() => rejectSalesOrder(salesOrder)}
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {salesOrder.status === statusTypes.ISSUED ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => invoiceSalesOrder(salesOrder)}
            >
              Invoice
            </Button>
          ) : (
            <></>
          )}
          {salesOrder.status === statusTypes.INVOICING && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => setRedirect(routes.financeSalesProces)}
            >
              <IoMdCash />
            </Button>
          )}
          {salesOrder.status === statusTypes.OPEN && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: SalesOrderForm,
                    submit: editSalesOrder,
                    isEdit: true,
                    data: salesOrder,
                    options: {
                      salesRegions,
                      customers,
                      itemCategories,
                      items,
                      UOMs,
                      currencies,
                      employees,
                    },
                  },
                  dispatch
                );
              }}
            >
              <MdEdit />
            </Button>
          )}
          {salesOrder.status === statusTypes.OPEN && (
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
                      id: salesOrder.id,
                      message: "",
                    },
                  },
                  dispatch
                );
              }}
            >
              <MdDelete />
            </Button>
          )}
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteSalesOrder(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return redirect !== "" ? (
    <Redirect to={routes.financeSalesProces} />
  ) : (
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
        {permissions.create ? (
          <Col align="right" className="newButton">
            <Button
              onClick={() => {
                _toggle(
                  {
                    type: "ADD",
                    Component: SalesOrderForm,
                    submit: addSalesOrder,
                    isEdit: true,
                    options: {
                      salesRegions,
                      customers,
                      itemCategories,
                      items,
                      UOMs,
                      currencies,
                      employees,
                    },
                  },
                  dispatch
                );
              }}
              outline
              size="sm"
            >
              New Sales Order
            </Button>
          </Col>
        ) : (
          <></>
        )}

        <Card className="mainTable">
          <CustomTable
            title="Sales Orders"
            columns={columns}
            data={salesOrders}
            getLoading={getLoading}
          />
        </Card>
      </Page>
    </div>
  );
};

export default SalesOrder;
