import { createSlice } from "@reduxjs/toolkit"
import customStatus from "../../../config/customStatus"
import { apiCallBegan } from "../../api"

export const stateName = "itemReclassificationJournal"
export const initialState = {
    bins: [],
    addStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    },
    fetchStatus: {
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

const ItemReclassificationJournal = createSlice({
    initialState,
    name: stateName,
    reducers: {
        requestFetchBins(state, _) {
            state.fetchStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },
        successFetchBins(state, action) {
            state.fetchStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            state.bins = action.payload.results
        },
        failureFetchBins(state, action) {
            state.fetchStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        },

        requestAddBin(state, _) {
            state.addStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },
        successAddBin(state, action) {
            state.addStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            state.bins = state.bins.concat(action.payload)
        },
        failureAddBin(state, action) {
            state.addStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        },

        requestEditBin(state, _) {
            state.editStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },
        successEditBin(state, action) {
            state.editStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            const index = state.bins.findIndex(bin => bin.id === action.payload.id)
            if (index >= 0) {
                state.bins[index] = action.payload
            }
        },
        failureEditBin(state, action) {
            state.editStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        },

        requestDeleteBin(state, action) {
            state.deleteStatus = {
                loading: true,
                status: customStatus.pending,
                errors: null
            }
        },
        successDeleteBin(state, action) {
            state.deleteStatus = {
                loading: false,
                status: customStatus.success,
                errors: null
            }
            state.bins = state.bins.filter(bin => bin.id !== action.payload.id)
        },
        failureDeleteBin(state, action) {
            state.deleteStatus = {
                loading: false,
                status: customStatus.failed,
                errors: action.payload
            }
        }
    }
})

export default ItemReclassificationJournal.reducer
export const {
    requestFetchBins, successFetchBins, failureFetchBins,
    requestAddBin, successAddBin, failureAddBin,
    requestEditBin, successEditBin, failureEditBin,
    requestDeleteBin, successDeleteBin, failureDeleteBin
} = ItemReclassificationJournal.actions

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

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

export const selectBins = state => {
    const { bins } = unResolveState(state)
    return bins
}

export const selectDeleteStatus = state => {
    const { deleteStatus } = unResolveState(state)
    return deleteStatus
}

const url = "/inventory/control/item-reclassification-journal/"
export const fetchItemReclassificationJournals = () =>
    apiCallBegan({
        url,
        onStart: requestFetchBins.type,
        onSuccess: successFetchBins.type,
        onError: failureFetchBins.type
    })

export const addItemReclassificationJournal = data =>
    apiCallBegan({
        url,
        data,
        method: "post",
        onStart: requestAddBin.type,
        onSuccess: successAddBin.type,
        onError: failureAddBin.type
    })