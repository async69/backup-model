import { createSlice } from '@reduxjs/toolkit'
import customStatus from '../../config/customStatus'
import { apiCallBegan } from '../api'
import endPoints from '../../config/endPoints'

export const stateName = "tax"
export const initialState = {
    taxes: [],
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
    }
}

const taxSlice = createSlice({
    name: stateName,
    initialState,
    reducers: {
        requestFetchTaxes(state, _) {
            state.fetchStatus.loading = true
            state.fetchStatus.status = customStatus.pending
            state.fetchStatus.errors = null
        },
        successFetchTaxes(state, action) {
            state.fetchStatus.loading = false
            state.fetchStatus.status = customStatus.success
            state.fetchStatus.errors = null
            state.taxes = action.payload
        },
        failureFetchTaxes(state, action) {
            state.fetchStatus.loading = false
            state.fetchStatus.status = customStatus.failed
            state.fetchStatus.errors = action.payload
        },

        requestAddTax(state, _) {
            state.addStatus.loading = true
            state.addStatus.status = customStatus.pending
            state.addStatus.errors = null
        },
        successAddTax(state, action) {
            state.addStatus.loading = false
            state.addStatus.status = customStatus.success
            state.addStatus.errors = null
            state.taxes.push(action.payload)
        },
        failureAddTax(state, action) {
            state.addStatus.loading = false
            state.addStatus.status = customStatus.failed
            state.addStatus.errors = action.payload
        },

        requestEditTax(state, _) {
            state.editStatus.loading = true
            state.editStatus.status = customStatus.pending
            state.editStatus.errors = null
        },
        successEditTax(state, action) {
            state.editStatus.loading = false
            state.editStatus.status = customStatus.success
            state.editStatus.errors = null
            const index = state.taxes.findIndex(tax => tax.id === action.payload.id)
            if (index >= 0) {
                state.taxes[index] = action.payload
            }
        },
        failureEditTax(state, action) {
            state.editStatus.loading = false
            state.editStatus.status = customStatus.failed
            state.editStatus.errors = action.payload
        }
    }
})

export default taxSlice.reducer

export const {
    requestFetchTaxes, successFetchTaxes, failureFetchTaxes,
    requestAddTax, successAddTax, failureAddTax,
    requestEditTax, successEditTax, failureEditTax
} = taxSlice.actions

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

export const selectTaxes = state => {
    const { taxes } = unResolveState(state)
    return taxes
}

export const fetchTaxes = () =>
    apiCallBegan({
        method: "get",
        url: endPoints.mocks.tax,
        onStart: requestFetchTaxes.type,
        onSuccess: successFetchTaxes.type,
        onError: failureFetchTaxes.type
    })

export const addTax = data =>
    apiCallBegan({
        url: endPoints.mocks.tax,
        method: "post",
        data,
        onStart: requestAddTax.type,
        onSuccess: successAddTax.type,
        onError: failureAddTax.type
    })

export const editTax = (data, id) =>
    apiCallBegan({
        url: endPoints.mocks.tax + "/" + id,
        method: "put",
        data,
        onStart: requestEditTax.type,
        onSuccess: successEditTax.type,
        onError: failureEditTax.type
    })