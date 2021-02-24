import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"
import { simulateLogic } from "./logic"

const Customers = new StateArrayModel({ stateName: "new_customers" })

Customers.setURL("/customers")
Customers.createSlice()

export const { stateName, reducer } = Customers.getEntity()

export const { getLoading } = Customers
Customers.enableCustomAct((dispatch, action) => {
  const response = Customers.getAPICallType(action.payload.onSuccess)
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

Customers.toggleCustomAct(false)
export const { Add, Fetch, Edit, Remove, Patch, FetchAll } = Customers.getAPIHandles()

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = Customers.getSelectors()

export { selectData as selectCustomers }
