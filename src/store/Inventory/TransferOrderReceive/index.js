import { createSlice } from "@reduxjs/toolkit"
import customStatus from "../../../config/customStatus"
import { apiCallBegan } from "../../api"
import endPoints from "../../../config/endPoints"

export const stateName = "transferOrderReceive"
export const initialState = {
    receivedOrders: [],
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
    }
}

const TransferOrderReceiveSlice = createSlice({
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
            state.receivedOrders = action.payload
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
            state.receivedOrders = state.receivedOrders.concat(action.payload)
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
            const index = state.receivedOrders.findIndex(uom => uom.id === action.payload.id)
            if (index >= 0) {
                state.receivedOrders[index] = action.payload
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
                lodaing: true,
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
            state.receivedOrders = state.receivedOrders.filter(uom => uom.id !== action.payload.id)
        },
        failureDelete(state, action) {
            state.deleteStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        }
    }
})

export default TransferOrderReceiveSlice.reducer
export const {
    requestFetch, successFetch, failureFetch,
    requestAdd, successAdd, failureAdd,
    requestEdit, successEdit, failureEdit,
    requestDelete, successDelete, failureDelete
} = TransferOrderReceiveSlice.actions

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectTransferOrders = state => {
    const { receivedOrders } = unResolveState(state)
    return receivedOrders
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

export const fetchTransferOrderReceive = () =>
    apiCallBegan({
        url: endPoints.mocks.TransferOrderReceive,
        onStart: requestFetch.type,
        onSuccess: successFetch.type,
        onError: failureFetch.type
    })

export const addTransferOrderReceive = data =>
    apiCallBegan({
        url: endPoints.mocks.TransferOrderReceive,
        data,
        method: "post",
        onStart: requestAdd.type,
        onSuccess: successAdd.type,
        onError: failureAdd.type
    })