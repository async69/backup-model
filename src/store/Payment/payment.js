import { createSlice } from '@reduxjs/toolkit'
import customStatus from '../../config/customStatus'
import { apiCallBegan } from '../api'
import endPoints from '../../config/endPoints'

export const stateName = "paymentData"

export const initialState = {
    paymentInformation: {},
    addStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    }
}

const paymentSlice = createSlice({
    name: stateName,
    initialState,
    reducers: {
        requestAddPayment(state, _) {
            state.addStatus.loading = true
            state.addStatus.status = customStatus.pending
            state.addStatus.errors = null
        },
        successAddPayment(state, action) {
            state.addStatus.loading = false
            state.addStatus.status = customStatus.success
            state.addStatus.errors = null
            state.paymentInformation = action.payload
        },
        failureAddStatus(state, action) {
            state.addStatus.loading = false
            state.addStatus.status = customStatus.failed
            state.addStatus.errors = action.payload
        }
    }
})

export default paymentSlice.reducer

export const {
    requestAddPayment, successAddPayment, failureAddStatus
} = paymentSlice.actions

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectAddStatus = state => {
    const { addStatus } = unResolveState(state)
    return addStatus
}

export const selectPaymentInfo = state => {
    const { paymentInformation } = unResolveState(state)
    return paymentInformation
}

export const addPayment = data =>
    apiCallBegan({
        url: endPoints.mocks.payment,
        data,
        method: "post",
        onStart: requestAddPayment.type,
        onSuccess: successAddPayment.type,
        onError: failureAddStatus.type
    })