import reducer, {
    initialState, resolveState, selectDeleteStatus, selectBins, successFetchBins,
    requestDeleteBin, successDeleteBin, failureDeleteBin
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('delete bin', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should return initialState on request', () => {
        const nextState = reducer(initialState, requestDeleteBin())
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success delete', () => {
        const bins = [{ id: 1, name: 'Default' }]
        const payload = { results: bins }
        var nextState = reducer(initialState, successFetchBins(payload))
        nextState = reducer(nextState, successDeleteBin({ id: 1 }))
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectBins(resolveState(nextState)))
            .toEqual([])
    })

    test('should update state on failure delete', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureDeleteBin(errors))
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})