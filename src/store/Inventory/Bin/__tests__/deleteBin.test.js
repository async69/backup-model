import reducer, {
    initialState, resolveState, selectDeleteStatus, selectBins, successFetch,
    requestDelete, successDelete, failureDelete
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('delete Bins', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        const result = reducer(undefined, {})
        expect(nextState).toEqual(result)
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should update state on request delete', () => {
        const nextState = reducer(initialState, requestDelete())
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                lodaing: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success delete', () => {
        const data = { results: [{ id: 1, name: 'Kilos' }] }
        var nextState = reducer(initialState, successFetch(data))
        nextState = reducer(nextState, successDelete({ id: 1 }))
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
        const nextState = reducer(initialState, failureDelete(errors))
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})