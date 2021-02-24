import reducer, {
    initialState, resolveState, selectFetchStatus, selectUOMConversions,
    requestFetchUOM, successFetchUOM, failureFetchUOM
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('fetch Unit of measurements', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        const result = reducer(undefined, {})
        expect(nextState).toEqual(result)
        expect(selectFetchStatus(resolveState(result)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should update state on request fetch', () => {
        const nextState = reducer(initialState, requestFetchUOM())
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success fetch', () => {
        const data = { results: [{ id: 1, name: 'meter' }] }
        const nextState = reducer(initialState, successFetchUOM(data))
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectUOMConversions(resolveState(nextState)))
            .toEqual(data)
    })

    test('should update state on failure fetch', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureFetchUOM(errors))
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})