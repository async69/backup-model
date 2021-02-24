import { createSlice } from "@reduxjs/toolkit"
import customStatus from "../../../config/customStatus"
import { apiCallBegan } from "../../api"
import endPoints from "../../../config/endPoints"

export const stateName = "purchasers"
export const initialState = {
    purchasers: [],
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

const PurchasersSlice = createSlice({
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
            state.purchasers = action.payload
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
            state.purchasers = state.purchasers.concat(action.payload)
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
            const index = state.purchasers.findIndex(uom => uom.id === action.payload.id)
            if (index >= 0) {
                state.purchasers[index] = action.payload
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
            state.purchasers = state.purchasers.filter(uom => uom.id !== action.payload.id)
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

export default PurchasersSlice.reducer
export const {
    requestFetch, successFetch, failureFetch,
    requestAdd, successAdd, failureAdd,
    requestEdit, successEdit, failureEdit,
    requestDelete, successDelete, failureDelete
} = PurchasersSlice.actions

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectPurchasers = state => {
    const { purchasers } = unResolveState(state)
    return purchasers
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

export const fetchPurchasers = () =>
    apiCallBegan({
        url: endPoints.mocks.Purchaser,
        onStart: requestFetch.type,
        onSuccess: successFetch.type,
        onError: failureFetch.type
    })

export const addPurchaser = data =>
    apiCallBegan({
        url: endPoints.mocks.Purchaser,
        data,
        method: "post",
        onStart: requestAdd.type,
        onSuccess: successAdd.type,
        onError: failureAdd.type
    })