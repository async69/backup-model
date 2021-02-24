import { createSlice } from "@reduxjs/toolkit"
import customStatus from "../../../config/customStatus"
import { apiCallBegan } from "../../api"
import endPoints from "../../../config/endPoints"

export const stateName = "salesReturn"
export const initialState = {
    salesReturns: [],
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

const TemplateSlice = createSlice({
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
            state.salesReturns = action.payload.results
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
            state.salesReturns = state.salesReturns.concat(action.payload)
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
            const index = state.salesReturns.findIndex(uom => uom.id === action.payload.id)
            if (index >= 0) {
                state.salesReturns[index] = action.payload
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
            state.salesReturns = state.salesReturns.filter(uom => uom.id !== action.payload.id)
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
            const index = state.salesReturns.findIndex(element => element.id === data.id)
            if (index >= 0) {
                state.salesReturns[index] = {
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

export default TemplateSlice.reducer
export const {
    requestFetch, successFetch, failureFetch,
    requestAdd, successAdd, failureAdd,
    requestEdit, successEdit, failureEdit,
    requestDelete, successDelete, failureDelete,
    requestUpdateStatus, successUpdateStatus, failureUpdateStatus
} = TemplateSlice.actions

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectSalesReturns = state => {
    const { salesReturns } = unResolveState(state)
    return salesReturns
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

export const fetchSalesReturns = () =>
    apiCallBegan({
        url: endPoints.mocks.SalesReturn,
        onStart: requestFetch.type,
        onSuccess: successFetch.type,
        onError: failureFetch.type
    })

export const addSalesReturn = data =>
    apiCallBegan({
        url: endPoints.mocks.SalesReturn,
        method: "post",
        data,
        onStart: requestAdd.type,
        onSuccess: successAdd.type,
        onError: failureAdd.type
    })

export const editSalesReturn = data =>
    apiCallBegan({
        url: endPoints.mocks.SalesReturn + "/" + data.id,
        method: "put",
        data,
        onStart: requestEdit.type,
        onSuccess: successEdit.type,
        onError: failureEdit.type
    })