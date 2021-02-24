import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"
import { simulateLogic } from "./logic"

const SalesOrder = new StateArrayModel({ stateName: "new_sales_orders" })
SalesOrder.setURL("/sales-orders")
SalesOrder.createSlice()

export const { stateName, reducer } = SalesOrder.getEntity()


SalesOrder.enableCustomAct((dispatch, action) => {
  const response = SalesOrder.getAPICallType(action.payload.onSuccess)
  if (response) {
    const { type, apiType } = response
    simulateLogic({
      type,
      apiType,
      dispatch,
      action
    })
  }
})

SalesOrder.toggleCustomAct(false)
export const { patchDelete } = SalesOrder.getUsualAPIActions()
export const { getLoading } = SalesOrder
export const { Add, Fetch, Edit, Remove, Patch } = SalesOrder.getAPIHandles()

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectPatchStatus,
  selectData,
} = SalesOrder.getSelectors()

export { selectData as selectSalesOrders }