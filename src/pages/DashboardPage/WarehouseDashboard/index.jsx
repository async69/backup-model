import React, { useEffect } from "react";
import WarehouseDashboard from "./WarehouseDashboard";
import {
  Fetch as fetchInventoryItems,
  selectInventoryItems,
} from "store/Inventory/MasterData/inventoryItems";
import {
  Fetch as fetchMasterDataItems,
  selectItemMasterDatas,
} from "store/Inventory/MasterData/items";
import {
  Fetch as fetchGRNs,
  selectGoodReceivingNotes,
} from "store/Inventory/Common/GoodReceivingNotes/";
import {
  Fetch as fetchSIVs,
  selectStoreIssueVouchers,
} from "store/Inventory/Common/StoreIssueVouchers/";
import {
  Fetch as fetchPurchaseReturns,
  selectPurchaseReturns,
} from "store/Inventory/Common/PurchaseReturn/";
import {
  Fetch as fetchSalesOrders,
  selectSalesOrders,
} from "../../../store/Sales/Common/SalesOrder/";
import {
  Fetch as fetchPurchaseOrders,
  selectPurchaseOrders,
} from "../../../store/Purchase/Common/PurchaseOrder/";
import {
  Fetch as fetchSalesReturns,
  selectSalesReturns,
} from "../../../store/Inventory/Common/SalesRetrun/";
import { connect } from "react-redux";
import { isLastMonth, isBefore, todayTimeStamp, monthList } from "helpers/date";
import statusTypes from "config/statusTypes";
import { chartjs } from "../../../demos/dashboardPage";
import { getTurnOverRateByItem } from "./util";

const types = {
  NEW_ITEM_RECEIVED: "NEW_ITEM_RECEIVED",
  ITEMS_OUT: "ITEMS_OUT",
  RETURNED_ITEMS: "RETURNED_ITEMS",
  INVENTORY_BACKLOG: "INVENTORY_BACKLOG",
  PERFECT_ORDER_RATE: "PERFECT_ORDER_RATE",
  INVENTORY_TURNOVER_RATE: "INVENTORY_TURNOVER_RATE",
  TURN_OVER_RATE_PER_ITEM: "TURN_OVER_RATE_PER_ITEM",
  STOCK_PER_WAREHOUSE: "STOCK_PER_WAREHOUSE",
  GET_TABLE_DATA: "GET_TABLE_DATA",
};

const Loader = ({
  inventoryItems,
  fetchInventoryItems,
  GRNs,
  fetchGRNs,
  purchaseReturns,
  fetchPurchaseReturns,
  salesOrders,
  fetchSalesOrders,
  purchaseOrders,
  fetchPurchaseOrders,
  SIVs,
  fetchSIVs,
  itemMasterDatas,
  fetchMasterDataItems,
  salesReturns,
  fetchSalesReturns,
}) => {
  useEffect(() => {
    fetchInventoryItems();
  }, [fetchInventoryItems]);

  useEffect(() => {
    fetchMasterDataItems();
  }, [fetchMasterDataItems]);

  useEffect(() => {
    fetchGRNs();
  }, [fetchGRNs]);

  useEffect(() => {
    fetchPurchaseReturns();
  }, [fetchPurchaseReturns]);

  useEffect(() => {
    fetchSalesOrders();
  }, [fetchSalesOrders]);

  useEffect(() => {
    fetchPurchaseOrders();
  }, [fetchPurchaseOrders]);

  useEffect(() => {
    fetchSIVs();
  }, [fetchSIVs]);

  useEffect(() => {
    fetchSalesReturns();
  }, [fetchSalesReturns]);

  return (
    <WarehouseDashboard
      newInventoryItems={getData({ inventoryItems }, types.NEW_ITEM_RECEIVED)}
      itemsOut={getData({ GRNs }, types.ITEMS_OUT)}
      returnedItems={getData({ purchaseReturns }, types.RETURNED_ITEMS)}
      inventoryBacklog={getData(
        { salesOrders, purchaseOrders },
        types.INVENTORY_BACKLOG
      )}
      perfectOrderRate={getData({ SIVs, GRNs }, types.PERFECT_ORDER_RATE)}
      inventoryTurnoverRate={getData(
        { SIVs, GRNs },
        types.INVENTORY_TURNOVER_RATE
      )}
      turnOverperItem={getData(
        { SIVs, GRNs, itemMasterDatas },
        types.TURN_OVER_RATE_PER_ITEM
      )}
      stockPerWarehouse={getData({ inventoryItems }, types.STOCK_PER_WAREHOUSE)}
      tableData={getData({ salesReturns, GRNs, SIVs }, types.GET_TABLE_DATA)}
    />
  );
};

