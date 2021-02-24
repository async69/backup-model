import React, { useState, useEffect } from "react";
import FinanceDashboard from "./FinanceDashboard";
import {
  Fetch as fetchSalesOrders,
  selectSalesOrders,
} from "../../../store/Sales/Common/SalesOrder/";
import {
  Fetch as fetchPurchaseOrders,
  selectPurchaseOrders,
} from "../../../store/Purchase/Common/PurchaseOrder/";
import {
  Fetch as fetchSalesInvoices,
  selectSalesInvoices,
} from "../../../store/Finance/SalesProcess/SalesInvoice/";
import {
  Fetch as fetchPurchaseInvoices,
  selectPurchaseInvoices,
} from "../../../store/Finance/PurchaseProcess/PurchaseInvoice/";
import {
  Fetch as fetchCOAs,
  selectChartOfAccounts,
} from "../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import {
  Fetch as fetchBanks,
  selectBanks,
} from "../../../store/Finance/MasterData/Bank";
import {
  Fetch as fetchBankAccounts,
  selectBankAccounts,
} from "../../../store/Finance/MasterData/BankAccounts";
import {
  Fetch as fetchBalanceSheet,
  selectBalanceSheet,
} from "store/Finance/Reports/BalanceSheet";
import {
  Fetch as fetchTrialBalance,
  selectTrialBalance,
} from "store/Finance/Reports/TrialBalance";
import { connect } from "react-redux";
import { chartjs } from "../../../demos/dashboardPage";
import monthes from "../../../static/data/monthes.json";
import statusTypes from "../../../config/statusTypes";
import { getDateFormat } from "../../../helpers/date";
import HelpMath from "../../../helpers/math";

