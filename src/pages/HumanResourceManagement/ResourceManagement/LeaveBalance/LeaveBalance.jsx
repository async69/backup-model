import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import LeaveBalanceAdd from "./LeaveBalanceAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const LeaveBalance = ({
  doneAdd,
  addLeaveBalance,
  doneEdit,
  editLeaveBalance,
  deleteLeaveBalance,
  leaveBalances,
  options,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "annual_leave", label: "Annual Leave" },
    { path: "duration", label: "Duration" },
    { path: "from_date", label: "From Date" },
    { path: "to_date", label: "To Date" },
    { path: "leave_balance", label: "Leave Balance" },
    { path: "leave_request_date", label: "Leave Request Date" },
    { path: "leave_type.name", label: "Leave Type" },
    { path: "leave_utilized", label: "Leave Utilized" },
    { path: "remarks", label: "Remarks" },

    {
      key: "view",
      label: "Actions",
      content: (leaveBalances) => (
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
                  Component: LeaveBalanceAdd,
                  data: leaveBalances,
                  title: "View LeaveBalance",
                  options,
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
                  Component: LeaveBalanceAdd,
                  submit: editLeaveBalance,
                  data: leaveBalances,
                  title: "Edit LeaveBalance",
                  options,
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
                    id: leaveBalances.id,
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

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const okDelete = (id) => {
    deleteLeaveBalance(id);
  };

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
            onClick={() =>
              _toggle(
                {
                  type: "ADD",
                  Component: LeaveBalanceAdd,
                  submit: addLeaveBalance,
                  title: "New Leave Balance",
                  options,
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Leave Balance
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Leave Balances"
              columns={columns}
              data={reverse(
                leaveBalances.map((item) => ({
                  ...item,
                  updated_at: getDateFormat(item.updated_at),
                }))
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default LeaveBalance;
