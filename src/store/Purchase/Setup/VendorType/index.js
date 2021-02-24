import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"
import { simulateLogic } from "./logic"

const VendorType = new StateArrayModel({ stateName: "new_vendor_types" })

VendorType.setURL("/vendor-types")
VendorType.createSlice()

export const { stateName, reducer } = VendorType.getEntity()

VendorType.enableCustomAct((dispatch, action) => {
  const response = VendorType.getAPICallType(action.payload.onSuccess)
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

VendorType.toggleCustomAct(false)

export const { Add, Fetch, Edit, Remove, Patch } = VendorType.getAPIHandles()

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = VendorType.getSelectors()

export { selectData as selectVendorTypes }