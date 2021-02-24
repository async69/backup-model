import React, { useState, useEffect } from "react";
import CashPayment from "./CashPayment";
import {
  selectAddStatus,
  Add,
} from "../../../../store/Finance/CashManagement/CashPayment";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import {
  Fetch,
  selectFetchStatus,
  selectPurchaseInvoices,
} from "../../../../store/Finance/PurchaseProcess/PurchaseInvoice";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";

const Loader = ({
  fetchPIStatus,
  addStatus,
  addCashPayment,
  purchaseInvoices,
  fetchPurchseInvoices,
  accounts,
}) => {
  const [fetchPILock, setFetchPILock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (invoices.length === 0) {
      setInvoices(purchaseInvoices);
    }
  }, [purchaseInvoices, setInvoices]);

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
    const { status, errors } = addStatus;
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
      toast.success("Paid");
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
    <CashPayment
      purchaseInvoices={invoices}
      accounts={accounts}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCashPayment={_addCashPayment}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchPIStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  purchaseInvoices: selectPurchaseInvoices(state),
  accounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPurchseInvoices: () => dispatch(Fetch()),
  addCashPayment: (data) => dispatch(Add(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
