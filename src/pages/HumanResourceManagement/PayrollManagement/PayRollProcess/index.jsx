import React, { useState, useEffect, useContext } from "react";
import PayrollProcess from "./PayrollProcess";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPayrollProcesss,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/HR/PayrollManagement/PayrollProcess";
import {
  Add as SavePayrollProcess,
  selectPatchStatus,
  Patch,
  selectAddStatus as selectSavePayrollProcesssAddStatus,
} from "store/HR/PayrollManagement/SavePayrollProcess";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "constants/reduxStatus";
import { SearchContext, MainContext } from "context/";
import {
  assignFilterComponent,
  setLockComponent,
} from "context/Main/States/search";
import { FilterByName } from "helpers/Filter";
import { Input } from "reactstrap";
import { startOfMonth, endOfMonth } from "helpers/date";
import statusTypes from "../../../../config/statusTypes";

const Loader = ({
  fetchStatus,
  addStatus,
  patchStatus,
  fetchPayrollProcesss,
  addPayrollProcess,
  editStatus,
  editPayrollProcess,
  deleteStatus,
  deletePayrollProcess,
  payrollProcesss,
  savePayrollProcess,
  saveAddStatus,
  patchPayrollProcess,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [filterType] = useState("name");

  const { searchValue } = useContext(SearchContext);
  const { dispatch } = useContext(MainContext);

  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(endOfMonth);

  useEffect(() => {
    setData(payrollProcesss);
  }, [payrollProcesss, setData]);

  // Filtering component by document_number and posting date
  const FilterTypes = () => {
    const [start, setStart] = useState(startOfMonth);
    const [end, setEnd] = useState(endOfMonth);

    useEffect(() => setStartDate(start), [start, setStartDate]);
    useEffect(() => setEndDate(end), [end, setEndDate]);

    return (
      <>
        Start Date{" "}
        <Input
          type="date"
          value={start}
          onChange={({ currentTarget: { value } }) => setStart(value)}
        />
        End Date
        <Input
          type="date"
          value={end}
          onChange={({ currentTarget: { value } }) => setEnd(value)}
        />
      </>
    );
  };

  useEffect(() => {
    setLockComponent({}, dispatch, false);
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    setData(FilterByName(payrollProcesss, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchPayrollProcesss([
      { key: "from_date", value: startDate },
      { key: "to_date", value: endDate },
    ]);
  }, [fetchPayrollProcesss, setFetchLock, startDate, endDate]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added PayrollProcess");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, response } = saveAddStatus;
    console.log(response, "saved");
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Saved!");
      if (response) {
        const newPayrollProcess = {
          ...payrollProcesss,
          status: response.status,
          id: response.id,
        };
        setData(newPayrollProcess);
      }
      setAddLock(true);
    }
  }, [saveAddStatus, setAddLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.POSTED) {
        toast.success(`Good Receiving Note ${response.status}`);
        setPatchLock(true);
      } else if (response.status === statusTypes.OPEN_SIV) {
        toast.success("Good Receiving Note Approved");
        setPatchLock(true);
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Good Receiving Note Rejected");
        setPatchLock(true);
      }
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited PayrollProcess");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted PayrollProcess");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPayrollProcess = (data) => {
    setAddLock(false);
    addPayrollProcess(data);
  };

  const _editPayrollProcess = (data) => {
    setEditLock(false);

    editPayrollProcess(data);
  };

  const _deletePayrollProcess = (id) => {
    setDeleteLock(false);
    deletePayrollProcess(id);
  };

  const _postPayrollProcess = (data) => {
    console.log(data, "payroll_data");
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.POSTED,
    };

    patchPayrollProcess(requestBody);
  };

  const _savePayrollProcess = (data) => {
    setAddLock(false);
    // const requestBody = data.map((d) => ({ ...d, employee: d.employee.id }));
    let requestBody = { ...data };
    requestBody.payroll_lines = requestBody.payroll_lines.map((l) => ({
      ...l,
      employee: l.employee.id,
    }));
    console.log("request body", requestBody);
    savePayrollProcess(requestBody);
  };

  return (
    <PayrollProcess
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPayrollProcess={_addPayrollProcess}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPayrollProcess={_editPayrollProcess}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePayrollProcess={_deletePayrollProcess}
      payrollProcesss={data}
      savePayrollProcess={_savePayrollProcess}
      saveAddStatus={saveAddStatus.status}
      postPayrollProcess={_postPayrollProcess}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  payrollProcesss: selectPayrollProcesss(state),
  saveAddStatus: selectSavePayrollProcesssAddStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPayrollProcesss: (data) => dispatch(Fetch(data)),
  addPayrollProcess: (data) => dispatch(Add(data)),
  editPayrollProcess: (data) => dispatch(Edit(data)),
  deletePayrollProcess: (id) => dispatch(Remove(id)),
  savePayrollProcess: (data) => dispatch(SavePayrollProcess(data)),
  patchPayrollProcess: (data) => dispatch(Patch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
