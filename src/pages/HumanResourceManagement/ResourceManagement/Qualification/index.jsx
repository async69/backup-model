import React, { useState, useEffect, useContext } from "react";
import Qualification from "./Qualification";
import {
  selectFetchStatus,
  selectAddStatus,
  selectQualifications,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/HR/ResourceManagement/Qualification/";
import { selectQualificationTypes } from "store/HR/Setup/QualificationType";
import { selectEducationTypes } from "store/HR/Setup/EducationType";
import { selectInstitutions } from "store/HR/Setup/Institution";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { Input } from "reactstrap";

// import { activeTabs } from "../../WarehouseMasterdata";
import { setPageValues, getState } from "context/Main/States/Pagination";
import {
  assignFilterComponent,
  setLockComponent,
} from "context/Main/States/search";
import { SearchContext, MainContext } from "context/";
import { FilterByName, FilterByDate } from "helpers/Filter";
import { thisYear, nextYear } from "helpers/date";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchQualifications,
  addQualification,
  editStatus,
  editQualification,
  deleteStatus,
  deleteQualification,
  qualifications,
  qualificationTypes,
  educationTypes,
  institutions,
  employee,

  activeTab,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const { searchValue } = useContext(SearchContext);
  const { dispatch, rootState } = useContext(MainContext);

  const [filterType, setFilterType] = useState("document_number");
  const [startDate, setStartDate] = useState(thisYear);
  const [endDate, setEndDate] = useState(nextYear);
  const activeTabs = {};

  useEffect(() => {
    setData(qualifications);
  }, [qualifications, setData]);

  // Filtering component by document_number and posting date
  const FilterTypes = () => {
    const [selectedFilter, setSelectedFilter] = useState(filterType);
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(nextYear);

    useEffect(() => setStartDate(start), [start, setStartDate]);
    useEffect(() => setEndDate(end), [end, setEndDate]);
    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setSelectedFilter(value)}
        >
          <option value="document_number">By Qualification Number</option>
          {/* <option value="posting_date">Posting Date Range</option> */}
        </Input>
        {selectedFilter === "posting_date" ? (
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
        ) : (
          <></>
        )}
      </>
    );
  };

  //Assign filter commponent based on active tab
  useEffect(() => {
    if (activeTabs.ITEM === activeTab) {
      // alert("In");
      setLockComponent({}, dispatch, false);
      assignFilterComponent({}, dispatch, FilterTypes);
    }
  }, [activeTab, dispatch]);
  //Do filtering based on filter type
  useEffect(() => {
    let filteredData = [];
    if (filterType !== "posting_date") {
      setStartDate("");
      setEndDate("");
      filteredData = FilterByName(
        qualifications.map((grn) => ({
          ...grn,
          document_number: grn.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        qualifications,
        filterType,
        startDate,
        endDate
      );
    }
    setData(filteredData);
  }, [searchValue, setData, filterType, startDate, endDate]);
  // Pagenation
  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchQualifications([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);
  useEffect(() => {
    setFetchLock(false);
    fetchQualifications();
  }, [fetchQualifications, setFetchLock]);
  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Qualifications");
      setFetchLock(true);
    } else {
      if (activeTabs.ITEM === activeTab) {
        setPageValues(rootState, dispatch, response);
      }
    }
  }, [fetchStatus, setFetchLock, setPageValues, activeTab]);
  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Qualification");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);
  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Qualification");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);
  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Qualification");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);
  const _addQualification = (data) => {
    setAddLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    addQualification(formData);
  };
  const _editQualification = (data) => {
    setEditLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    editQualification(formData);
  };
  const _deleteQualification = (id) => {
    setDeleteLock(false);
    deleteQualification(id);
  };
  return (
    <Qualification
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addQualification={_addQualification}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editQualification={_editQualification}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteQualification={_deleteQualification}
      qualifications={data}
      options={{
        qualificationTypes,
        educationTypes,
        institutions,
        selectedEmployee: employee,
      }}
    />
  );
};
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  qualifications: selectQualifications(state),
  qualificationTypes: selectQualificationTypes(state),
  educationTypes: selectEducationTypes(state),
  institutions: selectInstitutions(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchQualifications: () => dispatch(Fetch()),
  addQualification: (data) => dispatch(Add(data)),
  editQualification: (data) => dispatch(Edit(data)),
  deleteQualification: (id) => dispatch(Remove(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Loader);