const getData = (data, type) => {
  switch (type) {
    case types.NEW_ITEM_RECEIVED: {
      const { inventoryItems } = data;
      return inventoryItems.filter((item) => isLastMonth(item.updated_at))
        .length;
    }

    case types.ITEMS_OUT: {
      const { GRNs } = data;
      return GRNs.length;
    }

    case types.RETURNED_ITEMS: {
      const { purchaseReturns } = data;
      return purchaseReturns.length;
    }

    // Orders that are still open and are way past their due dates
    case types.INVENTORY_BACKLOG: {
      const { salesOrders, purchaseOrders } = data;
      const salesAmount = salesOrders
        .filter((order) => order.status === statusTypes.OPEN)
        .filter((order) => isBefore(String(order.due_date), todayTimeStamp))
        .length;
      const purchaseAmount = purchaseOrders
        .filter((order) => order.status === statusTypes.OPEN)
        .filter((order) => isBefore(String(order.due_date), todayTimeStamp))
        .length;
      return salesAmount + purchaseAmount;
    }

    // Total GRN / Total SIV
    case types.PERFECT_ORDER_RATE: {
      const { GRNs, SIVs } = data;
      const SIVItems = [];
      SIVs.forEach((issue) => {
        issue.siv_lines.forEach((line) => {
          const index = SIVItems.findIndex(
            (item) => line.item_detail.id === item
          );
          if (index < 0) {
            SIVItems.push(line.item_detail.id);
          }
        });
      });

      const GRNItems = [];
      GRNs.forEach((issue) => {
        issue.grn_lines.forEach((line) => {
          const index = GRNItems.findIndex(
            (item) => line.item_detail.id === item
          );
          if (index < 0) {
            GRNItems.push(line.item_detail.id);
          }
        });
      });

      return SIVItems.length > 0
        ? Number(GRNItems.length / SIVItems.length).toFixed(2)
        : 0;
    }

    // Number of items (out - in)
    case types.INVENTORY_TURNOVER_RATE: {
      return 100;
    }

    case types.TURN_OVER_RATE_PER_ITEM: {
      const { SIVs, GRNs, itemMasterDatas } = data;
      const { foundData } = getTurnOverRateByItem(SIVs, GRNs, itemMasterDatas);

      const defaultData = chartjs.turnOverperItem.data;
      const values =
        foundData.length > 0
          ? {
              ...defaultData,
              labels: monthList,
              datasets: foundData.map((itemData) => ({
                ...defaultData,
                label: itemData.label,
                data: itemData.data,
                backgroundColor: itemData.backgroundColor,
              })),
            }
          : chartjs.turnOverperItem.data;
      const totalMonthlySummation = Array(12).fill(0);
      values.datasets.map((dataset) => {
        dataset.data.forEach((amount, idx) => {
          totalMonthlySummation[idx] = totalMonthlySummation[idx] + amount;
        });
        return null;
      });
      const averageData = totalMonthlySummation.map((amount) =>
        Number(amount / values.datasets.length).toFixed(2)
      );
      values.datasets.unshift({
        ...values.datasets[0],
        borderColor: "#222222",
        borderWidth: 2,
        type: "line",
        label: "Average Turn over Rate",
        data: averageData,
      });
      return values;
    }

    case types.STOCK_PER_WAREHOUSE: {
      const { inventoryItems } = data;
      let warehouses = {};
      inventoryItems.forEach((item) => {
        const index = Object.keys(warehouses).findIndex(
          (warehouse) => item.warehouse.id === warehouse
        );
        if (index < 0) {
          warehouses[item.warehouse.id] = Number(item.quantity);
        } else {
          warehouses[item.warehouse.id] =
            Number(item.quantity) + warehouses[item.warehouse.id];
        }
      });

      const warehouseNames = Object.keys(warehouses)
        .map((warehouseID) => {
          const index = inventoryItems.findIndex(
            (item) => item.warehouse.id === warehouseID
          );
          return index >= 0 ? inventoryItems[index].warehouse.name : undefined;
        })
        .filter((item) => Boolean(item));

      let response = chartjs.shipmentStatus.data;
      response.labels = warehouseNames.slice(0, 5);
      response.datasets[0] = {
        ...response.datasets[0],
        data: Object.values(warehouses).slice(0, 5),
      };
      return response.labels.length > 0
        ? response
        : chartjs.shipmentStatus.data;
    }

    case types.GET_TABLE_DATA: {
      const { salesReturns, SIVs, GRNs } = data;
      const salesReturnColumns = [
        { path: "", label: "Customer" },
        { path: "", label: "PO No." },
        { path: "", label: "Invoice No" },
      ];

      const sivColumns = [
        { path: "document_number", label: "Doc No." },
        { path: "sales_order_number", label: "SO No." },
        { path: "status", label: "Status" },
      ];

      const grnColumns = [
        { path: "document_number", label: "Doc. No" },
        { path: "purchase_order_no", label: "PO No." },
        { path: "status", label: "Status" },
      ];
      return {
        sivs: { columns: sivColumns, data: SIVs.slice(0, 3) },
        grns: { columns: grnColumns, data: GRNs.slice(0, 3) },
        salesReturns: {
          columns: salesReturnColumns,
          data: salesReturns.slice(0, 3),
        },
      };
    }
    default: {
      return null;
    }
  }
};

const mapStateToProps = (state) => ({
  inventoryItems: selectInventoryItems(state),
  GRNs: selectGoodReceivingNotes(state),
  SIVs: selectStoreIssueVouchers(state),
  purchaseReturns: selectPurchaseReturns(state),
  salesOrders: selectSalesOrders(state),
  purchaseOrders: selectPurchaseOrders(state),
  itemMasterDatas: selectItemMasterDatas(state),
  salesReturns: selectSalesReturns(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchInventoryItems: () => dispatch(fetchInventoryItems()),
  fetchGRNs: () => dispatch(fetchGRNs()),
  fetchPurchaseReturns: () => dispatch(fetchPurchaseReturns()),
  fetchSalesOrders: () => dispatch(fetchSalesOrders()),
  fetchPurchaseOrders: () => dispatch(fetchPurchaseOrders()),
  fetchSIVs: () => dispatch(fetchSIVs()),
  fetchMasterDataItems: () => dispatch(fetchMasterDataItems()),
  fetchSalesReturns: () => dispatch(fetchSalesReturns()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
