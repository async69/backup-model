import reducer, {
    initialState, resolveState, selectBins, selectAddStatus,
    requestAddBin, successAddBin, failureAddBin
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('add bin', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        expect(selectAddStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should update state on request add', () => {
        const nextState = reducer(initialState, requestAddBin())
        expect(selectAddStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success add', () => {
        const data = { id: 1, name: 'Some Bin' }
        const nextState = reducer(initialState, successAddBin(data))
        expect(selectAddStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectBins(resolveState(nextState)))
            .toContain(data)
    })

    test('should update state on failure add', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureAddBin(errors))
        expect(selectAddStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})