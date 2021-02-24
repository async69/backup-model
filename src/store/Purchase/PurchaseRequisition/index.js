import { createSlice } from "@reduxjs/toolkit"
import customStatus from "../../../config/customStatus"
import { apiCallBegan } from "../../api"
import endPoints from "../../../config/endPoints"

export const stateName = "purchaseRequisition"
export const initialState = {
    purchaseRequisitions: [],
    fetchStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    },
    addStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    },
    editStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    },
    deleteStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    },
    updateStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    }
}

const PurchaseRequisitionSlice = createSlice({
    initialState,
    name: stateName,
    reducers: {
        requestFetch(state, _) {
            state.fetchStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },
        successFetch(state, action) {
            state.fetchStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            state.purchaseRequisitions = action.payload
        },
        failureFetch(state, action) {
            state.fetchStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        },

        requestAdd(state, _) {
            state.addStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },
        successAdd(state, action) {
            state.addStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            state.purchaseRequisitions = state.purchaseRequisitions.concat(action.payload)
        },
        failureAdd(state, action) {
            state.addStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        },

        requestEdit(state, _) {
            state.editStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },
        successEdit(state, action) {
            state.editStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            const index = state.purchaseRequisitions.findIndex(uom => uom.id === action.payload.id)
            if (index >= 0) {
                state.purchaseRequisitions[index] = action.payload
            }
        },
        failureEdit(state, action) {
            state.editStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        },

        requestDelete(state, _) {
            state.deleteStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },
        successDelete(state, action) {
            state.deleteStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            state.purchaseRequisitions = state.purchaseRequisitions.filter(uom => uom.id !== action.payload.id)
        },
        failureDelete(state, action) {
            state.deleteStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        },

        requestUpdateStatus(state, _) {
            state.updateStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },

        successUpdateStatus(state, action) {
            state.updateStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            var { data, tag, value } = action.payload
            const index = state.purchaseRequisitions.findIndex(element => element.id === data.id)
            if (index >= 0) {
                state.purchaseRequisitions[index] = {
                    ...data,
                    [tag]: value
                }
            }
        },

        failureUpdateStatus(state, action) {
            state.updateStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        }
    }
})

export default PurchaseRequisitionSlice.reducer
export const {
    requestFetch, successFetch, failureFetch,
    requestAdd, successAdd, failureAdd,
    requestEdit, successEdit, failureEdit,
    requestDelete, successDelete, failureDelete,
    requestUpdateStatus, successUpdateStatus, failureUpdateStatus
} = PurchaseRequisitionSlice.actions

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectPRs = state => {
    const { purchaseRequisitions } = unResolveState(state)
    return purchaseRequisitions
}

export const selectFetchStatus = state => {
    const { fetchStatus } = unResolveState(state)
    return fetchStatus
}

export const selectAddStatus = state => {
    const { addStatus } = unResolveState(state)
    return addStatus
}

export const selectEditStatus = state => {
    const { editStatus } = unResolveState(state)
    return editStatus
}

export const selectDeleteStatus = state => {
    const { deleteStatus } = unResolveState(state)
    return deleteStatus
}

export const selectUpdateStatus = state => {
    const { updateStatus } = unResolveState(state)
    return updateStatus
}

export const fetchPRs = () =>
    apiCallBegan({
        url: endPoints.mocks.PurchaseRequisition,
        onStart: requestFetch.type,
        onSuccess: successFetch.type,
        onError: failureFetch.type
    })

export const addPR = data =>
    apiCallBegan({
        url: endPoints.mocks.PurchaseRequisition,
        data,
        method: "post",
        onStart: requestAdd.type,
        onSuccess: successAdd.type,
        onError: failureAdd.type
    })

export const editPR = data =>
    apiCallBegan({
        url: endPoints.mocks.PurchaseRequisition + "/" + data.id,
        method: "put",
        data,
        onStart: requestEdit.type,
        onSuccess: successEdit.type,
        onError: failureEdit.type
    })

export const updateStatus = data =>
    apiCallBegan({
        url: endPoints.mocks.PurchaseRequisition + "/" + data.id + "/post",
        method: "put",
        data,
        onStart: requestUpdateStatus.type,
        onSuccess: successUpdateStatus.type,
        onError: failureUpdateStatus.type
    })