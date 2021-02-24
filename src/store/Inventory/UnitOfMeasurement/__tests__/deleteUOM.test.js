import reducer, {
    initialState, resolveState, selectDeleteStatus, selectUOMs, successFetchUOM,
    requestDeleteUOM, successDeleteUOM, failureDeleteUOM
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('delete UOMs', () => {
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
        const nextState = reducer(initialState, requestDeleteUOM())
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                lodaing: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success delete', () => {
        const data = [{ id: 1, name: 'Kilos' }]
        const payload = { results: data }
        var nextState = reducer(initialState, successFetchUOM(payload))
        nextState = reducer(nextState, successDeleteUOM({ id: 1 }))
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectUOMs(resolveState(nextState)))
            .toEqual([])
    })

    test('should update state on failure delete', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureDeleteUOM(errors))
        expect(selectDeleteStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})