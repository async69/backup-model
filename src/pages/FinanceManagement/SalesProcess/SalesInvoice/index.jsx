import React, { useState, useEffect, useContext } from "react";
import SalesInvoice from "./SalesInvoice";
import {
  selectFetchStatus,
  selectAddStatus,
  selectSalesInvoices,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/SalesProcess/SalesInvoice";
import {
  selectAddStatus as selectCashAddStatus,
  Add as addCashPayment,
} from "../../../../store/Finance/CashManagement/CashReceipts";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectCustomers } from "../../../../store/Finance/SalesProcess/Customers/";
import { selectCurrencies } from "../../../../store/GeneralSetup/Currencies/";
import { selectItemMasterDatas } from "../../../../store/Inventory/Setup/Item/Item_MasterData/";
import { selectItemCategories } from "../../../../store/Inventory/Setup/Item/Item_Categories";
import { selectUOMs } from "../../../../store/Inventory/Setup/UOM";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { selectBankAccounts } from "../../../../store/Finance/MasterData/BankAccounts/";
import {
  selectSalesOrders,
  Fetch as fetchSalesOrders,
} from "../../../../store/Sales/Common/SalesOrder/";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { activeTabs } from "../../SalesProcess";
import statusTypes from "../../../../config/statusTypes";
import { MainContext, SearchContext } from "../../../../context/";
import {
  assignFilterComponent,
  setLockComponent,
} from "../../../../context/Main/States/search";
import { Input } from "reactstrap";
import { FilterByName } from "../../../../helpers/Filter";
import { apiLineTag } from "./config";