const Loader = ({
  salesOrders,
  fetchSalesOrders,
  purchaseOrders,
  fetchPurchaseOrders,
  salesInvoices,
  fetchSalesInvoices,
  purchaseInvoices,
  fetchPurchaseInvoices,
  COAs,
  fetchCOAs,
  banks,
  fetchBanks,
  bankAccounts,
  fetchBankAccounts,
  balanceSheet,
  fetchBalanceSheet,
  trialBalance,
  fetchTrialBalance,
}) => {
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [thisMonthGrossProfit, setThisMonthGross] = useState(0);
  const [lastMonthGrossProfit, setLastMonthGross] = useState(0);
  useEffect(() => {
    fetchSalesOrders();
  }, [fetchSalesOrders]);

  useEffect(() => {
    fetchPurchaseOrders();
  }, [fetchPurchaseOrders]);

  useEffect(() => {
    fetchSalesInvoices();
  }, [fetchSalesInvoices]);

  useEffect(() => {
    fetchPurchaseInvoices();
  }, [fetchPurchaseInvoices]);

  useEffect(() => {
    fetchCOAs();
  }, [fetchCOAs]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  useEffect(() => {
    fetchBalanceSheet();
  }, [fetchBalanceSheet]);

  useEffect(() => {
    fetchTrialBalance();
  }, [fetchTrialBalance]);

  useEffect(() => {
    fetchBankAccounts();
  }, [fetchBankAccounts]);

  let thisMonthGross = 0;
  let lastMonthGross = 0;
  useEffect(() => {
    if (salesOrders.length > 0) {
      let totalSales = 0;
      salesOrders.forEach(
        (sale) => (totalSales = totalSales + Number(sale.total))
      );
      setTotalCredit(totalSales);
    }

    if (purchaseOrders.length > 0) {
      let totalSales = 0;
      const todayTime = new Date().getTime();
      const oneMonth = 2678400000;
      const twoMonthes = 5184000000;
      purchaseOrders.forEach((purchase) => {
        totalSales = totalSales + Number(purchase.total);
        const givenTime = new Date(purchase.created_at).getTime();
        if (todayTime - givenTime <= oneMonth) {
          thisMonthGross = thisMonthGross + Number(purchase.total);
        } else if (todayTime - givenTime <= twoMonthes) {
          lastMonthGross = lastMonthGross + Number(purchase.total);
        }
      });
      setThisMonthGross(thisMonthGross);
      setLastMonthGross(lastMonthGross);
      setTotalDebit(totalSales);
    }
  }, [salesOrders, purchaseOrders]);

  const types = {
    SALES_VS_PURCHASE: "SALES_VS_PURCHASE",
    SALES_VS_PURCHASE_INVOICES: "SALES_VS_PURCHASE_INVOICES",
    GET_RECEIVING_PAYMENTS: "GET_RECEIVING_PAYMENTS",
    GET_DAILY_CASH_MOVEMENT: "GET_DAILY_CASH_MOVEMENT",
    NET_INCOME: "NET_INCOME",
    GET_ACCOUNT_DATA: "GET_ACCOUNT_DATA",
  };
  const getData = (data, type) => {
    switch (type) {
      case types.SALES_VS_PURCHASE: {
        const { salesOrders, purchaseOrders } = data;
        const salesDates = salesOrders.map((sales) => sales.created_at);
        const salesAmount = salesOrders.map((sales) => Number(sales.total));
        let salesMonthes = Array(12).fill(0);
        let salesAmounts = Array(12).fill(0);
        salesDates.forEach((timestamp) => {
          const givenDate = new Date(timestamp);
          const index = givenDate.getMonth();
          salesMonthes[index] = salesMonthes[index] + 1;
          salesAmounts[index] =
            salesAmounts[index] + Number(salesAmount[index]);
        });
        const purchaseDates = purchaseOrders.map(
          (purchase) => purchase.created_at
        );
        const purchaseAmount = purchaseOrders.map((purchase) =>
          Number(purchase.total)
        );
        let purchaseMonthes = Array(12).fill(0);
        let purchaseAmounts = Array(12).fill(0);
        purchaseDates.forEach((timestamp) => {
          const givenDate = new Date(timestamp);
          const index = givenDate.getMonth();
          purchaseMonthes[index] = purchaseMonthes[index] + 1;
          purchaseAmounts[index] =
            purchaseAmounts[index] + Number(purchaseAmount[index]);
        });
        let response = chartjs.accPay_accRec.data;
        response.labels = monthes;
        response.datasets[0] = {
          ...response.datasets[0],
          data: salesAmounts,
        };
        response.datasets[1] = {
          ...response.datasets[1],
          data: purchaseAmounts,
        };
        return response;
      }

      case types.SALES_VS_PURCHASE_INVOICES: {
        const { salesInvoices, purchaseInvoices } = data;
        const approvedSalesInvoices = salesInvoices.filter(
          (invoice) => invoice.status === statusTypes.APPROVED
        );
        const openSalesInvoices = salesInvoices.filter(
          (invoice) => invoice.status === statusTypes.OPEN
        );
        const postedSalesInvoices = salesInvoices.filter(
          (invoice) => invoice.status === statusTypes.POSTED
        );

        const approvedPurchaseInvoices = purchaseInvoices.filter(
          (invoice) => invoice.status === statusTypes.APPROVED
        );
        const openPurchaseInvoices = purchaseInvoices.filter(
          (invoice) => invoice.status === statusTypes.OPEN
        );
        const postedPurchaseInvoices = purchaseInvoices.filter(
          (invoice) => invoice.status === statusTypes.POSTED
        );
        const statusFlags = [
          statusTypes.APPROVED,
          statusTypes.OPEN,
          statusTypes.POSTED,
        ];

        let response = chartjs.operatingCosts.data;
        response.labels = ["Sales Invoices", "Purchase Invoices"];
        const dataContent = statusFlags.map((status) => {
          switch (status) {
            case statusTypes.APPROVED:
              return [
                approvedSalesInvoices.length,
                approvedPurchaseInvoices.length,
              ];
            case statusTypes.OPEN:
              return [openSalesInvoices.length, openPurchaseInvoices.length];
            case statusTypes.POSTED:
              return [
                postedSalesInvoices.length,
                postedPurchaseInvoices.length,
              ];
            default:
              return null;
          }
        });
        response.datasets = statusFlags.map((status, idx) => {
          return {
            ...response.datasets[idx],
            label: status,
            data: dataContent[idx],
          };
        });
        response.datasets[0] = {
          ...response.datasets[0],
        };

        return salesInvoices[0] && purchaseInvoices[0] ? response : null;
      }

      case types.GET_RECEIVING_PAYMENTS: {
        const { salesInvoices, purchaseInvoices } = data;
        const purchaseColumns = [
          { path: "vendor.name", label: "Vendor" },
          { path: "purchase_order", label: "PO Number" },
          { path: "document_number", label: "Invoice Number" },
          { path: "posting_date", label: "Invoice Date" },
        ];

        const purchaseData = purchaseInvoices.filter(
          (purchase) => purchase.status === statusTypes.OPEN
        );

        const salesColumns = [
          { path: "customer.name", label: "Customer" },
          { path: "sales_order.document_number", label: "SO. Number" },
          { path: "document_number", label: "Invoice Number" },
          { path: "posting_date", label: "Invoice Date" },
        ];

        const salesData = salesInvoices.filter(
          (salaes) => salaes.status === statusTypes.OPEN
        );
        return {
          purchaseColumns,
          purchaseData,
          salesColumns,
          salesData,
        };
      }

      case types.GET_DAILY_CASH_MOVEMENT: {
        const { salesInvoices, purchaseInvoices } = data;
        const dailyReceivedTimestamps = [];
        const dailyReceivedAmount = [];

        salesInvoices.filter((invoice) => {
          const index = dailyReceivedTimestamps.findIndex(
            (stamp) => stamp === getDateFormat(String(invoice.created_at))
          );
          if (index < 0) {
            dailyReceivedTimestamps.push(
              getDateFormat(String(invoice.created_at))
            );
            dailyReceivedAmount.push(Number(invoice.total));
            return true;
          } else {
            return false;
          }
        });
        const dailyPaidTimestamps = [];
        const dailyPaidAmount = [];

        purchaseInvoices.filter((invoice) => {
          const index = dailyPaidTimestamps.findIndex(
            (stamp) => stamp === getDateFormat(String(invoice.created_at))
          );
          if (index < 0) {
            dailyPaidTimestamps.push(getDateFormat(String(invoice.created_at)));
            dailyPaidAmount.push(Number(invoice.paid_amount));
            return true;
          } else {
            return false;
          }
        });

        const average = Number(
          (HelpMath.Summation(dailyReceivedAmount) +
            HelpMath.Summation(dailyPaidAmount)) /
            dailyReceivedAmount.length +
            dailyPaidAmount.length
        ).toFixed(2);
        return average > 0 ? `${average} ETB (+ 5%)` : "0";
      }

      case types.NET_INCOME: {
        const totalIncomeData = salesInvoices.map((invoice) =>
          Number(invoice.total)
        );
        console.log("here", HelpMath.Summation(totalIncomeData).toFixed(2));
        const netIncome = HelpMath.Summation(totalIncomeData).toFixed(2);
        return Number(netIncome) > 0 ? `${netIncome} ETB (+ 10%)` : "0";
      }

      case types.GET_ACCOUNT_DATA: {
        const { COAs, banks, bankAccounts } = data;
        const COAColumns = [
          { path: "name", label: "Account Name" },
          { path: "balance", label: "Balance" },
        ];

        const bankColumns = [
          { path: "name", label: "Bank Name" },
          { path: "code", label: "Code" },
        ];

        const bankAccountColumns = [
          { path: "account_number", label: "Bank Account Number" },
          { path: "branch_name", label: "Branch Name" },
        ];

        return {
          COAs: { columns: COAColumns, data: COAs.slice(0, 3) },
          banks: { columns: bankColumns, data: banks.slice(0, 3) },
          bankAccounts: {
            columns: bankAccountColumns,
            data: bankAccounts.slice(0, 3),
          },
        };
      }
      default: {
        return null;
      }
    }
  };

  return (
    <FinanceDashboard
      revenue={totalCredit - totalDebit}
      grossProfit={thisMonthGrossProfit - lastMonthGrossProfit}
      salesAndPurchase={getData(
        { salesOrders, purchaseOrders },
        types.SALES_VS_PURCHASE
      )}
      salesAndPurhcaseInvoices={getData(
        { salesInvoices, purchaseInvoices },
        types.SALES_VS_PURCHASE_INVOICES
      )}
      paymentData={getData(
        { salesInvoices, purchaseInvoices },
        types.GET_RECEIVING_PAYMENTS
      )}
      dailyCashMovement={getData(
        { salesInvoices, purchaseInvoices },
        types.GET_DAILY_CASH_MOVEMENT
      )}
      netIncome={getData({ salesInvoices, purchaseInvoices }, types.NET_INCOME)}
      financeAccounts={getData(
        { COAs, banks, bankAccounts },
        types.GET_ACCOUNT_DATA
      )}
      balanceSheet={balanceSheet}
      trialBalance={trialBalance}
    />
  );
};

const mapStateToProps = (state) => ({
  salesOrders: selectSalesOrders(state),
  purchaseOrders: selectPurchaseOrders(state),
  salesInvoices: selectSalesInvoices(state),
  purchaseInvoices: selectPurchaseInvoices(state),
  COAs: selectChartOfAccounts(state),
  banks: selectBanks(state),
  bankAccounts: selectBankAccounts(state),
  balanceSheet: selectBalanceSheet(state),
  trialBalance: selectTrialBalance(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSalesOrders: () => dispatch(fetchSalesOrders()),
  fetchPurchaseOrders: () => dispatch(fetchPurchaseOrders()),
  fetchSalesInvoices: () => dispatch(fetchSalesInvoices()),
  fetchPurchaseInvoices: () => dispatch(fetchPurchaseInvoices()),
  fetchCOAs: () => dispatch(fetchCOAs()),
  fetchBankAccounts: () => dispatch(fetchBankAccounts()),
  fetchBanks: () => dispatch(fetchBanks()),
  fetchBalanceSheet: () => dispatch(fetchBalanceSheet()),
  fetchTrialBalance: () => dispatch(fetchTrialBalance()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
