import { createSlice } from '@reduxjs/toolkit'
import customStatus from '../../config/customStatus'
import { apiCallBegan } from '../api'
import endPoints from '../../config/endPoints'

export const name = 'trialBalance'
export const initialState = {
    trialBalances: [],
    fetchStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    }
}

const trialBalanceSlice = createSlice({
    name,
    initialState,
    reducers: {
        trialBalanceRequest(state, _) {
            state.fetchStatus.loading = true
            state.fetchStatus.status = customStatus.pending
            state.fetchStatus.errors = null
        },

        trialBalanceSuccess(state, action) {
            state.fetchStatus.loading = false
            state.fetchStatus.status = customStatus.success
            state.fetchStatus.errors = null
            state.trialBalances = action.payload
        },

        trialBalanceRequestFailure(state, action) {
            state.fetchStatus.loading = false
            state.fetchStatus.status = customStatus.failed
            state.fetchStatus.errors = action.payload
        }
        
    }
})

export const {
    trialBalanceRequest, trialBalanceSuccess, trialBalanceRequestFailure
} = trialBalanceSlice.actions

export const resolveState = state => ({
    entities: { [name]: state }
})

export const unResolveState = state => state.entities[name]

export const selectFetchStatus = state => {
    const { fetchStatus } = unResolveState(state)
    return fetchStatus
}

export const selectTrialBalances = state => {
    const { trialBalances } = unResolveState(state)
    return trialBalances
}

export const fetchTrialBalances = () =>
    apiCallBegan({
        url: endPoints.mocks.trialBalance,
        method: "get",
        onStart: trialBalanceRequest.type,
        onSuccess: trialBalanceSuccess.type,
        onError: trialBalanceRequestFailure.type
    })

export default trialBalanceSlice.reducer