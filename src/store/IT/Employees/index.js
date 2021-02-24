import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"
import { simulateLogic } from "./logic"

const url = "/it-employees"
const ITEmployees = new StateArrayModel({ stateName: "it_employees" })

ITEmployees.createSlice()
ITEmployees.setURL(url)

export const {
    reducer,
    stateName
} = ITEmployees.getEntity()

ITEmployees.enableCustomAct((dispatch, action) => {
    const response = ITEmployees.getAPICallType(action.payload.onSuccess)
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

export const {
    Add, Fetch, Edit, Remove, Patch
} = ITEmployees.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData, selectPatchStatus
} = ITEmployees.getSelectors()

export { selectData as selectITEmployees }