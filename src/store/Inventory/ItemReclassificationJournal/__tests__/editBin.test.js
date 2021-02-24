import reducer, {
    initialState, resolveState, selectEditStatus, selectBins, successFetchBins,
    requestEditBin, successEditBin, failureEditBin
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('edit bin', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        expect(selectEditStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should update state on request edit', () => {
        const nextState = reducer(initialState, requestEditBin())
        expect(selectEditStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success edit', () => {
        const bins = [{ id: 1, name: 'Default' }]
        const payload = { results: bins }
        const data = { id: 1, name: 'Updated' }
        var nextState = reducer(initialState, successFetchBins(payload))
        nextState = reducer(nextState, successEditBin(data))
        expect(selectEditStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectBins(resolveState(nextState)))
            .toEqual([data])
    })

    test('should update state on failure edit', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureEditBin(errors))
        expect(selectEditStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})