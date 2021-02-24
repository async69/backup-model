import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import VendorForm from "./VendorForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";

const Vendor = ({
  vendors,
  addVendor,
  editVendor,
  deleteVendor,
  doneAdd,
  doneEdit,
  countries,
  cities,
  regions,
  vatPostingGroups,
  vendorPostingGroups,
  currencies,
  vendorTypes,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Vendor Number" },
    { path: "vendor_name", label: "Vendor Name" },
    { path: "tin_number", label: "Tin Number " },
    { path: "vendor_posting_group_detail.name", label: "Vendor Posting Group" },
    { path: "vendor_type_detail.name", label: "Vendor Type" },
    {
      key: "view",
      label: "Actions",
      content: (customer) => (
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
                  Component: VendorForm,
                  data: customer,
                  title: "View Vendor",
                  options: {
                    countries,
                    cities,
                    regions,
                    vatPostingGroups,
                    vendorPostingGroups,
                    currencies,
                    vendorTypes,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          <Button
            className="m-1"
            size="sm"
            outline
            color="warning"
            onClick={() => {
              _toggle(
                {
                  type: "EDIT",
                  Component: VendorForm,
                  submit: editVendor,
                  isEdit: true,
                  data: customer,
                  title: "Edit Vendor",
                  options: {
                    countries,
                    cities,
                    regions,
                    vatPostingGroups,
                    vendorPostingGroups,
                    currencies,
                    vendorTypes,
                  },
                },
                dispatch
              );
            }}
          >
            <MdEdit />
          </Button>
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
                    id: customer.id,
                    message: "",
                  },
                },
                dispatch
              );
            }}
          >
            <MdDelete />
          </Button>
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteVendor(id);
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
                  Component: VendorForm,
                  submit: addVendor,
                  isEdit: true,
                  title: "Add Vendor",
                  data: {},
                  options: {
                    countries,
                    cities,
                    regions,
                    vatPostingGroups,
                    vendorPostingGroups,
                    currencies,
                    vendorTypes,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Vendor
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Vendors"
            columns={columns}
            data={reverse(vendors)}
          />
        </Card>
      </Page>
    </div>
  );
};

export default Vendor;
