import { createSlice } from '@reduxjs/toolkit'
import customStatus from '../../config/customStatus'
import { apiCallBegan } from '../api'
import endPoints from '../../config/endPoints'

export const stateName = "generalLedgers"
export const initialState = {
    ledgers: [],
    fetchStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    }
}

const generalLedgerSlice = createSlice({
    name: stateName,
    initialState,
    reducers: {
        requestFetchLedgers(state, _) {
            state.fetchStatus.loading = true
            state.fetchStatus.status = customStatus.pending
            state.fetchStatus.errors = null
        },
        successFetchLedgers(state, action) {
            state.fetchStatus.loading = false
            state.fetchStatus.status = customStatus.success
            state.fetchStatus.errors = null
            state.ledgers = action.payload
        },
        failureFetchLedgers(state, action) {
            state.fetchStatus.loading = false
            state.fetchStatus.status = customStatus.failed
            state.fetchStatus.errors = action.payload
        }
    }
})

export default generalLedgerSlice.reducer

export const {
    requestFetchLedgers, successFetchLedgers, failureFetchLedgers
} = generalLedgerSlice.actions

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectFetchStatus = state => {
    const { fetchStatus } = unResolveState(state)
    return fetchStatus
}

export const selectLedgers = state => {
    const { ledgers } = unResolveState(state)
    return ledgers
}

export const fetchLedgers = () =>
    apiCallBegan({
        url: endPoints.mocks.generalLedger,
        method: "get",
        onStart: requestFetchLedgers.type,
        onSuccess: successFetchLedgers.type,
        onError: failureFetchLedgers.type
    })