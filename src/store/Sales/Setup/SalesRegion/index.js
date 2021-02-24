import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"
import { simulateLogic } from "./logic"

const SalesRegions = new StateArrayModel({ stateName: "sales_regions" })
SalesRegions.setURL("/sales-regions")

SalesRegions.setAPIResponses({
  Add: data => data,
  Edit: data => {
    return {
      ...data
    }
  },
  Fetch: data => {
    return data
  }
})
SalesRegions.createSlice()

SalesRegions.enableCustomAct((dispatch, action) => {
  const response = SalesRegions.getAPICallType(action.payload.onSuccess)
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

SalesRegions.toggleCustomAct(false)

export const { getLoading } = SalesRegions

SalesRegions.setAPICalls({
  Add: (data) => ({
    uuid: "sth new",
    ...data
  }),
  Edit: (data) => ({
    uuid: "sth new",
    ...data
  }),
})

export const { stateName, reducer } = SalesRegions.getEntity()

export const { FetchAll } = SalesRegions.getAPIHandles()
export const { Add, Edit, Fetch, Patch, Remove } = SalesRegions.getAPICalls()
export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = SalesRegions.getSelectors()

export { selectData as selectSalesRegions }
