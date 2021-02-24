import React, { useState, useEffect, useContext } from "react";
import PurhaseInvoice from "./PurchaseInvoice";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPurchaseInvoices,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/PurchaseProcess/PurchaseInvoice/";
import {
  selectAddStatus as selectCashAddStatus,
  Add as addCashPayment,
} from "../../../../store/Finance/CashManagement/CashPayment";
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
const apiLineTag = "new";

const Loader = ({
  purchaseInvoices,
  fetchStatus,
  addStatus,
  fetchPurchaseInvoices,
  addPurchaseInvoice,
  editStatus,
  editPurchaseInvoice,
  patchStatus,
  patchPurchaseInvoice,
  deleteStatus,
  deletePurchaseInvoice,
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
      purchaseInvoices,
      filterType,
      searchValue,
      filterType === "document_number"
    );
    setData(filteredData);
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    if (purchaseInvoices.length > 0) {
      setData(purchaseInvoices);
    }
  }, [purchaseInvoices, setData]);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchPurchaseInvoices([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setFetchLock(false);
    fetchPurchaseInvoices();
    fetchSalesOrders();
  }, [fetchPurchaseInvoices, fetchSalesOrders, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Purchase Invoices");
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
      toast.success("Saved Purchase Invoice");
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
      toast.success("Paid Purchase Invoice");
      setAddLock(true);
    }
  }, [cashAddStatus, setAddLock, setData]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Purchase Invoice");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      toast.success(`${response.status} Purchase Invoice`);
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Purchase Invoice");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPurchaseInvoice = (data) => {
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

    addPurchaseInvoice(requestBody);
  };

  const _editPurchaseInvoice = (data) => {
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

    patchPurchaseInvoice(requestBody);
  };

  const _approvePurchaseInvoice = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: "Approved",
      posting_date: "2020-01-01",
    };
    patchPurchaseInvoice(requestBody);
  };

  const _postPurchaseInvoice = (data) => {
    setPatchLock(false);
    console.log("click", data);
    const requestBody = {
      id: data.id,
      status: "Posted",
      posting_date: data.posting_date ? data.posting_date : "",
    };
    patchPurchaseInvoice(requestBody);
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

  const _deletePurchaseInvoice = (id) => {
    setDeleteLock(false);
    deletePurchaseInvoice(id);
  };

  return (
    <PurhaseInvoice
      purchaseInvoices={data}
      doneAdd={
        (addStatus.status === reduxStatus.success && !addLock) ||
        (cashAddStatus.status === reduxStatus.success && !addLock)
      }
      addPurchaseInvoice={_addPurchaseInvoice}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPurchaseInvoice={_editPurchaseInvoice}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      approvePurchaseInvoice={_approvePurchaseInvoice}
      postPurchaseInvoice={_postPurchaseInvoice}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePurchaseInvoice={_deletePurchaseInvoice}
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
  purchaseInvoices: selectPurchaseInvoices(state),
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
  fetchPurchaseInvoices: (data = null) => dispatch(Fetch(data)),
  fetchSalesOrders: () => dispatch(fetchSalesOrders()),
  addPurchaseInvoice: (data) => dispatch(Add(data)),
  editPurchaseInvoice: (data) => dispatch(Edit(data)),
  patchPurchaseInvoice: (data) => dispatch(Patch(data)),
  deletePurchaseInvoice: (id) => dispatch(Remove(id)),
  addCashPayment: (data) => dispatch(addCashPayment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
