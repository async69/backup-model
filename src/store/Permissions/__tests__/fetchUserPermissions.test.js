import reducer, {
    initialState, selectFetchStatus, resolveState,
    requestFetchPermissions, successFetchPermissions, failureFetchPermissions, selectPermission
} from '../index'
import customStatus from '../../../config/customStatus'

describe('fetchPermissions', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        const result = reducer(undefined, {})
        expect(result).toEqual(nextState)
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should update state on request fetch', () => {
        const nextState = reducer(initialState, requestFetchPermissions())
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success fetch', () => {
        const data = { permissions: {
            account: 13,
            fiscalYear: 11,
            journal: 9
        }}
        const nextState = reducer(initialState, successFetchPermissions(data))
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectPermission(resolveState(nextState), 'account'))
            .toEqual({
                create: true,
                read: true,
                update: false,
                delete: true
            })
    })

    test('should update state on failure fetch', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureFetchPermissions(errors))
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})