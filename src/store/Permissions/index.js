import { createSlice } from '@reduxjs/toolkit'
import { fetchPermissions } from '../../helpers/binaryConvertor'
import customStatus from '../../config/customStatus'
import endPoints from '../../config/endPoints'
import { apiCallBegan } from '../api'

export const stateName = "permissions"
export const initialState = {
    permissions: {},
    fetchStatus: {
        loading: false,
        status: customStatus.initial,
        errors: null
    }
}

const permissionSlice = createSlice({
    initialState,
    name: stateName,
    reducers: {
        requestFetchPermissions(state, _) {
            state.fetchStatus.loading = true
            state.fetchStatus.status = customStatus.pending
            state.fetchStatus.errors = null
        },
        successFetchPermissions(state, action) {
            state.fetchStatus.loading = false
            state.fetchStatus.status = customStatus.success
            state.fetchStatus.errors = null
            const { permissions } = action.payload
            for (var prop in permissions) {
                state.permissions[prop] = fetchPermissions(permissions[prop])
            }
        },
        failureFetchPermissions(state, action) {
            state.fetchStatus.loading = false
            state.fetchStatus.status = customStatus.failed
            state.fetchStatus.errors = action.payload
        }
    }
})

export const {
    requestFetchPermissions, successFetchPermissions, failureFetchPermissions
} = permissionSlice.actions

export default permissionSlice.reducer

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectFetchStatus = state => {
    const { fetchStatus } = unResolveState(state)
    return fetchStatus
}

export const selectPermission = (state, permissionCategory) => {
    const { permissions } = unResolveState(state)
    if (typeof permissions[permissionCategory] === "undefined") {
        return null
    }
    return permissions[permissionCategory]
}

export const loadPermissions = () =>
    apiCallBegan({
        url: endPoints.mocks.permissions,
        onStart: requestFetchPermissions.type,
        onSuccess: successFetchPermissions.type,
        onError: failureFetchPermissions.type
    })