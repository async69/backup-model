import React, { useState, useEffect } from "react";
import CashReceipt from "./CashReceipt";
import {
  selectAddStatus,
  Add,
} from "../../../../store/Finance/CashManagement/CashReceipts";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import {
  Fetch,
  selectFetchStatus,
  selectSalesInvoices,
} from "../../../../store/Finance/SalesProcess/SalesInvoice/";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { selectCustomers } from "../../../../store/Finance/SalesProcess/Customers/";
import { selectCurrencies } from "../../../../store/GeneralSetup/Currencies/";
// import { selectItems } from "../../../../store/Finance/Setup/FinanceItem/"
import { selectItemCategories } from "../../../../store/Inventory/Setup/Item/Item_Categories";
import { selectUOMs } from "../../../../store/Inventory/Setup/UOM";

const Loader = ({
  fetchPIStatus,
  addStatus,
  addCashPayment,
  salesInvoices,
  fetchPurchseInvoices,
  accounts,
  customers,
  currencies,
  itemMasterDatas,
  itemCategories,
  UOMs,
}) => {
  const [fetchPILock, setFetchPILock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (invoices.length === 0) {
      setInvoices(salesInvoices);
    }
  }, [salesInvoices, setInvoices]);

  useEffect(() => {
    setFetchPILock(false);
    fetchPurchseInvoices();
  }, [fetchPurchseInvoices, setFetchPILock]);

  useEffect(() => {
    const { status } = fetchPIStatus;
    if (status === reduxStatus.failure && !fetchPILock) {
      toast.error("Failed Fetching Purchase Invoices");
      setFetchPILock(true);
    }
  }, [fetchPIStatus, setFetchPILock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      const index = invoices.findIndex(
        (invoice) => invoice.id === addStatus.response.invoice
      );
      if (index >= 0) {
        var updatedInvoices = invoices.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              status: "Paid",
            };
          } else {
            return item;
          }
        });
        setInvoices(updatedInvoices);
      }
      toast.success("Cash Received");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  const _addCashPayment = (data) => {
    setAddLock(false);
    const requestBody = {
      invoice: data.invoice ? data.invoice : "",
      cash_account: data.cash_account ? data.cash_account : "",
      posting_date: data.posting_date ? data.posting_date : "",
      paid_amount: data.paid_amount ? Number(data.paid_amount) : "",
    };

    addCashPayment(requestBody);
  };

  return (
    <CashReceipt
      salesInvoices={invoices}
      accounts={accounts}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCashPayment={_addCashPayment}
      customers={customers}
      currencies={currencies}
      itemMasterDatas={itemMasterDatas.map((item) => ({
        name: item.item_detail.name,
        id: item.item_detail.id,
      }))}
      itemCategories={itemCategories}
      UOMs={UOMs}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchPIStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  salesInvoices: selectSalesInvoices(state),
  accounts: selectChartOfAccounts(state),
  customers: selectCustomers(state),
  currencies: selectCurrencies(state),
  // itemMasterDatas: selectItems(state),
  itemCategories: selectItemCategories(state),
  UOMs: selectUOMs(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPurchseInvoices: () => dispatch(Fetch()),
  addCashPayment: (data) => dispatch(Add(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
