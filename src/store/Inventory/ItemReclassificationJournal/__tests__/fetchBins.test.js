import reducer, {
    initialState, selectFetchStatus, resolveState, selectBins,
    requestFetchBins, successFetchBins, failureFetchBins
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('fetchBins', () => {
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
        const nextState = reducer(initialState, requestFetchBins())
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success fetch', () => {
        const data = { results: [{ id: 1, name: 'meter' }] }
        const nextState = reducer(initialState, successFetchBins(data))
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectBins(resolveState(nextState)))
            .toEqual(data.results)
    })

    test('should update state on failure fetch', () => {
        const errors = { name: 'Error'}
        const nextState = reducer(initialState, failureFetchBins(errors))
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})