const Loader = ({
  salesInvoices,
  fetchStatus,
  addStatus,
  fetchSalesInvoices,
  addSalesInvoice,
  editStatus,
  editSalesInvoice,
  patchStatus,
  patchSalesInvoice,
  deleteStatus,
  deleteSalesInvoice,
  customers,
  currencies,
  itemMasterDatas,
  itemCategories,
  UOMs,
  activeTab,
  COAs,
  bankAccounts,
  cashAddStatus,
  addCashPayment,
  salesOrders,
  fetchSalesOrders,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const [filterType, setFilterType] = useState("document_number");
  const [data, setData] = useState([]);
  const { rootState, dispatch } = useContext(MainContext);
  const { searchValue } = useContext(SearchContext);

  const FilterTypes = () => {
    const [selectedFilter, setFilter] = useState(filterType);

    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setFilter(value)}
        >
          <option value="document_number">By Document Number</option>
        </Input>
      </>
    );
  };
  useEffect(() => {
    setLockComponent({}, dispatch, false);
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    let filteredData = [];
    filteredData = FilterByName(
      salesInvoices,
      filterType,
      searchValue,
      filterType === "document_number"
    );
    setData(filteredData);
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    if (salesInvoices.length > 0) {
      setData(salesInvoices);
    }
  }, [salesInvoices, setData]);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchSalesInvoices([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setFetchLock(false);
    fetchSalesInvoices();
    fetchSalesOrders();
  }, [fetchSalesInvoices, fetchSalesOrders, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Sales Invoices");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.SALES_INVOICE) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, dispatch, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Saved Sales Invoice");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = cashAddStatus;
    try {
      const {
        response: { invoice },
      } = cashAddStatus;
      setData(
        data.map((item) =>
          item.id === invoice
            ? {
                ...item,
                status: statusTypes.PENDING_PAYMENT,
              }
            : item
        )
      );
    } catch (err) {}
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Collected Sales Invoice");
      setAddLock(true);
    }
  }, [cashAddStatus, setAddLock, setData]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Sales Invoice");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      toast.success(`${response.status} Sales Invoice`);
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Sales Invoice");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addSalesInvoice = (data) => {
    setAddLock(false);
    const requestBody = {
      approvedBy: data.approvedBy,
      approved_date: new Date(),
      customer_invoice_no: data.customerInvoiceNumber,
      customer: data.customerName,
      posted_date: data.postingDate,
      remarks: data.remark,
      sales_order: data.salesOrderNumber,
      salesType: data.salesType,
      siv_no: data.sivNumber,
      paid_amount: data.totalAmount,
      sales_invoice_line: data[apiLineTag].map((line) => ({
        quantity: line.quantity,
        quantity_invoiced: line.quantityInvoiced,
        unit_of_measurement: line.unit_of_measurement,
        unit_price: line.unitPrice,
        // "currency": line.currency,
        currency: "Birr",
        item: line.item,
        remaining_quantity: line.remainingQuantity,
        category: line.itemCategory,
        amount_excl_vat: line.amount_excl_vat,
      })),
    };

    addSalesInvoice(requestBody);
  };

  const _editSalesInvoice = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      approvedBy: data.approvedBy,
      customer_invoice_no: data.customerInvoiceNumber,
      customer: data.customerName,
      posted_date: data.postingDate,
      remarks: data.remark,
      sales_order: data.salesOrderNumber,
      salesType: data.salesType,
      siv_no: data.sivNumber,
      paid_amount: data.totalAmount,
      sales_invoice_line: data[apiLineTag].map((line) => ({
        id: line.id,
        quantity: line.quantity,
        quantity_invoiced: line.quantityInvoiced,
        unit_of_measurement: line.unit_of_measurement,
        unit_price: line.unitPrice,
        currency: line.currency,
        item: line.item,
        remaining_quantity: line.remainingQuantity,
        category: line.itemCategory,
        amount_excl_vat: line.amount_excl_vat,
      })),
    };

    patchSalesInvoice(requestBody);
  };

  const _approveSalesInvoice = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: "Approved",
      posting_date: "2020-01-01",
    };
    patchSalesInvoice(requestBody);
  };

  const _postSalesInvoice = (data) => {
    setPatchLock(false);
    console.log(data);
    const requestBody = {
      id: data.id,
      status: "Posted",
      posting_date: data.posting_date ? data.posting_date : "",
    };
    patchSalesInvoice(requestBody);
  };

  const _addCashPayment = (data) => {
    setAddLock(false);
    const requestBody = {
      invoice: data.invoice ? data.invoice : "",
      cash_account: data.cash_account ? data.cash_account : "",
      posting_date: data.posting_date ? data.posting_date : "",
      paid_amount: data.paid_amount ? Number(data.paid_amount) : "",
      is_bank_account: !Boolean(data.is_cash_account),
    };

    addCashPayment(requestBody);
  };

  const _deleteSalesInvoice = (id) => {
    setDeleteLock(false);
    deleteSalesInvoice(id);
  };

  return (
    <SalesInvoice
      salesInvoices={data}
      doneAdd={
        (addStatus.status === reduxStatus.success && !addLock) ||
        (cashAddStatus.status === reduxStatus.success && !addLock)
      }
      addSalesInvoice={_addSalesInvoice}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editSalesInvoice={_editSalesInvoice}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      approveSalesInvoice={_approveSalesInvoice}
      postSalesInvoice={_postSalesInvoice}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteSalesInvoice={_deleteSalesInvoice}
      customers={customers}
      currencies={currencies}
      itemMasterDatas={itemMasterDatas}
      itemCategories={itemCategories}
      UOMs={UOMs}
      COAs={COAs}
      bankAccounts={bankAccounts}
      addCashPayment={_addCashPayment}
      salesOrders={salesOrders.map((item) => ({ ...item, name: item.id }))}
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
  salesInvoices: selectSalesInvoices(state),
  customers: selectCustomers(state),
  currencies: selectCurrencies(state),
  itemMasterDatas: selectItemMasterDatas(state),
  itemCategories: selectItemCategories(state),
  UOMs: selectUOMs(state),
  COAs: selectChartOfAccounts(state),
  bankAccounts: selectBankAccounts(state),
  cashAddStatus: selectCashAddStatus(state),
  salesOrders: selectSalesOrders(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSalesInvoices: (data = null) => dispatch(Fetch(data)),
  fetchSalesOrders: () => dispatch(fetchSalesOrders()),
  addSalesInvoice: (data) => dispatch(Add(data)),
  editSalesInvoice: (data) => dispatch(Edit(data)),
  patchSalesInvoice: (data) => dispatch(Patch(data)),
  deleteSalesInvoice: (id) => dispatch(Remove(id)),
  addCashPayment: (data) => dispatch(addCashPayment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
