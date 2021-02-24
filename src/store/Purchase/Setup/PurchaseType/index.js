import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"
import { simulateLogic } from "./logic"

const PurchaseType = new StateArrayModel({ stateName: "new_purchase_types" })
PurchaseType.setURL("/purchase-types")

PurchaseType.createSlice()

export const { stateName, reducer } = PurchaseType.getEntity()

PurchaseType.enableCustomAct((dispatch, action) => {
  const response = PurchaseType.getAPICallType(action.payload.onSuccess)
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

PurchaseType.toggleCustomAct(false)

export const { Add, Fetch, Edit, Remove, Patch } = PurchaseType.getAPIHandles()

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = PurchaseType.getSelectors()

export { selectData as selectPurchaseTypes }